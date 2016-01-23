'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cnpj: {
        type: String,
        required: true,
        unique: true
    }
});

/**
 * Validations
 */
CompanySchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

CompanySchema.path('cnpj').validate(function(title) {
    return !!cnpj;
}, 'CNPJ cannot be blank');

CompanySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Company', CompanySchema);
