
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

controllers.controller('CreateCtrl', function($scope, $location, User) {
    $scope.user = {};

    $scope.save = function() {
        User.save($scope.user, success, error);

        function success() {
            $location.path('/list');
        }

        function error(res) {
            if (res.status !== 400) { return; }

            $scope.errors = {};
            angular.forEach(res.data, function(error) {
                ($scope.errors[error.field] || ($scope.errors[error.field] = []))
                    .push(error.message);
            });
        }
    };
});
