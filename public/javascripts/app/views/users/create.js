define(
['backbone', 'underscore', 'hbs!templates/users/create', 'helpers/alert'],
function(Backbone, _, template, Alert) {
    return Backbone.View.extend({
        template: template,
        events: {
            "submit form": "save"
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this
        },

        renderErrors: function(model, xhr) {
            if (xhr.status !== 400) { return }
            var errors = xhr.responseJSON;

            this.$('.help-block').remove();
            this.$('.has-error').removeClass('has-error');
            _.each(errors, function(error) {
                var input = $('[name="' + error.field + '"]');
                input.parents('.form-group').addClass('has-error');
                Backbone.$('<span>', { "class": "help-block", text: error.message })
                    .appendTo(input.parent())
            })
        },

        save: function(event) {
            var form = this.$(event.target)
              , attributes = {};

            _.each(form.serializeArray(), function(item) {
                attributes[item.name] = item.value
            });

            this.model.save(attributes, {
                success: this.navigate,
                error: _.bind(this.renderErrors, this)
            });

            return false
        },

        navigate: function() {
            Alert.success('User was successfully saved');
            Backbone.history.navigate('list', { trigger: true })
        }
    })
});