'use strict';
var inferenciadorApp = angular.module('inferenciadorApp');
inferenciadorApp.service('ruleService', [
    '$http','APP_CONFIG',
    function ($http, config) {

        /**
         * Funcion que realiza la peticion de obtencion de todas las
         * reglas alamcenadas en el servidor
         * @returns {*}
         */
        this.getAll = function(){
            return $http({
                method : 'GET',
                url : config().path.api.rule.base
            });
        };

        /**
         * Funcion que realiza la peticion de obtencion de la regla
         * almacenada en el servidor por el identificador de la regla
         * @param id
         * @returns {*}
         */
        this.getById = function(id){
            return $http({
                method : 'GET',
                url : config().path.api.rule.baseId.replace("{id}", id)
            });
        };

        /**
         * Funcion que realiza la peticion de alamcenamiento de la regla
         * alamcenada en el servidor con lod datos en formato json de la
         * estructura de la regla a alamcenar
         * @param data
         * @returns {*}
         */
        this.save = function(data){
            return $http({
                method : 'POST',
                url :  config().path.api.rule.base,
                data : data
            });
        };

        /**
         * Funcion que realiza la peticion de actualizacion de la regla
         * alamcenada en el servidor con los datos en formato json de la
         * estructura de la regla a alamcenar y el id del objeto a almcenar
         * @param id
         * @param data
         * @returns {*}
         */
        this.update = function(id,data){
            return $http({
                method : 'PUT',
                url : config().path.api.rule.baseId.replace("{id}", id),
                data : data
            });
        };

        /**
         * Funcion que realiza la peticion de eliminacion de la regla
         * alamcenada en el servidor con el id de la regla a eliminar
         * @param id
         * @returns {*}
         */
        this.delete = function(id){
            return $http({
                method : 'DELETE',
                url : config().path.api.rule.baseId.replace("{id}", id)
            });
        };
    }
]);
