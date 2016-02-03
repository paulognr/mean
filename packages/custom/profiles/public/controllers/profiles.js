(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.profiles')
    .controller('ProfilesController', ProfilesController);

  ProfilesController.$inject = ['$rootScope', 'Profile'];

  function ProfilesController($rootScope, Profile) {
      var vm = this;
      vm.user = {};

      vm.registerForm = Profile.registerForm = true;

      vm.input = {
          type: 'password',
          placeholder: 'Password',
          placeholderConfirmPass: 'Repeat Password',
          iconClassConfirmPass: '',
          tooltipText: 'Show password',
          tooltipTextConfirmPass: 'Show password'
      };

      vm.togglePasswordVisible = function() {
          vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
          vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
          vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
          vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };
      vm.togglePasswordConfirmVisible = function() {
          vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
          vm.input.placeholderConfirmPass = vm.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
          vm.input.iconClassConfirmPass = vm.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
          vm.input.tooltipTextConfirmPass = vm.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
      };

      vm.register = function() {
          Profile.register(this.user);
      };

      $rootScope.$on('registerfailed', function(){
          vm.registerError = Profile.registerError;
      });
  }
})();