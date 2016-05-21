'use strict';

/* API Controllers */

angular.module('peckbox')
  .controller('ApisCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', function($scope, $http, $auth, Auth, toastr) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    $http.jsonp('http://ipinfo.io/?callback=JSON_CALLBACK').success(function(response){
        var lat = response.loc.split(",")[0];
        var lon = response.loc.split(",")[1];
        var query = "lat=" + lat + "&lon=" + lon;
        // $http.jsonp('')
        $scope.location = response
        console.log('ApisCtrl', $scope.location)

        var url = "http://api.openweathermap.org/data/2.5/";
    	var unit = "&units=imperial";
    	var key = "&appid=c55ec823be46f88fbcf55db70cc8e772";

    	

    });
}]);




  // var url = "http://api.openweathermap.org/data/2.5/";
  //   var unit = "&units=imperial";
  //   var key = "&appid=c55ec823be46f88fbcf55db70cc8e772";
  //   var cityName;
  //   $.getJSON('http://ipinfo.io', function(data) {

  //       var lat = data.loc.split(",")[0];
  //       var lon = data.loc.split(",")[1];
  //       var query = "lat=" + lat + "&lon=" + lon;
  //       $.get(url + "weather?" + query + unit + key, function(response){
  //           console.log(response)
  //       });
  //   });