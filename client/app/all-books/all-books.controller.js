'use strict';

angular.module('documentsApp')
  .controller('AllBooksCtrl', function ($scope, $http, socket, tile, Auth) {
    $scope.pageTitle = "Community Books"
    $scope.allBooks = [];
    $scope.isLoggedIn = Auth.isLoggedIn;

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
      }
    });

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

    $scope.denyRequest = function (book) {
      $http.put('/api/books/denyRequest/' + book._id + '/' + book.requester)
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

    $scope.isMyBook = function (book) {
      return book.owner === $scope.user._id;
    };

    $scope.imBorrowing = function (book) {
      return book.borrower === $scope.user._id;
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
