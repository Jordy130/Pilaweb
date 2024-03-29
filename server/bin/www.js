#!/usr/bin/env node 
/** 
 * Module dependencies. 
 */ 
import app from '../app';
import debugLib from 'debug'; //('pilaweb:server')
import http from 'http';
const debug = debugLib('it-server');    

/** 
* Normalize a port into a number, string, or false. 
*/ 
function normalizePort(val) { 
const port = parseInt(val, 10); 

if (isNaN(port)) { 
// named pipe 
return val; 
} 
if (port >= 0) { 
// port number 
return port; 
} 
return false; 
} 

/** 
* Get port from environment and store in Express. 
*/ 
var port = normalizePort(process.env.PORt || '3000'); 
app.set('port', port); 

/** 
* Event listener for HTTP server "error" event. 
*/ 
function onError(error) { 
if (error.syscall !== 'listen') { 
   throw error; 
} 

const bind = typeof port === 'string' 
 ? 'Pipe ' + port
 : 'Port ' + port; 

// handle specific listen errors with friendly messages 
switch (error.code) { 
case 'EACCES': 
   console.error(bind + ' requires elevated privileges'); 
   process.exit(1); 
   break; 
case 'EADDRINUSE': 
   console.error(bind+ 'is already in use'); 
   process.exit(1); 
   break; 
default: 
   throw error; 
} 
} 
 
/** 
* Create HTTP server. 
*/ 
var server = http.createServer(app); 

/** 
* Event listener for HTTP server "listening" event. 
*/ 
function onListening() { 
  const addr = server.address(); 
  const bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
debug('Listening on ' + bind); 
} 

/** 
 * Listen on provided port, on all network interfaces. 
 */
server.listen(port); 
server.on('error', onError); 
server.on('listening', onListening);