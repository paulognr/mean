'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var StaticPages = new Module('static-pages');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
StaticPages.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  StaticPages.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  StaticPages.menus.add({
    title: 'Como funciona',
    link: 'howitworks',
    roles: ['anonymous', 'authenticated'],
    menu: 'myMain'
  });
  
  StaticPages.aggregateAsset('css', 'staticPages.css');

  return StaticPages;
});
