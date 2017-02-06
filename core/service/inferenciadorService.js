var ruleService = require('../service/ruleService');

/**
 * Metodo que realiza el proceso de validacion del
 * hecho con las reglas configuradas en el servidor
 * @param object
 * @param callback
 */
exports.inferenciar  = function (object, callback){
    ruleService.findAll(function(error,documents){
        if (!validate.isEmpty(object)){
            var  variable = '';
            for (var key in  object){
                variable += 'var '+key+' = '+ (validate.isString(object[key])?"'"+object[key]+"'":object[key])+';';
            }
            console.log(variable);

            var result =[];
            console.log(documents);
            for (var key in documents) {
                var evalCondition = variable + documents[key].condition;
                console.log(evalCondition);
                try {
                    if (eval(evalCondition)) {
                        result.push(documents[key].idRule);
                    }
                }catch (e){
                console.error(e.message);
                }
            }
            console.log('procesando datos con el inferneciador');
            callback(error,result);
        }else{
            error = {message:'el hecho en una estructura obligatoria para la validación de las reglas'};
            callback(error,null);
        }

    });
};