
var Validation = require('../../lib/validation')
  , validators = Validation.validators
  , UserCreateValidation = require('./create')
  , util = require('util');

function UserEditValidation() {
    return UserEditValidation.super_.apply(this, arguments)
}

util.inherits(UserEditValidation, UserCreateValidation);

UserEditValidation.prototype._password = function() {
    if (this.values.password) {
        UserEditValidation.super_.prototype._password.call(this)
    }
};

UserEditValidation.prototype._login = function() {
    this.add('login', validators.notEmpty, 'Login is required');
    this.add(
        'login',
        validators.noRecordExists('User', { login: this.values.login, _id: { $ne: this.values._id } }),
        'Such User has been already registered'
    )
};

module.exports = UserEditValidation;
