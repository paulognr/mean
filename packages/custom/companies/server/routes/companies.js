'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Companies, app, auth, database) {

  var companies = require('../controllers/companies')(Companies);

  app.route('/api/companies')
      .get(companies.all)
      .post(auth.requiresLogin, companies.create);

  app.route('/api/companies/:companyId')
      .get(auth.isMongoId, companies.show)
      .put(auth.isMongoId, auth.requiresLogin, companies.update)
      .delete(auth.isMongoId, auth.requiresLogin, companies.destroy);

  app.param('companyId', companies.company);
};
