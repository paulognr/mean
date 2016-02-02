(function () {
  'use strict';

  angular
    .module('mean.profiles')
    .factory(Profiles);

  Profiles.$inject = [];

  function Profiles() {
    return {
      name: 'profiles'
    };
  }
})();
