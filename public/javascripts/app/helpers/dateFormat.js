define(['handlebars'], function(Handlebars) {

    function leadingZero(number) {
        return ('0' + number).slice(-2)
    }

    function format(date) {
        date = new Date(date || Date.now());
        return date.getFullYear() + '-'
             + leadingZero(date.getMonth() + 1) + '-'
             + leadingZero(date.getDate()) + ' '
             + leadingZero(date.getHours()) + ':'
             + leadingZero(date.getMinutes()) + ':'
             + leadingZero(date.getSeconds())
    }

    Handlebars.registerHelper('dateFormat', format);
    return format
});