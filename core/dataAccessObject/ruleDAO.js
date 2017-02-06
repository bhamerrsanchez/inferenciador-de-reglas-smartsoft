var mongoose = require('mongoose');
var Rule = mongoose.model('Rule');

/**
 * Función que retorna todas las reglas almacenadas en la base de datos
 * @param req
 * @param res
 */
exports.findAll = function (callback) {
    Rule.find({},['idRule','_id','name','condition'],function (err, docs) {
        callback(err,docs);
    });
};

/**
 * Funcion que retorna una regla por su id
 * @param req
 * @param res
 */
exports.findById = function(id, callback) {
    Rule.findById(id, function(err, document) {
        callback(err,document);
    });
};

/**
 * Función que realiza la creacion de la regla en la base de datos
 * @param object
 */
exports.save = function(object, callback) {
    var rulSave =new Rule({
        name: object.name,
        condition: object.condition,
        conditionObjects: object.conditionObjects
    });
    rulSave.save(function (err, document) {
        callback(err,document)
    });
};

/**
 * Función para realizar la actualizacion de una regla almacenada en la base de datos
 * @param req
 * @param res
 */
exports.update = function(id, object, callback) {
    Rule.update({ _id: id }, { $set: {
        name: object.name,
        condition: object.condition,
        conditionObjects: object.conditionObjects
    }},function (err, document) {
        callback(err,document)
    });
};

/**
 * Función que realiza la elimiancion de la regla almacenada en la base de datos por el id
 * @param req
 * @param res
 */
exports.delete = function(id,callbacks) {
    Rule.findOneAndRemove({_id: id}, function(err){
        callbacks(err);
    });
};