'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Company, app, auth, database) {

  app.get('/company', function(req, res, next) {
    Company.render('index', {
      package: 'company'
    }, function(err, html) {
      res.send(html);
    });
  });

  var companies = require('../controllers/company')(Company);

  app.route('/api/companies')
      .get(companies.all)
      .post(companies.create);

  app.route('/api/companies/:companyId').get(auth.isMongoId, companies.show);

  app.param('companyId', companies.company);
};
