'use strict';
var inferenciadorApp = angular.module('inferenciadorApp');
inferenciadorApp.controller('workspaceController',
    ['$scope', '$state', 'ruleService', 'factoryLoader','ngToast',
        function ($scope, $state, $ruleService, $factoryLoader,$ngToast) {
            $scope.conditionObjects=[];
            $scope.data = {
                idRule: null,
                name : null,
                condition : null,
                conditionObjects:[]
            };

            $scope.options = [
                {
                    title: 'Campo de Hecho',
                    iconName: 'fa-ravelry',
                    templates: [
                        {label: 'Hecho', type: "fact", id: 1, field: ''}
                    ]
                },
                {
                    title: 'Condiciones Booleanas',
                    iconName: 'fa-ravelry',
                    templates: [
                        {label: 'and', value: '&&', type: "and|or", id: 1, inputs: [[]]},
                        {label: 'or', value: '||', type: "and|or", id: 1, inputs: [[]]}
                    ]
                },
                {
                    title: 'Comparar Datos',
                    iconName: 'fa-ravelry',
                    templates: [
                        {label: 'Menor', value: '<', type: 'compare', id: 1, a: [[]], b: [[]]},
                        {label: 'Menor o Igual', value: '<=', type: 'compare', id: 1, a: [[]], b: [[]]},
                        {label: 'Igual', value: '==', type: 'compare', id: 1, a: [[]], b: [[]]},
                        {label: 'Diferente', value: '!=', type: 'compare', a: [[]], b: [[]]},
                        {label: 'Mayor o Igual', value: '>=', type: 'compare', a: [[]], b: [[]]},
                        {label: 'Mayor', value: '>', type: 'compare', id: 1, a: [[]], b: [[]]}
                        // {label: 'like', value: 'like', type: 'compare', id: 1, a: [[]], b: [[]]},
                        // {label: '!like', value: '!like', type: 'compare', id: 1, a: [[]], b: [[]]},
                        // {label: 'regex', value: 'regex', type: 'compare', id: 1, a: [[]], b: [[]]},
                        // {label: '!regex', value: '!regex', type: 'compare', id: 1, a: [[]], b: [[]]}
                    ]
                },
                {
                    title: 'Aritmeticos',
                    iconName: 'fa-ravelry',
                    templates: [
                        {label: 'suma', value: '+', type: "add|mul", id: 1, inputs: [[]]},
                        {label: 'multiplicación', value: '*', type: "add|mul", id: 1, inputs: [[]]},
                        {label: 'resta', value: '-', type: "sub|div", id: 1, a: [[]], b: [[]]},
                        {label: 'división', value: '/', type: "sub|div", id: 1, a: [[]], b: [[]]},
                        {
                            label: 'Constante',
                            value: null,
                            svalue: null,
                            option: '',
                            options: ['int', 'string'],
                            type: "constant",
                            id: 1
                        },
                    ]
                }
            ];

            $scope.openRules = function () {
                $state.go('rules');
            };
            $scope.saveRule = function () {
                // $scope.data.conditionObjects = $scope.models.conditionObjects;
                $factoryLoader.show('Registrando regla');
                $ruleService.save($scope.data).then(
                    function (response) {
                        $scope.data = response.data;
                        $scope.conditionObjects = response.data.conditionObjects;
                        $factoryLoader.hide();
                        $ngToast.info('La regla se guardo correctamente');
                    },
                    function (error) {
                        $factoryLoader.hide();
                        $ngToast.danger(error.data.message.toString())
                    });
            };

            $scope.findById = function(id){
                $factoryLoader.show('Obteniendo regla por el id : '+id);
                $ruleService.getById(id).then(
                    function(response){
                        $scope.data = response.data;
                        $scope.conditionObjects = response.data.conditionObjects;
                        console.log($scope.data);
                        $factoryLoader.hide();
                        $ngToast.info('Se obtuvo la regla por el id : '+id+' correctmaente');
                    },
                    function(error){
                        $ngToast.error(error.data.message.toString());
                    }
                )
            };

            $scope.$watch('conditionObjects', function (model) {
                console.log('Cambio el modelo');
                $scope.modelAsJson = angular.toJson(model, true);
                $scope.condition = convertDslToString(model);
            }, true);

            function convertDslToString(model) {
                console.log("Ingreso a la conversion");
                var stringCondition = '';
                for (var i = 0; i < model.length; i++) {
                    var value = model[i];
                    console.log(value);
                    stringCondition += validateValue(value);
                }
                $scope.data.condition = stringCondition;
            };
            function factToString(model) {
                return model.field.trim();
            };
            function constantToString(model) {
                if (model.option=="int"){
                    return model.value;
                }else if (model.option=="string"){
                    return '"'+model.svalue+'"';
                }
            };
            function andorToString(model) {
                var stringCondition = '';
                stringCondition += '(';
                for (var i = 0; i < model.inputs[0].length; i++) {
                    var value = model.inputs[0][i];
                    stringCondition += validateValue(value);
                    if (i < model.inputs[0].length - 1) {
                        stringCondition += ' ' + model.value + ' ';
                    }
                }
                stringCondition += ')';

                return stringCondition;
            }
            function validateValue(value) {
                var stringCondition = '';
                if (value.type == "fact") {
                    stringCondition += factToString(value);
                } else if (value.type == "and|or" || value.type == "add|mul") {
                    stringCondition += andorToString(value);
                } else if (value.type == "compare" || value.type == "sub|div") {
                    stringCondition += compareToString(value);
                }else if(value.type == "constant"){
                    stringCondition += constantToString(value);
                }
                return stringCondition;
            }
            function compareToString(model) {
                var stringCondition = '';
                stringCondition += '(';
                var a = model.a[0][0];
                var b = model.b[0][0];
                if (model.type == 'regex') {
                    new RegExp("^(19|20)\\d{2}$").test(2013);
                    stringCondition += 'new RegExp(' + validateValue(a).replace('\\', '\\\\') + ').test(' + validateValue(b) + ')';
                } else if (model.type == 'like') {
                    stringCondition += validateValue(a) + '.' + '(/^' + validateValue(b).replace('%', '.*') + '$/)';
                } else {
                    stringCondition += validateValue(a);
                    stringCondition += model.value;
                    stringCondition += validateValue(b);
                }


                stringCondition += ')';

                return stringCondition;
            }

            angular.element(document).ready(function () {
                if(!validate.isEmpty($state.params.id)){
                    $scope.findById($state.params.id);
                }
            });
        }]);