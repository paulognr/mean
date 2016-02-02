(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.profiles')
    .controller('ProfilesController', ProfilesController);

  ProfilesController.$inject = ['$scope', 'Global', 'Profiles'];

  function ProfilesController($scope, Global, Profiles) {
    $scope.global = Global;
    $scope.package = {
      name: 'profiles'
    };
  }
})();