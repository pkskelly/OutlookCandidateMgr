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
