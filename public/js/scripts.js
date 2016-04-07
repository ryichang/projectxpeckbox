$(document).ready(function(){

console.log("SANITY CHECK!!!!!!!");

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	$(".diagonal-bg svg line").attr("stroke-width",  ((5 + scroll/10)  + "%"));
	//30 is the starting width
	//alter the amount of growth by changing scroll/x
});

$('.text-1').children('p').each(function(index){
  var blinkInt=setInterval(function(){},1000);
});


});