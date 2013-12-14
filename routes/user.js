
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , async = require('async')
  , CreateValidation = require('../forms/user/create')
  , EditValidation = require('../forms/user/edit');

module.exports.list = function(req, res, next) {
    var limit = req.param('limit') || 10
      , page = req.param('page') || 1;

    async.parallel({
        data: function(done) {
            User.find().skip((page - 1) * limit).limit(limit).exec(done)
        },
        totalItems: function(done) {
            User.count(done)
        }
    }, function(err, results) {
        if (err) { return next(err) }

        results.currentPage = page;
        results.itemsPerPage = limit;
        res.json(results)
    })
};

module.exports.show = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err) }
        res.json(user)
    })
};

module.exports.update = function(req, res, next) {
    async.waterfall([
        function(next) {
            (new EditValidation(req.body)).validate(next)
        },
        function(errors, next) {
            if (errors.length) {
                return res.json(400, errors)
            }
            User.findById(req.params.id, next)
        },
        function(user, next) {
            user.set(req.body).save(next)
        }
    ], function(err, user) {
        if (err) { return next(err) }
        res.json(user)
    })
};

module.exports.create = function(req, res, next) {
    async.waterfall([
        function(next) {
            (new CreateValidation(req.body)).validate(next)
        },
        function(errors, next) {
            if (errors.length) {
                return res.json(400, errors)
            }
            User.create(req.body, next)
        }
    ], function(err, user) {
        if (err) { return next(err) }
        res.json(user)
    })
};

module.exports.remove = function(req, res, next) {
    async.waterfall([
        function(done) {
            User.findById(req.params.id, done)
        },
        function(user, done) {
            user.remove(done)
        }
    ], function(err) {
        if (err) { return next(err) }
        res.json(true)
    })
};
