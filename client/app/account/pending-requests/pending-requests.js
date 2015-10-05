'use strict';

angular.module('documentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pending-requests', {
        url: '/pending-requests',
        templateUrl: 'app/account/pending-requests/pending-requests.html',
        controller: 'PendingRequestsCtrl'
      });
  });