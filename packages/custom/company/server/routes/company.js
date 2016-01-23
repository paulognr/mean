'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Company, app, auth, database) {

  app.get('/api/company/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/company/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/company/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/company/example/render', function(req, res, next) {
    Company.render('index', {
      package: 'company'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
