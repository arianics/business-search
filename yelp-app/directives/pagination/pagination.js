require.config({
  paths: {
    'pagination-html': './directives/pagination/pagination.html'
  }
});

define(['angular', 'text!pagination-html'],
  function(angular, html) {
  'use strict';

  angular.module('myApp.pagination', [])
    .directive('pagination', [function() {
      return {
        restrict: 'E',
        scope: {},
        template: html,
        controller: 'PaginationController',
        controllerAs: 'paginationCtrl',
        bindToController: {
          total: '@',
          index: '@?'
        },
        compile: function($element, $attrs) {
          $attrs.index = $attrs.index || '0';
        }
      };
    }])
    .controller('PaginationController', ['$location',
      function($location) {

        this.getTotalPagesArray = function(num) {
          return new Array(parseInt(num));
        };

        this.route = function(num) {
          $location.path('/' + num);
        };
      }
    ]);
});
