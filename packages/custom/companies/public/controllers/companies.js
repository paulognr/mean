'use strict';

/* jshint -W098 */
angular.module('mean.companies').controller('CompaniesController', ['$scope', '$location', 'Global', 'Companies',
  function($scope, $location, Global, Companies) {
    $scope.global = Global;

    $scope.find = function() {
      Companies.query(function(companies) {
        $scope.companies = companies;
      });
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.article.permissions.push('test test');
        var company = new Companies($scope.company);

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
