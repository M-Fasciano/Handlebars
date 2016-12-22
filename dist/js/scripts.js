(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}]},{},[1]);
