'use strict';

/* API Controllers */

angular.module('peckbox')
  .controller('ApisCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', function($scope, $http, $auth, Auth, toastr) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    // $http.jsonp('http://ipinfo.io/?callback=JSON_CALLBACK').success(function(response){
    //     var lat = response.loc.split(",")[0];
    //     var lon = response.loc.split(",")[1];
    //     var query = "lat=" + lat + "&lon=" + lon;
    //     // $http.jsonp('')
    //     $scope.location = response
    //     console.log('ApisCtrl', $scope.location)

    //     var url = "http://api.openweathermap.org/data/2.5/";
    // 	var unit = "&units=imperial";
    // 	var key = "&appid=c55ec823be46f88fbcf55db70cc8e772";

    	

    // });

  //   $http.jsonp('http://ipinfo.io/?callback=JSON_CALLBACK').success(function(data){
  //   var lat = data.loc.split(",")[0];
  //   var lon = data.loc.split(",")[1];
  //   var query = "lat=" + lat + "&lon=" + lon;
  //   var url = "http://api.openweathermap.org/data/2.5/";
  //   var unit = "&units=imperial";
  //   var key = "&appid=c55ec823be46f88fbcf55db70cc8e772";
  //    $http.jsonp(url+ "weather?" + query + unit + key + "&callback=JSON_CALLBACK").success(function(response){
  //     $scope.weather = response;
  //     console.log('ApiCtrl', $scope.weather);
  //    });
  // });
  // $http({
  //         method: 'jsonp',
  //         url: 'https://api.nytimes.com/svc/topstories/v1/home.json?api-key=b9ccbfb3e60d48ce9c81dcc40406ab84&callback=JSON_CALLBACK',
  //         responseType: 'json',
  //         data: ''})
  //     .success(function(err, response, body) {
  //       console.log(response);
  //     });

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;    
        var query = "lat=" + lat + "&lon=" + lon;
        var url = "http://api.openweathermap.org/data/2.5/";
        var unit = "&units=imperial";
        var key = "&appid=c55ec823be46f88fbcf55db70cc8e772";
        $http.jsonp(url+ "weather?" + query + unit + key + "&callback=JSON_CALLBACK").success(function(response){
          $scope.weather = response;
          console.log('ApiCtrl', $scope.weather)
        });
      });
    });
  }

  // Clock
var clock=document.getElementsByTagName('time')[0];
var hLabels=['twelve','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
var mLabels=['','five','ten','quarter','twenty','twenty-five','half'];
function itsaclock(){
    var d = new Date(), h = d.getHours(), m=d.getMinutes();
    var hour = ' '+(m>32 ? hLabels[(h%12) + 1] : hLabels[h%12]) + (m%58<3? ' o\'clock':'');
    var min  = m===0?'':' '+(m<33 ? mLabels[Math.round(m/5)] : mLabels[6-Math.round((m-30)/5)]);
    var approx = m%5===0?'':m%5>2?' nearly':' just after' ; 
    var topast = m%58<3 ? '' : m%60>32? ' to':' past';
    clock.innerHTML= 'It\'s' + approx + min + topast + hour;
    // clock.innerHTML='&#10077'+'It\'s' + approx + min + topast + hour +'&#10078';
    setTimeout(itsaclock, 1000);
}
setTimeout(itsaclock, 2000);



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
