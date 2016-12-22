(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("js running");
  });

  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    itmes: 1
  });

})();
