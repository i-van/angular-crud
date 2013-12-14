
var async = require('async');

function Validation(values) {
    this.values = values;
    this.validators = [];
    this.initialize();
}

Validation.prototype.initialize = function() {};

Validation.prototype.add = function(field, validator, message) {
    this.validators.push({
        field: field,
        validator: validator,
        message: message || field + ' is invalid'
    });

    return this;
};

Validation.prototype.validate = function(done) {
    var _this = this
      , errors = [];

    async.eachSeries(this.validators, _process, function(err) {
        if (err) {
            return done(err);
        }
        done(null, errors);
    });

    function _process(item, done) {
        var validator = item.validator
          , values = _this.values
          , value = values[item.field];

        if (1 === validator.length || 2 === validator.length) {
            _validate(validator(value, values), item);
            done();
        } else if (3 === validator.length) {
            validator(value, values, function(err, test) {
                if (err) {
                    return done(err);
                }
                _validate(test, item);
                done();
            });
        } else {
            throw new Error('Invalid validator');
        }
    }

    function _validate(test, item) {
        if (!test) {
            errors.push({ field: item.field, message: item.message });
        }
    }
};

module.exports = Validation;
module.exports.validators = require('./validators');
