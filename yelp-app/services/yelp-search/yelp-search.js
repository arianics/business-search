define(['angular'], function(angular) {
  'use strict';

  angular.module('myApp.yelpSearchService', [])
  .service('YelpSearchService', ['$http', function($http) {

    var search = function(data) {
      return $http.post('//localhost:3001/yelp-search', data);
    };

    return {
      ping: function() {
        return 'pong';
      },
      search: search
    };
  }]);
});
