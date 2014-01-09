
var directives = angular.module('app.directives', ['ngSanitize']);

directives.factory('Pagination', function() {
    return {
        getLinks: function(options) {
            var currentPage = +options.currentPage
              , totalPages = +options.totalPages
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
                    label: i
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

directives.directive('pagination', ['Pagination', function(Pagination) {
    return {
        restrict: 'A',
        scope: {
            pagination: '='
        },
        template: '<li ng-repeat="link in links" class="{{link.className}}">'
                +     '<a href="{{link.url}}" ng-bind-html="link.label.toString()"></a>'
                + '</li>',
        link: function(scope, el) {
            el.addClass('pagination');
            scope.links = [];

            scope.$watch('pagination', function(options) {
                scope.links = Pagination.getLinks(options)
            });
        }
    };
}]);

directives.directive('confirm', ['$compile', function($compile) {
    var template = '<modal-confirm title="{{confirm.title}}" on-confirm="onConfirm()">'
                 +     '<p>{{confirm.message}}</p>'
                 + '</modal-confirm>';
    return {
        restrict: 'A',
        scope: {
            confirm: '=',
            onConfirm: '&'
        },
        link: function(scope, el) {
            el.on('click', function() {
                $compile(template)(scope);
                return false;
            });
        }
    };
}]);

// completely remove modal element
$.fn.modal.Constructor.prototype.remove = function() {
    this.removeBackdrop();
    this.$element.remove();
    this.$element = null
};

directives.directive('modalConfirm', function() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            confirm: '&onConfirm'
        },
        replace: true,
        transclude: true,
        templateUrl: '/javascripts/app/partials/modal-confirm.html',
        link: function(scope, el) {
            el.modal('show');
            el.on('hidden.bs.modal', function() {
                el.data('bs.modal').remove();
            });

            el.on('click', '.modal-footer .btn-primary', function() {
                el.data('bs.modal').hide();
                scope.$apply(function() {
                    scope.confirm();
                });
            });
        }
    };
});
