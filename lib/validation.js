
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

    return this
};

Validation.prototype.validate = function(done) {
    var count = this.validators.length
      , errors = [];

    if (!count) {
        throw new Error('No validators')
    }

    function validate(test, field, message) {
        if (!test) {
            errors.push({ field: field, message: message })
        }
        if (--count === 0) {
            done(null, errors)
        }
    }

    this.validators.forEach(function(item) {
        var value = this.values[item.field]
          , validator = item.validator;

        if (3 === validator.length) {
            validator(value, this.values, function(err, test) {
                if (err) {
                    return done(err)
                }
                validate(test, item.field, item.message)
            })
        } else if (1 === validator.length || 2 === validator.length) {
            validate(validator(value, this.values), item.field, item.message)
        } else {
            throw new Error('Invalid validator')
        }
    }, this)
};

module.exports = Validation;
module.exports.validators = require('./validators');
