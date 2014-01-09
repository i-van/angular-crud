
//= require bower_components/jquery/jquery.min.js
//= require bower_components/bootstrap/dist/js/bootstrap.min.js
//= require bower_components/angular/angular.js
//= require bower_components/angular-route/angular-route.js
//= require bower_components/angular-resource/angular-resource.js
//= require bower_components/angular-sanitize/angular-sanitize.js
//= require bower_components/angular-animate/angular-animate.js
//= require_tree app

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.templates'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            template: '<h1>Home Page</h1>',
            controller: angular.noop
        })
        .when('/list/:page?', {
            templateUrl: '/javascripts/app/partials/list.html',
            controller: 'ListCtrl',
            resolve: {
                users: ['User', '$route', function(User, $route) {
                    return User.query({ page: $route.current.params.page })
                }]
            }
        })
        .when('/create', {
            templateUrl: '/javascripts/app/partials/create.html',
            controller: 'UserCtrl',
            resolve: {
                user: ['User', function(User) {
                    return new User();
                }]
            }
        })
        .when('/edit/:id', {
            templateUrl: '/javascripts/app/partials/edit.html',
            controller: 'UserCtrl',
            resolve: {
                user: ['User', '$route', function(User, $route) {
                    return User.get({ id: $route.current.params.id })
                }]
            }
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
