
var directives = angular.module('app.directives', ['ngSanitize']);

directives.factory('Pagination', function() {
    return {
        getLinks: function(options) {
            var currentPage = +options.currentPage
              , totalPages = Math.ceil(options.totalItems / options.itemsPerPage)
              , previous = Math.max(currentPage - 1, 1)
              , next = Math.min(currentPage + 1, totalPages)
              , from = currentPage - 2
              , to = currentPage + 2
              , isFirst = currentPage <= 1
              , isLast = currentPage >= totalPages
              , links = []
              , _url = function(page) {
                    return options.url.replace(':page', page);
                };

            if (totalPages <= 1) {
                return links;
            }

            if (from < 1) {
                from = 1;
                to = from + 4
            } else if (to > totalPages) {
                to = totalPages;
                from = to - 4
            }
            from = Math.max(from, 1);
            to = Math.min(to, totalPages);

            links.push({
                className: isFirst ? 'disabled': '',
                url: _url(previous),
                label: '&laquo;'
            });

            for (var i = from; i <= to; i++) {
                links.push({
                    className: currentPage == i ? 'active': '',
                    url: _url(i),
                    label: i.toString()
                });
            }

            links.push({
                className: isLast ? 'disabled': '',
                url: _url(next),
                label: '&raquo;'
            });

            return links;
        }
    };
});

directives.directive('pagination', function(Pagination) {
    return {
        restrict: 'A',
        scope: {
            pagination: '='
        },
        template: '<li ng-repeat="link in links" class="{{link.className}}"><a href="{{link.url}}" ng-bind-html="link.label"></a></li>',
        link: function(scope, el) {
            el.addClass('pagination');
            scope.links = [];

            scope.$watch('pagination', function(options) {
                scope.links = Pagination.getLinks(options)
            });
        }
    };
});
