var express = require('express');
var ruleService = require('../service/ruleService');
var ruleController = express.Router();

/**
 * Controlador Rest Metodo GET que obtienen
 * todas las reglas configuradas en el servidor
 */
ruleController.get('/', function (req, res, next) {
    console.log("Obteniendo todas las reglas alamcenadas");
    ruleService.findAll(function (error, objects) {
        console.log("documentos obtenidos");
        if (error) {
            console.log("Error : ", error);
            res.status(500).jsonp({message:error.message});
        }else{
            res.status(200).jsonp(objects);
        }
    });
});

/**
 * Controlador Rest Metodo GET que obtienen
 * una regla basado en el identificador de la regla
 */
ruleController.get('/:id', function (req, res) {
    console.log('Obteniendo regla por el id ['+req.params.id+']');
    ruleService.findById(req.params.id,function (error, object) {
        console.log("documento obtenido");
        if (error) {
            console.log("Error : ", error);
            res.status(500).jsonp({message:error.message});
        }
        if (!object){
            res.status(500).jsonp({message:'La regla con el identificador ['+req.params.id+']. no existe.'});
        }else{
            res.status(200).jsonp(object);
        }

    });
});
/**
 * Controlador Rest Metodo POST que crea y actualiza
 * una regla
 */
ruleController.post('/', function (req, res) {
    if (req.body.idRule) {
        console.log('Actualizando la regla con la información : %j', req.body);
        ruleService.update(req.body.idRule, req.body, function (error, object) {
            if (error) {
                console.log("Error : ", error);
                res.status(500).jsonp({message:error.message});
            }else {
                res.status(200).jsonp(object);
            }
        });
    } else {
        console.log('Almacenando la regla con la información : %j', req.body);
        ruleService.save(req.body, function (error, object) {
            console.log("documentos obtenidos");
            if (error) {
                console.log("Error : ", error);
                res.status(500).jsonp({message:error.message});
            }else {
                res.status(200).jsonp(object);
            }
        });
    }
});
/**
 * Controlador Rest Metodo PUT que actualiza
 * una regla - Recurso no implementado
 */
ruleController.put('/:id', function (req, res) {
    console.log('Recurso no implementado se expone la operación por metodo POST');
    res.status(500).jsonp({
        message: 'Recurso no implementado se expone la operación por metodo POST'
    });
});

ruleController.delete('/:id', function (req, res) {
    console.log('Eliminado la regla con el id : ' + req.params.id);
    ruleService.delete(req.params.id,function (error) {
        console.log("regla eliminada");
        if (error) {
            console.log("Error : ", error);
            res.status(500).jsonp({message:error.message});
        }else {
            res.status(200).send();
        }
    });
});

module.exports = ruleController;