define(['angular'], function(angular) {
  'use strict';

  angular.module('myApp.addressBookService', [])
  .factory('addressBookService', [function() {
    var _index = [];
    var _data = {};

    var contains = function(id) {
      return _index.indexOf(id) !== -1;
    };

    var add = function(item) {
      _index.push(item.id);
      _data[item.id] = item;
    };

    var remove = function(id) {
      if (!contains(id)) {
        return;
      }

      _index.splice(_index.indexOf(id), 1);
      delete _data[id];
    };

    var get = function(id) {
      if (!contains(id)) {
        return false;
      }
      return _data[id];
    };

    var getAll = function() {
      return _data;
    };

    return {
      add: add,
      remove: remove,
      contains: contains,
      get: get,
      getAll: getAll
    };
  }]);
});
