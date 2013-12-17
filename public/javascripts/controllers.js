
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

controllers.controller('ListCtrl', function($scope) {
    $scope.users = [
        {
            _id: 1,
            login: 'login 1',
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            created: new Date(),
            updated: new Date()
        },
        {
            _id: 2,
            login: 'login 2',
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            created: new Date(),
            updated: new Date()
        }
    ];
});
