
var services = angular.module('app.services', ['ngResource']);

services.factory('User', function ($resource) {
    return $resource('/api/users/:id', {}, {
        query: {
            method: 'GET',
            params: { page: 1 },
            transformResponse: function(res) {
                res = angular.fromJson(res);

                var data = res.data;
//                data.itemsPerPage = res.itemsPerPage;
//                data.currentPage = res.currentPage;
//                data.totalItems = res.totalItems;

                return data;
            },
            isArray: true
        }
    });
});
