'use strict';

/* Group Controller */

angular.module('peckbox')
  .controller('GroupsCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', '$location', function($scope, $http, $auth, Auth, toastr, $location) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.group = {};

    $scope.test = function(group, color) {

        // console.log(event);
        // overriding event model with color (String)
        if (color === "red") {
          group.color = "red";
        } else if (color === "blue"){
          group.color = "blue";
        } else if (color === "yellow"){
          group.color = "yellow";
        } else {
          group.color = "default";
        }
        
        $http.put('/api/groups/'+ group._id, group)
        .success(function(response){
         // console.log(response);
       });
    };

    $scope.tabs = [{
                title: 'Comment',
                url: 'comment.tpl.html'
            },{
                title: 'Event',
                url: 'event.tpl.html'
        }];

        $scope.currentTab = 'event.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        };
        
        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        };

    $scope.createGroup = function(user) {
     
        var body = {
            title : $scope.group.title,
            description  : $scope.group.description,
            date : $scope.group.date,
            owner: user._id,
            users: user._id,
            userId: user._id,
            color: $scope.group.color,
        };
        console.log("front is", body);
        $http.post('/api/groups', body)
        .success(function(response){
            toastr.success('You have successfully created a group!');
            console.log('response', response);
             $scope.user.groups.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };

    $scope.editGroup = function(group){
        $scope.group = {
            title : $scope.group.title,
            description  : $scope.group.description,
            date : $scope.group.date,
            color: $scope.group.color,
            userId: user._id,
        };
        console.log('edit', $scope.group);
    };

    $scope.updateGroup = function(group){
       console.log('update', group)
       $http.put('/api/groups/'+ group._id, group)
       .success(function(response){
         toastr.warning('You have successfully updated a group!');
         console.log(response)
         group.editForm = false;
       });
       // console.log('edit', event);
     };

   // $scope.createEvent = function() {
   //    console.log('scope.event is ', $scope.event);
   //    $scope.event.owner = $scope.currentUser;
   //    var event = new Event($scope.event);
   //    event.$save(function(data) {
   //      $scope.events.unshift(data);
   //      $scope.event = {};
   //      console.log('after save createEventForm is: ', $scope.createEvent);
   //    });
   // };

    $scope.deleteGroup = function(group) {
      $http.delete('/api/groups/' + group._id)
        .success(function(data) {
          toastr.error('You have successfully deleted a group!');
          var index = $scope.user.groups.indexOf(group);
          $scope.user.groups.splice(index,1);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.groupShow = function(group) {
      $location.path('/groups/' + group._id + '/comments');
    
    };



  }])

  .controller('GroupShowCtrl', ['$scope', '$http', '$auth', 'Auth', '$location', '$routeParams', 'toastr', 'Group', '$window','$q', function($scope, $http, $auth, Auth, $location, $routeParams, toastr, Group, $window, $q) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;

    });

    //go back button
      $scope.backButton = function() {
         $window.history.back();
      };

    Group.get({ id: $routeParams.id }, function(group) {
      $scope.group = group;
      $scope.comment = group.comments;
      console.log('outside', group);
    });

    $scope.test = function(group, color) {

        console.log(group);
        // overriding group model with color (String)
        if (color === "red") {
          group.color = "red";
        } else if (color === "blue"){
          group.color = "blue";
        } else if (color === "yellow"){
          group.color = "yellow";
        } else {
          group.color = "default";
        }
        
        $http.put('/api/groups/'+ group._id, group)
        .success(function(response){
         console.log(response);
       });
    };

    $scope.joinGroup = function(group, user){
      console.log('group is', group)
      console.log('user is', user)


      var body = {
        users: user._id,
        groups: group._id,
        owner: group.owner,
      }
      console.log('body is', body)

      $http.post('/api/groups/' + group._id, body)
      .success(function(response){
        toastr.success('You have successfully created a group!');
            console.log('response', response);
             $scope.user.groups.unshift(response);
      })
      .error(function(response){
            console.log('err', response);
        });
    };

    

    $scope.editGroup = function(group){
        $scope.group = {
            userId: group.userId[0],
            _id: group._id,
            title: group.title,
            description: group.description
        };
        console.log('edit', $scope.post);
    };

    $scope.updateGroup = function(group){
      console.log("Color: "+group.color)
       $http.put('/api/groups/'+ group._id, group)
       .success(function(response){
         toastr.warning('You have successfully updated a group!');
         console.log(response)
         group.editForm = false;
       });
       // console.log('edit', group);
     };

     $scope.createComment = function(group, user){
       var config = {
         body: $scope.comment.body,
         userId: user._id,
         group: group._id
       };

       console.log('config', config)
       $http.post('/api/group/' + group._id + '/comments', config)
       .success(function(response){
         toastr.success('You have successfully created a comment!');
         console.log('response is', response)
         $scope.group.comments.unshift(response);
         console.log('group comment is', group.comments)
       })
       .error(function(response){
         console.log('err', response)
       });
     };

     $scope.deleteComment = function(comment) {
       $http.delete('/api/groups/' + comment.group + '/comments/' + comment._id)
         .success(function(data) {
           toastr.error('You have successfully deleted a comment!');
           var index = $scope.group.comments.indexOf(comment);
           $scope.group.comments.splice(index,1);

         })
         .error(function(data) {
           console.log('Error: ' + data);
         });
     };

     $scope.updateComment = function(comment) {
      $http.put('/api/groups/' + comment.group + '/comments/' + comment._id)
      .success(function(response){
        toastr.warning('You have successfully updated a comment!');
        console.log(response);
        comment.editForm = false;
      });
     };

     $scope.commentColor = function(comment, color) {

         console.log(comment);
         // overriding post model with color (String)
         if (color === "red") {
           comment.color = "red";
         } else if (color === "blue"){
           comment.color = "blue";
         } else if (color === "yellow"){
           comment.color = "yellow";
         } else {
           comment.color = "default";
         }
         
         $http.put('/api/groups/'+ comment.group + '/comments/' + comment._id, comment)
         .success(function(response){
          console.log(response);
        });
     };

  }]);
