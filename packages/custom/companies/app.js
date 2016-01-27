'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Companies = new Module('companies');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Companies.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Companies.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Companies.menus.add({
    title: 'Companies',
    link: 'companies',
    roles: ['company'],
    menu: 'myMain'
  });
  
  Companies.aggregateAsset('css', 'companies.css');

  return Companies;
});
