
var services = angular.module('app.services', ['ngResource']);

services.factory('User', function ($resource) {
    return $resource('/api/users/:id', { id: '@_id' }, {
        query: {
            method: 'GET',
            params: { page: 1 }
        }
    });
});
