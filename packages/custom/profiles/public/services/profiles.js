'use strict';

angular.module('mean.profiles').factory('Profile', [ '$rootScope', '$http', '$location', '$stateParams', '$cookies', '$q', 'MeanUser',
  function($rootScope, $http, $location, $stateParams, $cookies, $q, MeanUser) {

    function escape(html) {
      return String(html)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
    }

    function b64_to_utf8( str ) {
      return decodeURIComponent(escape(window.atob( str )));
    }

    function ProfileKlass(){
      MeanUser.aclDefer = $q.defer();
      MeanUser.name = 'users';
      MeanUser.user = {};
      MeanUser.acl = MeanUser.aclDefer.promise;
      MeanUser.registerForm = false;
      MeanUser.loggedin = false;
      MeanUser.isAdmin = false;
      MeanUser.loginError = 0;
      MeanUser.usernameError = null;
      MeanUser.registerError = null;
      MeanUser.resetpassworderror = null;
      MeanUser.validationError = null;

      MeanUser.acl.then(function(response) {
        MeanUser.acl = response;
        delete MeanUser.aclDefer;
      });
    }

    ProfileKlass.prototype.onIdentity = function(response) {
      if (!response) {
        $http.get('/api/circles/mine').success(function(acl) {
          if(MeanUser.aclDefer) {
            MeanUser.aclDefer.resolve(acl);
          } else {
            MeanUser.acl = acl;
          }
        });
        return;
      }
      var encodedUser, user, destination;
      if (angular.isDefined(response.token)) {
        localStorage.setItem('JWT', response.token);
        encodedUser = decodeURI(b64_to_utf8(response.token.split('.')[1]));
        user = JSON.parse(encodedUser);
      }
      destination = angular.isDefined(response.redirect) ? response.redirect : destination;
      $cookies.remove('redirect');
      MeanUser.user = user || response;
      MeanUser.loggedin = true;
      MeanUser.loginError = 0;
      MeanUser.registerError = 0;
      MeanUser.isAdmin = MeanUser.user.roles.indexOf('admin') > -1;
      // Add circles info to user
      $http.get('/api/circles/mine').success(function(acl) {
        if(MeanUser.aclDefer) {
          MeanUser.aclDefer.resolve(acl);
        } else {
          MeanUser.acl = acl;
        }
        if (destination) {
          $location.path(destination);
        }

        $rootScope.$emit('loggedin');
      });
    };

    ProfileKlass.prototype.onIdFail = function (response) {
      $location.path(response.redirect);
      MeanUser.loginError = 'Authentication failed.';
      MeanUser.registerError = response;
      MeanUser.validationError = response.msg;
      MeanUser.resetpassworderror = response.msg;
      $rootScope.$emit('loginfailed');
      $rootScope.$emit('registerfailed');
    };

    ProfileKlass.prototype.register = function(user) {
      $http.post('/api/profiles/register', {
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            username: user.username,
            name: user.name,
            roles: [user.role]
          })
          .success(this.onIdentity.bind(MeanUser))
          .error(this.onIdFail.bind(MeanUser));
    };

    return new ProfileKlass();
  }
]);
