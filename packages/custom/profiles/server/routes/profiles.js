(function () {
  'use strict';
  var config = require('meanio').loadConfig();

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (Profiles, app, auth, database) {

      var profiles = require('../controllers/profiles')(Profiles);

      if(config.strategies.local.enabled){
          app.route('/api/profiles/register').post(profiles.create);
      }
  };
})();
