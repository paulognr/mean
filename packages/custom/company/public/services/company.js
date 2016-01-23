'use strict';

angular.module('mean.company').factory('Company', ['$resource',
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
