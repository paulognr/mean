'use strict';

angular.module('mean.myTheme').factory('MyTheme', [
  function() {
    return {
      name: 'myTheme'
    };
  }
]);

'use strict';

angular.module('mean.myTheme').factory('Menus', ['$resource',
  function($resource) {
    return $resource('api/hunter/menu/:name', {
      name: '@name',
      defaultMenu: '@defaultMenu'
    });
  }
]);

