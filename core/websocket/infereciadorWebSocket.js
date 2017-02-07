

var inferenciadorService = require('../service/inferenciadorService');


exports.inferenciador = function (socket){
    console.log('Un cliente se conecto');
    socket.on('inferenciar', function(data){
       console.log('recibiendo los datos para procesar el inferenciador');
        console.log(data);
       inferenciadorService.inferenciar(data, function (error, objects) {
          if (error){
              console.log('ws - enviando error');
              socket.emit('inferenciador-error', {message:error.message});
          }else{
              console.log('ws - enviando resultado');
              socket.emit('inferenciador-result',objects);
          }
       });
    });
};


