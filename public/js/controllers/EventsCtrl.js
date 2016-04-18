'use strict';

/* Event Controller */

angular.module('peckbox')
  .controller('EventsCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.event = {};



    $scope.createEvent = function(user) {
     
        var config = {
            title : $scope.event.title,
            description  : $scope.event.description,
            location : $scope.event.location,
            date : $scope.event.date,
            userId: user._id,
        };
        console.log("front is", config);
        $http.post('/api/events', config)
        .success(function(response){
            console.log('response', response);
             $scope.user.events.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };



    $scope.deleteEvent = function(event) {
      $http.delete('/api/events/' + event._id)
        .success(function(data) {
          var index = $scope.user.events.indexOf(event);
          $scope.user.events.splice(index,1);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };


  }]);


