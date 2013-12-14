define(['jquery'], function($) {
    return function(context) {
        $('[data-widget]', context).each(function() {
            var widget = this.getAttribute('data-widget');

            require(['widgets/' + widget], $.proxy(function(fn) {
                fn.call(this);
                this.removeAttribute('data-widget')
            }, this))
        })
    }
});