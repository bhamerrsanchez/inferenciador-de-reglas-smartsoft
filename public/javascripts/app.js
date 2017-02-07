'use strict';
var inferenciadorApp = angular.module('inferenciadorApp',
    [
        'ui.router',
        'dndLists',
        'ngToast'
    ]);

inferenciadorApp.config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'center',
        maxNumber: 1
    });
}]);

inferenciadorApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/workspace/');
        $stateProvider
            .state('rules', {
                url: '/rulesCondition',
                templateUrl: 'views/templates/rules/rules_list.html',
                controller : 'ruleController'
            })
            .state('workspace', {
                url: '/workspace/:id',
                params : {
                    id : null
                },
                templateUrl: 'views/templates/rules/workspace.html',
                controller : 'workspaceController'
            })
            .state('inferenciador', {
                url: '/inferenciador-ws',
                templateUrl: 'views/templates/inferenciador.html',
                controller : 'inferenciadorController'
            })
    }]);

inferenciadorApp.constant('APP_CONFIG', function () {
    var API_PROTOCOL = 'https://';
    var API_HOST = 'still-dawn-67530.herokuapp.com';
    var API_PORT = '';
    var API_PATH = '/inferenciador/api';
    var API_VERSION = '/v1';
    var API_URL = API_PROTOCOL + API_HOST + API_PORT + API_PATH + API_VERSION;
    var path = {
        api : {
            rule: {
                base: API_URL + "/rule",
                baseId: API_URL + "/rule/{id}"
            }
        }
    };
    return {
        path: path
    };
});