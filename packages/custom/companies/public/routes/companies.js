'use strict';

angular.module('mean.companies').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('companies', {
      url: '/companies/list',
      templateUrl: '/companies/views/list.html',
      requiredCircles : {
        circles: ['company']
      }
    }).state('all companies', {
      url: '/companies/list',
      templateUrl: '/companies/views/list.html',
      requiredCircles : {
        circles: ['authenticated'],
        denyState: 'auth.login'
      }
    }).state('create company', {
      url: '/companies/create',
      templateUrl: '/companies/views/create.html',
      requiredCircles : {
        circles: ['company']
      }
    }).state('company by id', {
      url: '/companies/:companyId',
      templateUrl: '/companies/views/view.html',
      requiredCircles : {
        circles: ['authenticated'],
        denyState: 'auth.login'
      }
    }).state('edit company', {
      url: '/companies/:companyId/edit',
      templateUrl: '/companies/views/edit.html',
      requiredCircles : {
        circles: ['company']
      }
    });
  }
]);
