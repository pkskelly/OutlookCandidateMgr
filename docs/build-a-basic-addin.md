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

* You will need an HTTPS server for development sicne the Office Add-ins requires and https connection.  Herea are a couple options: 
    * Read the [Node.js Documentation](https://nodejs.org/api/https.html)
    * Follow steps in this this link[http://www.hacksparrow.com/node-js-https-ssl-certificate.html](http://www.hacksparrow.com/node-js-https-ssl-certificate.html) 
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
