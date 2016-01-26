'use strict';

angular.module('mean.company').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('company', {
      url: '/company',
      templateUrl: '/company/views/index.html',
      requiredCircles : {
        circles: ['company']
      }
    }).state('all companies', {
      url: '/companies',
      templateUrl: '/company/views/list.html',
      requiredCircles : {
        circles: ['authenticated'],
        denyState: 'auth.login'
      }
    }).state('create company', {
      url: '/companies/create',
      templateUrl: '/company/views/create.html',
      requiredCircles : {
        circles: ['company']
      }
    }).state('company by id', {
      url: '/companies/:companyId',
      templateUrl: '/company/views/view.html',
      requiredCircles : {
        circles: ['authenticated'],
        denyState: 'auth.login'
      }
    });
  }
]);
