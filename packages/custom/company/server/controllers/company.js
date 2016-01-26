'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function() {

    return {
        company: function(req, res, next, id) {
            Company.load(id, function(err, company) {
                if (err) return next(err);
                if (!company) return next(new Error('Failed to load company ' + id));
                req.company = company;
                next();
            });
        },
        create: function(req, res) {
            var company = new Company(req.body);

            company.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the company'
                    });
                }
                res.json(company);
            });
        },
        show: function(req, res) {
            res.json(req.company);
        },
        all: function(req, res) {
            var query = req.acl.query('Company');

            query.find().exec(function(err, companies) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the company'
                    });
                }

                console.log(companies);
                res.json(companies)
            });

        }
    };
}