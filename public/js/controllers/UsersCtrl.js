'use strict';

/* USERS Controllers */

angular.module('peckbox')
  .controller('UsersCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    
    

    // $scope.createPost = function() {
    //     $http.post('/api/posts', $scope.post)
    //         .success(function(response) {
    //             $scope.user.posts.unshift(response);
    //             $scope.post = {};
    //         })
    //         .error(function(response) {
    //             console.log(response);
    //         });
    // };

    // // DELETE A POST
    // $scope.deletePost = function() {
    //     $http.delete('/api/posts/' + post._id)
    //           .success(function(){
    //             var index = $scope.posts.indexOf()
    //             $scope.posts.splice(index, 1);          
    //           })
    //           .error(function() {

    //           });
    // };
   

  }]);