'use strict';

/* POST Controllers */

angular.module('peckbox')
  .controller('PostsCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.formData = {};

    $http.get('/api/posts')
      .success(function(data) {
        $scope.posts = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });


    $scope.createPost = function() {
      $http.post('/api/posts', $scope.formData)
        .success(function(data) {
          $scope.formData = {}; 
          $scope.posts = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

 
    $scope.deletePost = function(id) {
      $http.delete('/api/posts/' + id)
        .success(function(data) {
          $scope.posts = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
   

  }]);


