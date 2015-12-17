require.config({
  paths: {
    'yelp-search-form-html': './directives/yelp-search-form/yelp-search-form.html',
    'yelp-search-service': 'services/yelp-search/yelp-search'
  }
});
define(['angular', 'text!yelp-search-form-html'], function(angular, html) {
  'use strict';
  angular.module('myApp.yelpSearchForm', [])
    .directive('yelpSearchForm', [function() {
      return {
        restrict: 'E',
        scope: {},
        template: html,
        controller: 'YelpSearchFormController',
        controllerAs: 'yFormCtrl',
        bindToController: {
          returnData: '='
        }
      };
    }])
    .controller('YelpSearchFormController', [
      function() {
        this.termError = false;
        this.locationError = false;
        this.formData = {
          term: '',
          sort: '0',
          location: 'Glendale, Ca',
          radius_filter: '25',
          deals_filter: ''
        };

        this.submit = function() {
          console.log(this.formData);
          if (this.formData.term === '') {
            this.termError = true;
          } else {
            this.termError = false;
          }
          if (this.formData.location === '') {
            this.locationError = true;
          } else {
            this.locationError = false;
          }

          if (this.locationError || this.termError) {
            return;
          }

          if (typeof this.returnData === 'function') {
            this.returnData(this.formData);
          }

        };
      }
    ]);
});
