
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto');

/**
 * schema
 *
 * @type {Schema}
 */
var schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    login: { type: String, index: { unique: true } },
    hashedPassword: String,
    salt: String,
    created: { type: Date, default: Date.now },
    updated: Date
});

/**
 * virtuals
 */
schema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

/**
 * pre-save hooks
 */
schema.pre('save', function(next) {
    this.updated = Date.now();
    this.increment();
    next()
});

/**
 * methods
 */
schema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} string
     * @return {Boolean}
     * @api public
     */
    authenticate: function(string) {
        return this.encryptPassword(string) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round(Date.now() * Math.random()) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

mongoose.model('User', schema);
