
var controllers = angular.module('app.controllers', []);

controllers.controller('HomeCtrl', function($scope) {

});

controllers.controller('NavCtrl', function($scope) {
    $scope.links = [
        { href: '#/home', label: 'Home' },
        { href: '#/list', label: 'List of users' },
        { href: '#/create', label: 'Create user' }
    ];
});

controllers.controller('ListCtrl', function($scope, users) {
    $scope.users = users;
});
