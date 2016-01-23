'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Company) {

    return {
        company: function(req, res, next, id) {
            Company.load(id, function(err, company) {
                if (err) return next(err);
                if (!company) return next(new Error('Failed to load company ' + id));
                req.company = company;
                next();
            });
        },
        show: function(req, res) {

            Company.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.company.title,
                url: config.hostname + '/companies/' + req.company._id
            });

            res.json(req.company);
        },
        all: function(req, res) {
            var query = req.acl.query('Company');

            query.find({}).sort('-title').populate('user', 'name username').exec(function(err, companies) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the company'
                    });
                }

                res.json(companies)
            });

        }
    };
}