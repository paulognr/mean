'use strict';

angular.module('mean.static-pages').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('howitworks', {
      url: '/howitworks',
      templateUrl: 'static-pages/views/howitworks.html'
    });
  }
]);
