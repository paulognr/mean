'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Profiles = new Module('profiles');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Profiles.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Profiles.routes(app, auth, database);

  Profiles.aggregateAsset('css', 'profiles.css');
    Profiles.angularDependencies(['mean.users']);

  return Profiles;
});
