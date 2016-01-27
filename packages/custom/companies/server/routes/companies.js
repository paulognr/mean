'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Companies, app, auth, database) {

  var companies = require('../controllers/companies')(Companies);

  app.route('/api/companies')
      .get(companies.all)
      .post(companies.create);

  app.route('/api/companies/:companyId').get(auth.isMongoId, companies.show);

  app.param('companyId', companies.company);

  app.get('/companies', function(req, res, next) {
    Companies.render('index', {
      package: 'companies'
    }, function(err, html) {
      res.send(html);
    });
  });
};
