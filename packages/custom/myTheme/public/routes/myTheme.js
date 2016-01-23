'use strict';

angular.module('mean.myTheme').config(['$viewPathProvider', '$stateProvider',
  function($viewPathProvider, $stateProvider) {
    $viewPathProvider.override('system/views/index.html', 'myTheme/views/index.html');

    $stateProvider.state('user', {
      url: '/user',
      templateUrl: 'myTheme/views/user.html',
      requiredCircles : {
        circles: ['user']
      }
    })
  }
]);
