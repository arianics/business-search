define(['angular'], function(angular) {
  'use strict';

  angular.module('myApp.yelpSearchService', [])
  .service('YelpSearchService', [function() {

    return {
      ping: function() {
        return 'pong';
      }
    };
  }]);
});