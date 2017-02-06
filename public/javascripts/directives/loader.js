'use strict';
var inferenciadorApp = angular.module('inferenciadorApp');
inferenciadorApp.factory("factoryLoader",
    [
        function () {
            var $scope;
            var $element;

            var $loader = {};
            $loader.init = function (scope, element) {
                if (angular.isUndefined($scope)) {
                    $scope = scope;
                    $scope.text = 'Cargando Información. Espere un momento';
                }
                if (angular.isUndefined($element)) {
                    $element = element;
                    $($element).dimmer('hide');
                }
            };
            $loader.show = function (text) {
                if (!angular.isUndefined(text)) {
                    $scope.text = text;
                }
                $($element).dimmer({
                    closable: false,
                    debug: false
                });
                $($element).dimmer('show');
            };

            $loader.hide = function () {
                $scope.text = '';
                $($element).dimmer('hide');
            };
            return $loader;
        }]);

inferenciadorApp.directive('loader',
    ["$compile", "factoryLoader",
        function ($compile, $factory) {
            return {
                restrict: 'E',
                templateUrl: '../../../views/templates/loading.html',
                link: function (scope, element) {
                    $factory.init(scope, element);
                    //$compile(element.contents())(scope);
                }
            }
        }]);

inferenciadorApp.service("serviceManageError",
    [
        function () {
            this.processError = function (response) {
                var error_message = '';
                if (response !== null) {
                    if (!validate.isEmpty(response.errors) && !validate.isEmpty(response.errors[0]) && !validate.isEmpty(response.errors[0].message) && response.errors[0].message != null) {
                        error_message = response.errors[0].message;
                    } else {
                        error_message = response.message;
                    }
                } else {
                    error_message = 'No hay conexion con el servidor de la aplicación. contacte a soporte';
                }
                return error_message;
            }
        }
    ]);