
var app = angular.module('app', ['ngRoute', 'app.controllers', 'app.services']);

app.config(function($routeProvider) {
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
        .when('/create', {
            templateUrl: '/javascripts/partials/create.html',
            controller: 'CreateCtrl'
        })
        .when('/edit/:id', {
            templateUrl: '/javascripts/partials/edit.html',
            controller: 'EditCtrl',
            resolve: {
                user: function(User, $route) {
                    return User.get({ id: $route.current.params.id })
                }
            }
        })
        .otherwise({
            redirectTo: '/home'
        });
});
