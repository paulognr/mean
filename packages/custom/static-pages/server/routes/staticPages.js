'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(StaticPages, app, auth, database) {

  app.get('/api/staticPages/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/staticPages/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/staticPages/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/staticPages/example/render', function(req, res, next) {
    StaticPages.render('index', {
      package: 'static-pages'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
