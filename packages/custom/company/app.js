'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Company = new Module('company');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Company.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Company.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Company.menus.add({
    title: 'Company',
    link: 'company',
    roles: ['company'],
    menu: 'myMain'
  });
  
  Company.aggregateAsset('css', 'company.css');

  return Company;
});
