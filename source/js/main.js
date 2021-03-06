
'use strict';

// Libraries.

// var $ = require('jquery');
// var isotope = require('isotope');
// var imagesLoaded = require('imagesLoaded');


(function() {

  // document.addEventListener('DOMContentLoaded', function() {
  //   console.log("js running");
  // });


  var $grid = $('.grid').isotope({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      // use element for option
      columnWidth: '.grid-sizer'
    }
  });

  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function() {
    $grid.isotope('layout');
  });

})();
