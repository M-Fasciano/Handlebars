'use strict';
var instance = false;


// loader function
function loader() {

  // object containig properties
  var options = {
    loaderHtml: '<div class="js-loader">Loading...</div>',
    activeClass: 'active',
    loaderClass: '.js-loader'
  }
  // toggleLoader function
    // $elem is the parameter
  function toggleLoader($elem) {
    // if the parameter has the class  active
    if($elem.hasClass(options.activeClass)) {
      // remove the element
      $(options.loaderClass, $elem).remove()
    }
    else {
      // show the element with the class active
      $elem.html(options.loaderHtml).addClass(options.activeClass);
    }
  }
  return {
    // returns the toggleLoader
    toggleLoader: toggleLoader
  };
}

module.exports = (instance ? instance : instance = loader());
