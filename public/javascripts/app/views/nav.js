define(['backbone', 'hbs!templates/nav'], function(Backbone, template) {
    return Backbone.View.extend({
        el: '#nav',
        template: template,
        render: function() {
            this.$el.html(this.template([
                { href: '#', route: 'home', label: 'Home' },
                { href: '#list', route: 'list', label: 'List of users' },
                { href: '#create', route: 'create', label: 'Create user' }
            ]));
            return this
        },
        activateLink: function(route) {
            var links = this.$('.nav a')
              , target = this.$('.nav a[data-route="' + route + '"]');

            links.parent().removeClass('active');
            target.parent().addClass('active');
        }
    })
});