$(document).ready(function(){

	$(function(){
      $("#header").load("header.html"); 
    });

    $('#pl-nav-resp .item').on('click',function () {
      $('#pl-nav-resp .item').not(this).removeClass('active');
      $(this).addClass('active');
      var index = $(this).index(),
      newTarget = $('.playlist-content .row').eq(index).slideDown();
      $('.playlist-content .row').not(newTarget).slideUp();
    });

});