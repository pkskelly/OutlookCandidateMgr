# Building an Office Addin using Angular2, TypeScript and Express 
This year, one of my goals is to code more.  With my current role, I am often not invovled directly in project development work, but I do miss developing.  
After reading a [recent post from Andrew Connell](http://www.andrewconnell.com/blog/simplifying-technical-presentations-with-docker) and a GitHub repository about [Learning Angular2 to Build Office Add-ins](https://github.com/andrewconnell/pres-ng2-officeaddin) I decided I would get back into coding by diving into TypeScript, Angular2 and Office Addins.

I thought I would start by reviewing and "reconstructing" the sample code from Andrew Connell. 
The following steps are the way I went about rebuilding the code, learnings along the way, and changes I added to the sample code to build my own addin.

## Building a Basic Outlook Addin
These steps leverage and reproduce much of the code from Andrew Connell's 
GitHUb repository (Learning Angular2 to Build Office Add-ins)[https://github.com/andrewconnell/pres-ng2-officeaddin]. A big thanks to AC for the jump start.  
Here's what I used to build the project, but you should be able to substitute other tools of your choice. 
* A Mac with Visual Studio Code v1.3.0 installed
* NodeJS v6.2.0
* NPM v3.3.12
* TypeScript 1.8.10 
All of the above were previously installed. 


## Getting Started
* Create a base folder for the project (I chose OutlookCandidateMgr)
* Create the following directory structure 
```bash
└── src
    ├── client
    │   ├── app
    │   ├── images
    │   └── js
    ├── server
    └── shared
        └── models
```
* Run npm init to initialize a project and accept the defaults. You can read more at [npm init](https://docs.npmjs.com/cli/init) 
```bash
npm init -y 
```

* Create a .gitignore file and add the following as a start
```bash
.DS_Store
typings/**
node_modules
jspm_packages
**/*npm-debug.log.*
*.js
*.js.map
_temp

!src/client/js/systemjs.config.js
```

* Run the following to initialize, add default files and commit the basics to git 
```bash
git init
git add .
git commit -m "Initial commit" 
```

## Adding a Basic Web Server for Development 
* Add express and additional packages for web server in development  - **note the --save**
```bash
npm install express debug request core-js colors connect-logger  --save
```
We'll be using [ExpressJS](http://expressjs.com/) for the web server, most of the other packages above are 

* Add an empty /src/client/index.html file 
* Add an empty /src/server/server.ts file as the base for the web server
* Install typings globally to aquire the typings from npm or other sources
```
    npm install typings -g 
```

* Run npm install for devDependencies - **note the --save-dev**
```bash
    npm install typescript typings  --save-dev
```

* Install typings needed for express and other items 
To install the typings you need see [Typings Github Repo](https://github.com/typings/typings)
* Most of the typings require something similar to the following:
```bash
    typings install dt~node --save --global
```

This will install the dependencies in the typings.json file
* Add "typings install" as a postinstall script in paskage.json
* Add the following to the tsconfig.json file
```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": true,
        "suppressImplicitAnyIndexErrors": true
    }
}

```
* Update the server.ts with a basic express config to serve static files for now. 
```javascript
    import * as debug from 'debug';
    let log: debug.IDebugger = debug('NG2App:server');

    import * as os from 'os';
    import * as colors from 'colors';

    import * as fs from 'fs';
    import * as http from 'http';
    import * as https from 'https';
    import * as express from 'express';
    let logger: any = require('connect-logger');


    // setup express
    log('setup express');
    let app: express.Express = express();
    app.use(logger());

    // setup express to have static resource folders
    app.use('', express.static(__dirname + '/../client'));

    // setup ssl self hosting (use the same certs from browsersync)
    let https_options = {
        key: fs.readFileSync('../../localhost-key.pem'),
        cert: fs.readFileSync('../../localhost-cert.pem')
    };
    let httpServerPort = process.env.PORT || 3433;  // use server value (for Azure) or local port

    // create & startup HTTPS webserver
    https.createServer(https_options, app)
        .listen(httpServerPort);

    console.log(colors.cyan('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+'));
    console.log(colors.green('Starting up https server...'));
    console.log(colors.green('Available on:'));

    // list IPs listening on
    let networks: { [index: string]: os.NetworkInterfaceInfo[] } = os.networkInterfaces();
    Object.keys(networks).forEach((device: string) => {
    networks[device].forEach((details: os.NetworkInterfaceInfo) => {
        if (details.family === 'IPv4') {
        console.log(colors.yellow('  https://' + details.address + ':' + httpServerPort));
        }
    });
    });

    console.log(colors.gray('Hit CTRL-C to stop the server'));
    console.log(colors.cyan('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+'));

```
* Add MIT LICENSE file 
* Update the index.html to include basic links  (page is broken at this point)
* Add start script to package.json
```bash 
        "start": "tsc && node ./src/server/server.js ",
```
* Add the Angular 2 NPM modules
* Configure /vendor route
* Configure /client/js/system.config.js 



## It's Always Something - Enabling Shared Components in Angular 2 Office Addins
One thing that tripped me up for a couple hours was the integration of "shared" modules into the code.  

### Failure is an option
The first attempt was to update the express configuration so that the static files were available.  Made sense, so I edited the server.ts file and added 
a mapping for the "shared" folder.  The interfaces (although never really compiled), the enums and other classes will all come from here over time. 

```javascript
app.use('/shared', express.static(__dirname + '/../shared'));
``` 

and compile and run.  Fail!  The files were being served, I could get to them in a browser, but the error in the developer tools was always returning a 404 or giving me "export" not defined.    

I tried everything I could think of, references in the index.html, changing the path, and many more.  In the end, I came to the conclusion that the answer 
likely lay in the SystemJS and  how it was loading all of the other angular components. Since the "export" error kept making me think that the issue ws related to the module not being found to even be loaded.  
Sad, but when you take a break from coding, these things get rusty.  The index.html had references for core-js and others, but no references for the actual Angular modules.  
This pointed me to the System.config.js file.

After reading the file and then checking the [SystemJS Configuration API](https://github.com/systemjs/systemjs/blob/master/docs/config-api.md#map), the answer had to lie  Add a map reference in the System.config object.  And create a reference to the 

```javascript
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'shared': 'shared/models',  //must add this as a map for other 
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'shared': { main: 'index.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
    };
```


## Making Enums print nicely
This was great, but the enum values were printing index values instead of something useful for the user.  A quick search found the following 
post which describes how to ensure the string is returned, and can be a bit future proofed for converting my sample data to actual 
web service / api calls. See [How to implement an enum with string values in TypeScript](https://blog.rsuter.com/how-to-implement-an-enum-with-string-values-in-typescript/) for the details. 



## Changing the Activation Criteria

https://dev.office.com/docs/add-ins/outlook/contextual-outlook-add-ins


https://dev.office.com/docs/add-ins/outlook/match-strings-in-an-item-as-well-known-entities

be carful with the getEntities calls, they are tricky
    - test for Arrays with instanceOf
    - ensure that you are getting the correct collection of entities with the emailAddresses, addresses, etc. properties

Samples from some sites indicate that the following code shoudl work, but based on my testing this never returned results (correct me if I am wrong).


The best example I could find was in an old post, [Microsoft Office - Exploring the JavaScript API for Office: Mail Apps](https://msdn.microsoft.com/en-us/magazine/dn201750.aspx), which had thefollowing sample which indicates the behavior I am seeing.

```javascript
Office.initialize = function () {
  // Check for the DOM to load.
  $(document).ready(function () {
    var item = Office.context.mailbox.item;
    // Get an array of strings that represent postal addresses in the current item.
    var addresses = item.getEntitiesByType(Office.MailboxEnums.EntityType.Address); 
    // Continue processing the array of addresses.
  });
}
```

Note that theabove sample **does not** indicate that you should then use ``addresses.emailAddresses`` like many other samples do.  

In the end, I could not figure out how to supress TS2339 errors, but rather did the following to ensure the office.service.ts file compiled.  If there is a beter way let me know or send a pull request. 

### Produces TS2339 Error:
```javascript
let entities: Office.Entities = currentEmail.getEntitiesByType(Office.MailboxEnums.EntityType.EmailAddress);               
if(entities instanceof Array){
    this.logService.info('getEntitiesByType(): emails in an array', entities);
    entities.forEach((x:any) => emailAddresses.push(x));
    this.logService.info(' emails pushed into array', emailAddresses);
}
```

### NO TS2339 Error:
```javascript
 let entities: any = currentEmail.getEntitiesByType(Office.MailboxEnums.EntityType.EmailAddress);               
if(entities instanceof Array){
    this.logService.info('getEntitiesByType(): emails in an array', entities);
    entities.forEach((x:string) => emailAddresses.push(x));
    this.logService.info(' emails pushed into array', emailAddresses);
}
resolve(emailAddresses);        
```
Notice the ``let entities: any``  to force TypeScript to allow the use of the Office.Entities interface and the forEach() call. 

## Updating the CandidateService to filter emails
So at this point, I have a pretty functional set of code to start modifying in my desired direction.  The idea of the addin is to search a SharePoint list
for existing candidates by email that might be coming from a recruiting company.  

Let's filter down to the email. 


[Useful VS Code Extensions for Developing Addins](./docs/addin-vscode-extensions.md)

[Outlook Activation Rules](./docs/outlook-addin-rules.md)

[Office App Compatibility Kit](https://www.microsoft.com/en-us/download/confirmation.aspx?id=46831)