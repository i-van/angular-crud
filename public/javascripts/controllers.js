
var controllers = angular.module('app.controllers', []);

controllers.controller('NavCtrl', function($scope, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
        $scope.routeRegExp = route.$$route && route.$$route.regexp;
    });

    $scope.links = [
        { href: '/home', label: 'Home' },
        { href: '/list', label: 'List of users' },
        { href: '/create', label: 'Create user' }
    ];
});

controllers.controller('ListCtrl', function($scope, users, User, $route) {
    $scope.users = users;
    $scope.remove = function(id) {
        User.remove({ id: id }, function() {
            $route.reload();
        });
    };
});

controllers.controller('UserCtrl', function($scope, $location, user) {
    $scope.user = user;

    $scope.save = function() {
        var action = !user._id ? '$save' : '$update';
        user[action](success, error);

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
