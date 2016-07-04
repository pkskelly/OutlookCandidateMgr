# Creating an Office Addin using Angular2, TypeScript and Express
The following steps are the way I went about learning and deconstructing Andrew Connell's presentation code about creating Office Addins using Angular 2.  
Theses steps leverage and reproduce much of the code from Andrew Connell's GitHUb repository (Learning Angular2 to Build Office Add-ins)[https://github.com/andrewconnell/pres-ng2-officeaddin]. 
1. Create the directory structure 
    ```
        └── src
        ├── client
        │   ├── app
        │   ├── images
        │   └── js
        ├── server
        └── shared
    ```
2. Run npm init to initialize a project
3. Create a .gitignore file
4. Run git init to initialize a repository 
5. Iniital Check in 
6. Add express and additional packages for server
   ``` 
   npm install express debug request core-js colors connect-logger  --save
   ```
7. Add an /src/client/index.html file 
8. Add an /src/server/server.ts file for the express server
9. Run npm install for devDependencies 
    ```
        npm install typescript typings  --save-dev
    ```
10. Install typings globall to aquire the typings from npm or other sources
    ```
        npm install typings -g 
    ```
11. Install typings needed for express and other items 
To install the typings you need see [Typings Github Repo](https://github.com/typings/typings)
12. Most of the typings require something similar to the following:
    ```
        typings install dt~node --save --global
    ```

    This will install the dependencies in the typings.json file
13. Add "typings install" as a postinstall script in paskage.json
14. Add the following to the tsconfig.json file
    ```
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
15. Update the server.ts with a basic express config to serve static files for now. 
    ```
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
16. Add MIT LICENSE file 
17. Update the index.html to include basic links  (page is broken at this point)
18. Add start script to package.json
    ```
            "start": "tsc && node ./src/server/server.js ",
    ```
19. Add the Angular 2 NPM modules
20. Configure /vendor route
21. Configure /client/js/system.config.js 
22. 
