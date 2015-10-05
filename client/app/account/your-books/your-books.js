'use strict';

angular.module('documentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('your-books', {
        url: '/your-books',
        templateUrl: 'app/account/your-books/your-books.html',
        controller: 'YourBooksCtrl'
      });
  });