
var controllers = angular.module('app.controllers', []);

controllers.controller('HomeCtrl', function($scope) {

});

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

controllers.controller('ListCtrl', function($scope, users, User, $location) {
    $scope.users = users;
    $scope.remove = function(id) {
        User.remove({ id: id }, function() {
            $location.path('/list');
        });
    };
});

controllers.controller('CreateCtrl', function($scope, $location, User) {
    $scope.user = new User();

    $scope.save = function() {
        $scope.user.$save(success, error);

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

controllers.controller('EditCtrl', function($scope, $location, user) {
    $scope.user = user;

    $scope.save = function() {
        $scope.user.$update(success, error);

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
