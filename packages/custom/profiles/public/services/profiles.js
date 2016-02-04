'use strict';

angular.module('mean.profiles').factory('Profile', [ '$rootScope', '$http', '$location', '$stateParams', '$cookies', '$q',
  function($rootScope, $http, $location, $stateParams, $cookies, $q) {

    var self;

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
      this.aclDefer = $q.defer();
      this.name = 'users';
      this.user = {};
      this.acl = this.aclDefer.promise;
      this.registerForm = false;
      this.loggedin = false;
      this.isAdmin = false;
      this.loginError = 0;
      this.usernameError = null;
      this.registerError = null;
      this.resetpassworderror = null;
      this.validationError = null;
      self = this;

      this.acl.then(function(response) {
        self.acl = response;
        delete self.aclDefer;
      });
    }

    ProfileKlass.prototype.onIdentity = function(response) {
      var self = this;

      if (!response) {
        $http.get('/api/circles/mine').success(function(acl) {
          if(self.aclDefer) {
            self.aclDefer.resolve(acl);
          } else {
            self.acl = acl;
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
      this.user = user || response;
      this.loggedin = true;
      this.loginError = 0;
      this.registerError = 0;
      this.isAdmin = this.user.roles.indexOf('admin') > -1;
      // Add circles info to user
      $http.get('/api/circles/mine').success(function(acl) {
        if(self.aclDefer) {
          self.aclDefer.resolve(acl);
        } else {
          self.acl = acl;
        }
        if (destination) {
          $location.path(destination);
        }
        $rootScope.$emit('loggedin');
      });
    };

    ProfileKlass.prototype.onIdFail = function (response) {
      $location.path(response.redirect);
      this.loginError = 'Authentication failed.';
      this.registerError = response;
      this.validationError = response.msg;
      this.resetpassworderror = response.msg;
      $rootScope.$emit('loginfailed');
      $rootScope.$emit('registerfailed');
    };

    var Profile = new ProfileKlass();

    ProfileKlass.prototype.register = function(user) {
      $http.post('/api/profiles/register', {
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            username: user.username,
            name: user.name
          })
          .success(this.onIdentity.bind(this))
          .error(this.onIdFail.bind(this));
    };

    return Profile;
  }
]);
