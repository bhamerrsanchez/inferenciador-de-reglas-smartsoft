/**
 * Module dependencies.
 */
var app = require('./config');
var http = require('http');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var inferenciadorWebsocket = require('./websocket/infereciadorWebSocket');

/**
 * Definicion del metodo encargado de la comunicacion por web socket
 */
io.on('connection', inferenciadorWebsocket.inferenciador);

server.on('error', onError);

server.listen(process.env.PORT || 3000,function(){
    console.log('Servidor en ejecucion');
});


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.export=io;