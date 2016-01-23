'use strict';

angular.module('mean.company').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('company', {
      url: '/company',
      templateUrl: 'company/views/index.html',
      requiredCircles : {
        circles: ['company']
      }
    });
  }
]);
