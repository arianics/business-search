define(['angular'], function(angular) {
  'use strict';

  angular.module('myApp.yelpSearchService', [])
  .factory('yelpSearchData', [function() {
    var _data = null;

    var setData = function(data) {
      _data = data;
    };

    var getData = function() {
      return _data;
    };

    return {
      setData: setData,
      getData: getData
    };
  }])
  .service('YelpSearchService', ['$http', 'yelpSearchData',
    function($http, yelpSearchData) {
    var search = function(data) {
      yelpSearchData.setData(data);
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
