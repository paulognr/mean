'use strict';

angular.module('mean.companies').factory('Companies', ['$resource',
  function($resource) {
    return $resource('api/companies/:companyId', {
      companyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
