'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MyTheme = new Module('myTheme');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MyTheme.register(function(app, auth, database, system) {

  //We enable routing. By default the Package Object is passed to the routes
  MyTheme.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  MyTheme.menus.add({
    title: 'Admin',
    link: 'Admin',
    roles: ['admin'],
    menu: 'myMain'
  });

  MyTheme.menus.add({
    title: 'Company',
    link: 'Company',
    roles: ['company'],
    menu: 'myMain'
  });

  MyTheme.menus.add({
    title: 'User',
    link: 'User',
    roles: ['user'],
    menu: 'myMain'
  });

  MyTheme.menus.add({
    title: 'Anonymous',
    link: 'Anonymous',
    roles: ['anonymous'],
    menu: 'myMain'
  });

  MyTheme.menus.add({
    title: 'Authenticated',
    link: 'Authenticated',
    roles: ['authenticated'],
    menu: 'myMain'
  });

  app.set('views', __dirname + '/server/views');
  
  MyTheme.aggregateAsset('css', 'myTheme.css');
  MyTheme.angularDependencies(['mean.system']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    MyTheme.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    MyTheme.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    MyTheme.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return MyTheme;
});
