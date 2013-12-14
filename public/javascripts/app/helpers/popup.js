define(
['jquery', 'hbs!templates/helpers/popup-alert', 'hbs!templates/helpers/popup-confirm', 'bootstrap'],
function($, alertTemplate, confirmTemplate) {

    $.fn.modal.Constructor.prototype.remove = function() {
        this.removeBackdrop();
        this.$element.remove();
        this.$element = null
    };

    function modal(html) {
        return $(html).modal('show')
            .on('hidden.bs.modal', function() {
                $(this).data('bs.modal').remove()
            })
    }

    return {
        alert: function(title, body) {
            var html = alertTemplate({ title: title, body: body });
            return modal(html)
        },
        confirm: function(title, body, fn) {
            var html = confirmTemplate({ title: title, body: body })
              , $el = modal(html);

            return $el.on('click', '.modal-footer button', function() {
                var value = !!$(this).data('value');
                $el.data('bs.modal').hide();
                fn(value)
            })
        }
    }
});