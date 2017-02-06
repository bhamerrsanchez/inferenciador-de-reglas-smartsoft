'use strict';
var inferenciadorApp = angular.module('inferenciadorApp');
inferenciadorApp.controller('ruleController',
    ['$scope', '$state', 'ruleService', 'factoryLoader', 'ngToast',
        function ($scope, $state, $ruleService, $factoryLoader, $ngToast) {

            $scope.rules = [];

            /**
             * Fuunción para redireccionara la aplicación
             * a la vista de la creación de una nueva regla
             */
            $scope.openWorkspace = function () {
                $state.go('workspace');
            };

            /**
             * Fuunción para redireccionara la aplicación
             * a la vista de prueba de inferenciador
             */
            $scope.openInferenciador = function () {
                $state.go('inferenciador');
            };

            /**
             * Función que obtiene todas las reglas configuradas
             * en el servicio rest de la aplicación
             */
            $scope.getAll = function () {
                $factoryLoader.show('Obteniendo todos las reglas registradas en el servidor');
                $ruleService.getAll().then(
                    function (response) {
                        $scope.rules = response.data;
                        $factoryLoader.hide();
                        $ngToast.info('Se obtuvieron todas las reglas registradas');
                    },
                    function (error) {
                        $factoryLoader.hide();
                        $ngToast.danger(error.message);
                    });
            };

            /**
             * Función que elimina la regla configurada
             * por el id en el servicio rest de la aplicación
             */
            $scope.deleteRule = function (id) {
                console.log('eliminando regla con el id : ' + id);
                $ruleService.delete(id).then(
                    function (response) {
                        $factoryLoader.hide();
                        $ngToast.info('Se eliminó la regla correctamente.');
                        var index;
                        angular.forEach($scope.rules, function (value, key) {
                            if (value.idRule == id) {
                                index = key;
                            }
                        });
                        if (!validate.isEmpty(index)) {
                            $scope.rules.splice(index, 1);
                        }
                    },
                    function (error) {
                        $ngToast.danger(error.message);
                    });
            };

            /**
             * Funcion de redireccion la regla por el id
             * al area de trabajo para su edición
             * @param id
             */
            $scope.editRule = function (id) {
                console.log('editando regla con el id : ' + id);
                $state.go('workspace', {id:id});
            };

            angular.element(document).ready(function () {
                $scope.getAll();
            });
        }]);