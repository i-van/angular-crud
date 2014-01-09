(function(window, angular, undefined) {'use strict';

var services = angular.module('app.services', ['ngResource']);

services.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@_id' }, {
        query: {
            method: 'GET',
            params: { page: 1 }
        },
        update: { method: 'PUT' }
    });
}]);

})(window, window.angular);
