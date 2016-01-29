'use strict';

/* jshint -W098 */
angular.module('mean.companies').controller('CompaniesController', ['$scope', '$stateParams', '$location', 'Global', 'Companies',
  function($scope, $stateParams, $location, Global, Companies) {
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

      $scope.update = function(isValid) {
          if (isValid) {
              var company = $scope.company;

              company.$update(function() {
                  $location.path('companies/' + company._id);
              });
          } else {
              $scope.submitted = true;
          }
      };

      $scope.findOne = function() {
          Companies.get({
              companyId: $stateParams.companyId
          }, function(company) {
              $scope.company = company;
          });
      };

    $scope.remove = function(company) {
      if (company) {
        company.$remove(function(response) {
          for (var i in $scope.companies) {
            if ($scope.companies[i] === company) {
              $scope.companies.splice(i, 1);
            }
          }
          $location.path('companies/list');
        });
      } else {
        $scope.company.$remove(function(response) {
          $location.path('companies/list');
        });
      }
    };
  }
]);
