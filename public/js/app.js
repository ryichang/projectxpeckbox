'use strict';

// Declare app level module which depends on filters, and services
angular.module('peckbox', ['peckbox.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'google.places',
                              '720kb.datepicker'
                              ])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'ProfileCtrl'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'PostsCtrl'
      });

      $routeProvider.when('/posts', {
        templateUrl: 'templates/post',
        controller: 'PostsCtrl'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'EventsCtrl'
      });

      $routeProvider.when('/events', {
        templateUrl: 'templates/event',
        controller: 'EventsCtrl'
      });


      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }])

 
     .config(function($authProvider, $windowProvider) {
      var $window = $windowProvider.$get();
      if ($window.location.host == 'localhost:1337') {
        console.log('development app');
        $authProvider.facebook({        
          clientId: '1603892236604415',
        });
      } else {
        console.log('production app');
        $authProvider.facebook({        
          clientId: '1603892236604415',
        });
      }
    
    });
