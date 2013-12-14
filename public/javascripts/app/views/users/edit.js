define(
['backbone', 'underscore', 'views/users/create', 'hbs!templates/users/edit', 'helpers/alert'],
function(Backbone, _, CreateView, template, Alert) {
    return CreateView.extend({
        template: template,

        navigate: function() {
            Alert.success('User was successfully updated');
            Backbone.history.navigate('list', { trigger: true })
        }
    })
});