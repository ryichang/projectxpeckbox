'use strict';

/* API Controllers */

angular.module('peckbox')
  .controller('ApisCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', function($scope, $http, $auth, Auth, toastr) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

   
    $scope.myTickerItems = [
   {
     title: 'item 1 item 1 item 1 item 1 item 1 item 1 item 1',
     copy: 'amazing copy here'
   },
   {
     title: 'item 2',
     copy: 'wow, this is great'
   },
   {
     title: 'item 3',
     copy: 'hello angular'
   }
]
  $scope.news={}

var api = 'http://api.nytimes.com/svc/news/v3/content/all/all.jsonp?api-key=ccb58d5412a54799e82ad086c0387669:5:74719242&responce-format=.jsonp&callback=JSON_CALLBACK'; 
                $http.jsonp(api).success(function(data){
                    // console.log('response', data)
                    $scope.news = data.results;
                    console.log("news is", $scope.news);
                });

 // $http.jsonp(url)
 //  $http({
 //          method: 'jsonp',
 //          url: 'https://api.nytimes.com/svc/topstories/v2/home.jsonp/?api-key=e4cbd64f281e46f882876736e874cff6&callback=homeTopStoriesCallback',
 //          })
 //      .success(function(err, response) {
 //        console.log(response);
 //      });

//  var url ="https://www.reddit.com/r/aww/.json"
//  $http.jsonp(url + '?jsoncallback=JSON_CALLBACK').success(function(data) {
//      console.log(data);
// })

 

//  var url ="http://api.nytimes.com/svc/topstories/v2/reviews/home.jsonp?&offset=20&order=updated_date&api-key=e4cbd64f281e46f882876736e874cff6&responce-format=jsonp"
//  $http.jsonp(url + '&callback=JSON_CALLBACK').success(function(data) {
//      console.log(data);
// })

 // var api = 'http://api.nytimes.com/svc/topstories/v2/reviews/home.jsonp?&offset=20&order=updated_date&api-key=e4cbd64f281e46f882876736e874cff6&responce-format=jsonp&callback=homeTopStoriesCallback'; 
 //                $http.jsonp(api).success(function(data){
 //                    console.log('response', data)
 //                    $scope.results = data.results;
 //                });
// var api = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty&callback=JSON_CALLBACK'; 
//                 $http.jsonp(api).success(function(data){
//                     console.log('response', data)
//                     $scope.results = data.results;
//                 });

// var api = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&callback=JSON_CALLBACK'; 
//                 $http.jsonp(api).success(function(data){
//                     console.log('response', data)
//                     $scope.results = data.results;
//                 });

 // google.load("feeds", "1");

 //    function initialize() {
 //      var feed = new google.feeds.Feed("http://fastpshb.appspot.com/feed/1/fastpshb");
 //      feed.load(function(result) {
 //        if (!result.error) {
 //          var container = document.getElementById("feed");
 //          for (var i = 0; i < result.feed.entries.length; i++) {
 //            var entry = result.feed.entries[i];
 //            var div = document.createElement("div");
 //            div.appendChild(document.createTextNode(entry.title));
 //            container.appendChild(div);
 //          }
 //        }
 //      });
 //    }
 //    google.setOnLoadCallback(initialize);

  

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


