define(['angular'], function(angular) {
  'use strict';

  angular.module('myApp.addressBookService', [])
  .factory('addressBookService', [function() {
    var _index = [];
    var _data = {};

    var getItemName = function(item) {
      if (typeof item.name !== 'undefined') {
        return item.name;
      }
      return '';
    };

    var getItemUrl = function(item) {
      if (typeof item.url !== 'undefined') {
        return item.url;
      }
      return '';
    };

    var getItemPhone = function(item) {
      if (typeof item.display_phone !== 'undefined') {
        return item.display_phone;
      }
      return '';
    };

    var getItemAddress = function(item) {
      var address = '';
      if (typeof item.location !== 'undefined') {
        var name = getItemName(item);

        if (name.length) {
          address += name + '\n';
        }
        if (typeof item.location.address[0] !== 'undefined') {
          address += item.location.address[0] + '\n';
        }

        if (typeof item.location.city !== 'undefined') {
          address += item.location.city + ',';
        }

        if (typeof item.location.state_code !== 'undefined') {
          address += ' ' + item.location.state_code;
        }

        if (typeof item.location.postal_code !== 'undefined') {
          address += ' ' + item.location.postal_code;
        }
      }
      return address;
    };

    var contains = function(id) {
      return _index.indexOf(id) !== -1;
    };

    var add = function(item) {
      var tmp = {
        name: getItemName(item),
        url: getItemUrl(item),
        phone: getItemPhone(item),
        address: getItemAddress(item)
      };

      _index.push(item.id);
      _data[item.id] = tmp;
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

    var getIds = function() {
      return _index;
    };

    var getDataArray = function() {
      var arr = [{name: 'name', url: 'url', phone: 'phone', address: 'address'}];
      for (var i = 0; i < _index.length; i++) {
        arr.push(_data[_index[i]]);
      }
      return arr;
    };

    return {
      add: add,
      remove: remove,
      contains: contains,
      get: get,
      getAll: getAll,
      getIds: getIds,
      getDataArray: getDataArray
    };
  }]);
});
