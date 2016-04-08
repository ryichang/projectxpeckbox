'use strict';

/* POST Controllers */

angular.module('peckbox')
  .controller('PostsCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.post = {};

    // $http.get('/api/posts')
    //   .success(function(data) {
    //     $scope.posts = data;
    //   })
    //   .error(function(data) {
    //     console.log('Error: ' + data);
    //   });

    $scope.createPost = function() {
      $http.post('/api/posts', $scope.post)
        .success(function(response) {
          $scope.user.posts.unshift(response);
          $scope.post = {};
        })
        .error(function(response) {
          console.log(response);
        });
    };


    // $scope.createPost = function() {
    //   $http.post('/api/posts', $scope.formData)
    //     .success(function(data) {
    //       $scope.formData = {}; 
    //       $scope.posts = data;
    //       console.log(data);
    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // };

 
    // $scope.deletePost = function(post) {
    //   $http.delete('/api/posts/' + post._id)
    //     .success(function(data) {
    //       $scope.posts = {};
    //       var index = $scope.posts.indexOf(post)
    //       $scope.posts.splice(index, 1);
    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // };

    $scope.deletePost = function(post) {
      $http.delete('/api/posts/' + post._id)
        .success(function(data) {
          var index = $scope.user.posts.indexOf(post);
          $scope.user.posts.splice(index,1);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // $scope.start = function() {
    //   if ($scope.class === "start")
    //       $scope.class = "none";
    //    else
    //       $scope.class = "start";
    // } ;   

    // $scope.done = function() {
    //   if($scope.class === "done")
    //      $scope.class = "none";
    //    else 
    //      $scope.class = "done";
    // };

        // $scope.class = "none";
        
        // $scope.start = function(){
        //     if ($scope.class === "start")
        //         $scope.class = "none";
        //      else
        //         $scope.class = "start";
        // };
        
        // $scope.done = function(){
        //     if ($scope.class === "done")
        //         $scope.class = "none";
        //      else
        //         $scope.class = "done";
        // };

  }]);


