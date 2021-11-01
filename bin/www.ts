#!/usr/bin/env node

/**
 * Module dependencies.
 */

 import app from '../app';
 import * as http from 'http';
 
 /**
  * Create HTTP server.
  */
 
 const server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 console.log("Start Server")
 server.listen(8080, 'localhost');