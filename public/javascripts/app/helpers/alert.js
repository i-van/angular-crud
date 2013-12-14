define(['jquery', 'hbs!templates/helpers/alert', 'bootstrap'], function($, template) {
    function render(message, type) {
        var html = template({ message: message, type: type });
        $(html).alert().appendTo('#alerts')
    }

    return {
        success: function(message) {
            render(message, 'success')
        },
        error: function(message) {
            render(message, 'danger')
        },
        info: function(message) {
            render(message, 'info')
        },
        warning: function(message) {
            render(message, 'warning')
        }
    }
});