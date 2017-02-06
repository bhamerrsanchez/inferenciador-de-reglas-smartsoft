var ruleDAO = require('../dataAccessObject/ruleDAO');

/**
 * Función que realiza la busqueda de
 * todas las reglas alamacenadas en la
 * base de datos
 * @param callback
 */
exports.findAll = function (callback) {
    ruleDAO.findAll(function (error, documents) {
        console.log("recibiendo resultados del DAO : ", error, documents);
        callback(error, mapDocumensToRules(documents));
    });
};

/**
 * Función que realiza la busqueda de la
 * regla en la base de datos basado en el
 * id de la regla
 * @param id
 * @param callback
 */
exports.findById = function (id, callback) {
    if (validate.isEmpty(id)) {
        var error = {
            message: "El id de la regla es un valor obligatorio"
        };
        callback(error, null)
    } else {
        ruleDAO.findById(id, function (error, document) {
            console.log("recibiendo resultado de busqueda por el id del DAO : ", error, document);
            callback(error, mapDocumentToRule(document));
        });
    }
};

/**
 * Funcion que realiza el almcenamiento de la regla
 * en la base de datos
 * @param ruleObject
 * @param callback
 */
exports.save = function (ruleObject, callback) {
    if (!validate.isEmpty(validateRule(ruleObject).message)) {
        callback(validateRule(ruleObject), null);
    } else {
        ruleDAO.save(ruleObject, function (error, document) {
            callback(error, mapDocumentToRule(document));
        });
    }
};

/**
 * Funcion que actualiza los campos en la base de datos de una regla
 * @param id
 * @param ruleObject
 * @param callback
 */
exports.update = function (id, ruleObject, callback) {
    if (validate.isEmpty(id)) {
        var error = {
            message: "El id de la regla es un valor obligatorio"
        };
        callback(error, null)
    }
    if (!validate.isEmpty(validateRule(ruleObject).message)) {
        callback(validateRule(ruleObject), null);
    } else {
        ruleDAO.update(id, ruleObject, function (error, document) {
            if (!validate.isEmpty(document.ok) && document.ok==1){
                callback(error, ruleObject);
            }else{
                callback(error, null);
            }

        });
    }
};

/**
 * Función que elimina una regla almacenada en la base de datos
 * @param id
 * @param callback
 */
exports.delete = function (id, callback) {
    this.findById(id, function (error, object) {
        if (error) {
            callback(error, null);
        } else if (validate.isEmpty(object)) {
            callback({message: 'La regla con el id [' + id + '] no esxite'}, null);
        } else {
            console.log('Eliminado regla por el id : ' + id);
            ruleDAO.delete(id, function (error, document) {
                console.log("recibiendo resultado de eliminacion del DAO : ", error, document);
                callback(error, document);
            });
        }
    });

};

/**
 * Función que convierte varios documentos en una lista
 * con la estructura de la regla
 * @param objects
 * @returns {Array}
 */
function mapDocumensToRules(objects) {
    var result = [];
    objects.forEach(function (object) {
        result.push(mapDocumentToRule(object));
    });
    return result;
}

/**
 * Función que convierte el documento en el objeto con
 * la estructura de la regla
 * @param object
 * @returns {*}
 */
function mapDocumentToRule(object) {
    if (object) {
        return {
            idRule: object._id,
            name: object.name,
            condition: object.condition,
            conditionObjects: object.conditionObjects
        };
    }
    return null;
}

/**
 * FUncion que realiza la validacion de los atributos de la regla
 * @param object
 * @returns {*|any}
 */
function validateRule(object) {
    var constraint = {
        name: {
            presence: {
                message: 'El nombre de la regla es un campo obligatorio.'
            },
            length: {
                maximum: 20,
                message: "El nombre de la regla no puede exceder los 20 caracteres."
            }
        },
        condition: {
            presence: {
                message: 'La condición de la regla es un campo obligatorio.'
            }
        }
    };
    var error = {message: validate(object, constraint, {format: "flat", fullMessages: false})};
    return error;
}