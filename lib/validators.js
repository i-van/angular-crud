
module.exports.isEmail = function(value) {
    return value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)
};

module.exports.notEmpty = function(value) {
    return !!value
};

module.exports.equal = function(_value) {
    return function(value) {
        return _value == value
    }
};

module.exports.equalField = function(field) {
    return function(value, values) {
        return values[field] == value
    }
};

module.exports.len = function(min, max) {
    return function(value) {
        return value.length >= min && (max === undefined || value.length <= max)
    }
};

module.exports.noRecordExists = function(modelName, query) {
    return function(value, values, done) {
        var mongoose = require('mongoose')
          , Model = mongoose.model(modelName);

        Model.findOne(query, function(err, entity) {
            if (err) { return done(err) }
            done(null, !entity)
        })
    }
};
