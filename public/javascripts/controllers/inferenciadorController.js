'use strict';
var inferenciadorApp = angular.module('inferenciadorApp');
inferenciadorApp.controller('inferenciadorController',
    ['$scope', '$state', 'ruleService', 'factoryLoader', 'ngToast',
        function ($scope, $state, $ruleService, $factoryLoader, $ngToast) {
            $scope.result = null;
            var socket = io.connect('http://https://still-dawn-67530.herokuapp.com', {forceNew: true});

            /**
             * Función que permite la visualizacion del mensaje obtenido
             * por el socket que procesa la validacion del
             * hecho en el inferenciador
             * @param data
             */
            $scope.showResult = function (data){
                console.log('recibiendo resultados', data);
                $scope.result = data;
                console.log('$scope.result : ',$scope.result);
            };

            /**
             * Función que muestra un error en caso de ser generado en
             * el servidor a traves del web socket del inferenciador
             * @param error
             */
            $scope.showError = function (error){
                console.log('recibiendo error');
                $ngToast.danger(error.message);
            };

            /**
             * Defincion de los mensajes que se enciaran entre
             * el web socket del cliente y el servidor
             */
            socket.on('inferenciador-result', $scope.showResult);
            socket.on('inferenciador-error', $scope.showError);

            $scope.data={
                value: '',
                object :''
            };

            /**
             * Función para redireccionara la aplicación
             * a la vista de la creación de una nueva regla
             */
            $scope.openRules = function () {
                $state.go('rules');
            };

            /**
             * Función que obtiene todas las reglas configuradas
             * en el servicio rest de la aplicación
             */
            $scope.inferenciar = function () {
                $ngToast.info('Enviado datos a validar');
                socket.emit('inferenciar',$scope.data.object);
            };

            $scope.$watch('data.value', function(value) {
                console.log(value);
                if (!validate.isEmpty(value)) {
                    $scope.data.object = (eval("(" + value + ")"));
                }
            });
        }]);