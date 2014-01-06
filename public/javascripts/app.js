
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'app.controllers', 'app.services', 'app.directives']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            template: '<h1>Home Page</h1>',
            controller: angular.noop
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
            controller: 'UserCtrl',
            resolve: {
                user: function(User) {
                    return new User();
                }
            }
        })
        .when('/edit/:id', {
            templateUrl: '/javascripts/partials/edit.html',
            controller: 'UserCtrl',
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
