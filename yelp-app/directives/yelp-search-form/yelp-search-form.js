require.config({
  paths: {
    'yelp-search-form-html': './directives/yelp-search-form/yelp-search-form.html',
    'yelp-search-service': 'services/yelp-search/yelp-search'
  }
});
define(['angular', 'text!yelp-search-form-html', 'lodash'],
  function(angular, html, _) {
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
            returnData: '=',
            formData: '=?'
          }
        };
      }])
      .controller('YelpSearchFormController', [
        function() {
          var _this = this;
          this.termError = false;
          this.locationError = false;
          var formData = {
            term: '',
            sort: '0',
            location: 'Glendale, Ca',
            radius_filter: '40000',
            deals_filter: ''
          };

          this.data = {};
          _.defaults(this.data, this.formData, formData);

          // this.term = this.formData.term;
          // this.sort = this.formData.sort;
          // this.location = this.formData.location;
          // this.radius_filter = this.formData.radius_filter;
          // this.deals_filter = this.formData.deals_filter;

          this.submit = function() {
            console.log('submit');
            if (_this.formData.term === '') {
              _this.termError = true;
            } else {
              _this.termError = false;
            }
            if (_this.formData.location === '') {
              _this.locationError = true;
            } else {
              _this.locationError = false;
            }

            if (_this.locationError || _this.termError) {
              return;
            }

            if (typeof _this.returnData === 'function') {
              var tmpData = {};
              _.defaults(tmpData, _this.data);
              _this.returnData(tmpData);
            }

          };
        }
      ]);
  });
