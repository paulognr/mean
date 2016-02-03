'use strict';

angular.module('mean.profiles').config(['$viewPathProvider', '$stateProvider',
  function($viewPathProvider, $stateProvider) {
    $viewPathProvider.override('users/views/login.html', 'profiles/views/login.html');
    $viewPathProvider.override('users/views/register.html', 'profiles/views/register.html');
  }
]);
