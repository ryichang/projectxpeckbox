'use strict';

/* COMMENT Controllers */

angular.module('peckbox')
  .controller('CommentsCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', function($scope, $http, $auth, Auth, toastr) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.comment = {};


    $scope.createComment = function(user) {
     
        var config = {
            userId: user._id,
            body  : $scope.comment.body
        };
        console.log(config);
        $http.post('/api/comments', config)
        .success(function(response){
            toastr.success('You have successfully created a comment!');
            console.log('response', response);
            $scope.user.comments.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };

    $scope.editComment = function(note){
        $scope.comment = {
            userId: comment.userId[0],
            _id: comment._id,
            body: comment.body
        };
        console.log('edit', $scope.comment);
    };

    $scope.updateComment = function(comment){
       console.log('update', comment)
       $http.put('/api/notes/'+ comment._id, comment)
       .success(function(response){
         toastr.warning('You have successfully edited a comment!');
         console.log(response)
         comment.editForm = false;
       });
     };

    $scope.deleteComment = function(note) {
      $http.delete('/api/comments/' + comment._id)
        .success(function(data) {
          toastr.error('You have successfully deleted a comment!');
          var index = $scope.user.comments.indexOf(comment);
          $scope.user.comments.splice(index,1);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

 
 }]);
