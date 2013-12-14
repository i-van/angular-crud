define(['jquery', 'helpers/popup'], function($, popup) {
    return function() {
        var $el = $(this)
          , title = $el.data('title')
          , body = $el.data('body')
          , url = this.href;

        $el.on('click', function() {
            popup.confirm(title, body, function(value) {
                if (value) { window.location = url }
            });
            return false
        })
    }
});