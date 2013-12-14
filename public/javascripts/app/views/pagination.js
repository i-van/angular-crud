define(['backbone', 'underscore'], function(Backbone, _) {
    return Backbone.View.extend({
        tagName: 'ul',
        className: 'pagination',
        template: _.template('<li class="<%= _class %>"><a href="<%= url %>"><%= label %></a></li>'),
        initialize: function(options) {
            this.itemsPerPage = options.itemsPerPage;
            this.currentPage = options.currentPage;
            this.totalItems = options.totalItems;
            this.url = options.url;
        },
        render: function() {
            _.each(['currentPage', 'itemsPerPage', 'totalItems'], function(field) {
                if (!this[field]) { throw Error(field + ' is not set') }
            }, this);

            var totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
              , previous = Math.max(this.currentPage - 1, 1)
              , next = Math.min(this.currentPage + 1, totalPages)
              , from = this.currentPage - 2
              , to = this.currentPage + 2
              , isFirst = this.currentPage <= 1
              , isLast = this.currentPage >= totalPages;

            if (totalPages <= 1) {
                return this
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

            this.$el.append(this.template({
                _class: isFirst ? 'disabled': '',
                url: this._url(previous),
                label: '&laquo;'
            }));

            for (var i = from; i <= to; i++) {
                this.$el.append(this.template({
                    _class: this.currentPage == i ? 'active': '',
                    url: this._url(i),
                    label: i
                }))
            }

            this.$el.append(this.template({
                _class: isLast ? 'disabled': '',
                url: this._url(next),
                label: '&raquo;'
            }));

            return this
        },
        _url: function(page) {
            if (!this.url) { throw Error('url is not set') }
            return this.url.replace(':page', page)
        }
    })
});