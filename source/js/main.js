(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("js running");

    var toggles = document.querySelectorAll(".c-hamburger");
    var nav = $('.c-main-nav--links');

    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
      toggle.addEventListener("click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");

        if($(".c-hamburger--htx").hasClass("is-active")){
          nav.slideDown();
        } else {
          nav.slideUp();
        }

      });
    }

  });
})();
