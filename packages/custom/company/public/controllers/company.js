'use strict';

/* jshint -W098 */
angular.module('mean.company').controller('CompanyController', ['$scope', 'Global', 'Company',
  function($scope, Global, Company) {
    $scope.global = Global;

    $scope.find = function() {
      Company.query(function(companies) {
        $scope.companies = companies;
      });
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.article.permissions.push('test test');
        var company = new Company($scope.company);

        company.$save(function(response) {
          $location.path('companies/' + response._id);
        });

        $scope.company = {};

      } else {
        $scope.submitted = true;
      }
    };
  }
]);
