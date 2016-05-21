'use strict';

/* POST Controllers */

angular.module('peckbox')
  .controller('PostsCtrl', ['$scope', '$http', '$auth', 'Auth', '$location', '$routeParams', 'toastr', function($scope, $http, $auth, Auth, $location, $routeParams, toastr) {
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

    // $scope.createPost = function() {
    //   $http.post('/api/posts', $scope.post)
    //     .success(function(response) {
    //       // $scope.user.posts.unshift(response);
    //       $scope.user.posts.unshift(response);
    //       $scope.post = {};
    //     })
    //     .error(function(response) {
    //       console.log(response);
    //     });
    // };
    $scope.test = function(post, color) {

        console.log(post);
        // overriding post model with color (String)
        if (color === "red") {
          post.color = "red";
        } else if (color === "blue"){
          post.color = "blue";
        } else {
          post.color = "default";
        }
        
        $http.put('/api/posts/'+ post._id, post)
        .success(function(response){
         console.log(response);
       });
    };

  

    $scope.createPost = function(user) {
     
        var config = {
            userId: user._id,
            title : $scope.post.title,
            body  : $scope.post.body,
            color:  $scope.post.color,
        };
        console.log(config);
        $http.post('/api/posts', config)
        .success(function(response){
            toastr.success('You have successfully created a task!');
            console.log('response', response);
             $scope.user.posts.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };

//go to edit page
  //   $scope.editPost = function(post) {
  //       $scope.post = {
  //           _id: post._id,
  //           title: post.title,
  //           body: post.body
  //       };
  //   $location.path('/posts/' + $scope.post._id);
  //   $scope.post = {
  //           _id: post._id,
  //           title: post.title,
  //           body: post.body
  //       };
  //   console.log('edit scope post', $scope.post);

  // };

    $scope.editPost = function(post){
        $scope.post = {
            userId: post.userId[0],
            _id: post._id,
            title: post.title,
            body: post.body
        };
        console.log('edit', $scope.post);
    };


    // $scope.updatePost = function(post) {
    //   console.log('post in form function is: ', post);
    //   Post.get({ id: $routeParams.id }, function() {
    //     console.log('post is: ', post);
    //     $scope.post = post;
    //     $scope.post.$update(function(post) {
    //       console.log('scope.post.update worked');
    //     });

    //     $location.path('/posts/' + post._id);
    //   });
    // };
    $scope.updatePost = function(post){
      console.log("Color: "+post.color)
       // console.log('update', post)
       $http.put('/api/posts/'+ post._id, post)
       .success(function(response){
         toastr.success('You have successfully updated a task!');
         console.log(response)
         post.editForm = false;
       });
       // console.log('edit', post);
     };

    // $scope.updatePost = function(post){
    //     $scope.post = {
    //         _id: post._id,
    //         title: post.title,
    //         body: post.body
    //     };
    //     $http.put('/api/posts/' + $scope.post._id)
    //     .success(function(data) {
    //       var index = $scope.user.posts.indexOf(post);
    //       $scope.user.posts.splice(index,1);

    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // };


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
          toastr.success('You have successfully deleted a task!');
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


