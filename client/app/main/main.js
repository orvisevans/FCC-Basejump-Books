'use strict';

angular.module('documentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/things',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
