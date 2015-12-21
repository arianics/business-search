require.config({
  paths: {
    'add-to-list-html': './directives/add-to-list/add-to-list.html',
    'address-book': './services/address-book/address-book'
  }
});

define(['angular', 'text!add-to-list-html', 'address-book'],
  function(angular, html) {
    'use strict';

    angular.module('myApp.addToList', ['myApp.addressBookService'])
      .directive('addToList', [function() {
        return {
          restrict: 'E',
          scope: {},
          template: html,
          controller: 'AddToListController',
          controllerAs: 'atlCtrl',
          bindToController: {
            item: '='
          }
        };
      }])
      .controller('AddToListController', ['addressBookService',
        function(addressBookService) {
          var _this = this;

          var updateAddedState = function() {
            _this.added = addressBookService.contains(_this.item.id);
            _this.label = _this.added ? 'remove' : 'Add To List';
            _this.btnClass = _this.added ? 'btn-danger' : 'btn-outline';
          };

          this.toggle = function() {
            if (addressBookService.contains(_this.item.id)) {
              addressBookService.remove(_this.item.id);
            } else {
              addressBookService.add(_this.item);
            }
            updateAddedState();
            console.log(addressBookService.getAll());
          };

          updateAddedState();
        }
      ]);
  });
