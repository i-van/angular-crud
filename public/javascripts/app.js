
var userApp = angular.module('userApp', ['ngRoute', 'userControllers']);

userApp.config(function($routeProvider) {
//        "create": "create",
//        "edit/:id": "edit",
//        "remove/:id": "remove"
    $routeProvider
        .when('/home', {
            templateUrl: '/javascripts/partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/list/:page?', {
            templateUrl: '/javascripts/partials/list.html',
            controller: 'ListCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
