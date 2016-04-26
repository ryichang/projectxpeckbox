
'use strict';

/* Services */

angular.module('peckbox.services', [])

  .factory('Auth', ['$auth', function ($auth) {
    return {
      currentUser: function() {
        var user = $auth.getPayload();
        if(user){
        var currentUser = {
          _id: user.sub,
          email: user.email,
          picture: user.picture,
          displayName: user.displayName
          };
        }
        return currentUser;
      }
    };
  }]);