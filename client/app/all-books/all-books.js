'use strict';

angular.module('documentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('all-books', {
        url: '/all-books',
        templateUrl: 'app/all-books/all-books.html',
        controller: 'AllBooksCtrl'
      });
  });