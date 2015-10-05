'use strict';

angular.module('documentsApp')
  .controller('AllBooksCtrl', function ($scope, $http, socket, tile) {
    $scope.pageTitle = "Community Books"
    $scope.allBooks = [];

    $http.get('/api/books').success(function(allBooks) {
      $scope.allBooks = allBooks;
      socket.syncUpdates('book', $scope.allBooks);
    });

    $scope.requestBook = function (book) {
      $http.put('/api/books/request/' + book._id + '/' + $scope.user._id)
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.approveRequest = function (book) {
      $http.put('/api/books/approveRequest/' + book._id + '/' + book.requester)
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.returnBook = function (book) {
      $http.put('/api/books/returnBook/' + book._id)
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.getColor = tile.getColor;
    $scope.getSpan = tile.getSpan;

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.borrowBook = function(book) {
      //TODO: Implement
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });
