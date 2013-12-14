define(
['backbone', 'models/user', 'collections/users', 'helpers/alert',
 'views/nav', 'views/users/list', 'views/users/create', 'views/users/edit'],
function(Backbone, User, Users, Alert, NavView, ListView, CreateView, EditView) {
    return Backbone.Router.extend({

        initialize: function() {
            var nav = new NavView();
            nav.render();
            this.on('route', nav.activateLink, nav);

            this.$content = Backbone.$('#content')
        },

        routes: {
            "": "home",
            "list(/:page)": "list",
            "create": "create",
            "edit/:id": "edit",
            "remove/:id": "remove"
        },

        home: function() {
            this.$content.html('<h1>Home Page</h1>')
        },

        list: function(page) {
            var users = new Users()
              , view = new ListView({ collection: users });

            users.fetch({
                data: { page: page || 1 },
                success: _.bind(function() {
                    this.$content.html(view.render().el)
                }, this)
            })
        },

        create: function() {
            var user = new User()
              , view = new CreateView({ model: user });

            this.$content.html(view.render().el)
        },

        edit: function(id) {
            var user = new User({ _id: id })
              , view = new EditView({ model: user });

            user.fetch({
                success: _.bind(function() {
                    this.$content.html(view.render().el)
                }, this)
            })
        },

        remove: function(id) {
            var user = new User({ _id: id });

            user.destroy({
                success: _.bind(function() {
                    Alert.success('User was successfully removed');
                    this.navigate('list', { trigger: true })
                }, this)
            })
        }
    })
});