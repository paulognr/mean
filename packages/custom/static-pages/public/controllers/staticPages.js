'use strict';

/* jshint -W098 */
angular.module('mean.static-pages').controller('StaticPagesController', ['$scope', 'Global', 'StaticPages',
  function($scope, Global, StaticPages) {
    $scope.global = Global;
    $scope.package = {
      name: 'static-pages'
    };
  }
]);
