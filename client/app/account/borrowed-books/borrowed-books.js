'use strict';

angular.module('documentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('borrowed-books', {
        url: '/borrowed-books',
        templateUrl: 'app/account/borrowed-books/borrowed-books.html',
        controller: 'BorrowedBooksCtrl'
      });
  });