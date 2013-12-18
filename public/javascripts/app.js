
var app = angular.module('app', ['ngRoute', 'app.controllers', 'app.services']);

app.config(function($routeProvider) {
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
            controller: 'ListCtrl',
            resolve: {
                users: function(User, $route) {
                    return User.query({ page: $route.current.params.page })
                }
            }
        })
        .otherwise({
            redirectTo: '/home'
        });
});
