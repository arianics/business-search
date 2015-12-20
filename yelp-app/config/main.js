(function() {
  'use strict';

  var allTestFiles;

  if (window.__karma__) {
    allTestFiles = [];
    var TEST_REGEXP = /spec\.js$/;

    var pathToModule = function(path) {
      return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
      if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
      }
    });
  }

  require.config({
    paths: {
      angular: '../bower_components/angular/angular',
      angularRoute: '../bower_components/angular-route/angular-route',
      angularMocks: '../bower_components/angular-mocks/angular-mocks',
      text: '../bower_components/text/text',
      css: '../bower_components/require-css/css.min',
      lodash: '../bower_components/lodash/lodash.min'
    },
    shim: {
      'angular': {
        'exports': 'angular'
      },
      'angularRoute': ['angular'],
      'angularMocks': {
        deps: ['angular'],
        'exports': 'angular.mock'
      }
    },
    priority: [
      'angular'
    ],
    deps: window.__karma__ ? allTestFiles : [],
    callback: window.__karma__ ? window.__karma__.start : null,
    baseUrl: window.__karma__ ? '/base/app' : ''
  });

  require([
    'angular',
    'home/home',
    'app'
  ], function(angular) {
    angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
      // bootstrap the app manually
      angular.bootstrap(document, ['myApp']);
    });
  });

}());
