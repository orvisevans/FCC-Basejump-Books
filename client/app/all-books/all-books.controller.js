'use strict';

angular.module('documentsApp')
  .controller('AllBooksCtrl', function ($scope, $http, $animate, socket, tile, Auth) {
    $scope.pageTitle = 'Community Books';
    $scope.allBooks = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.bookSearch = "";

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
      }
    });

    $http.get('/api/books').success(function(allBooks) {
      $scope.allBooks = allBooks;
      socket.syncUpdates('book', $scope.allBooks);
    });

    $scope.canRequest = function (book) {
      return !(book.requested || book.onLoan) || book.owner._id !== $scope.user._id;
    };

    $scope.canCancelRequest = function (book) {
      return book.requested && book.requester._id === $scope.user._id;
    };

    $scope.canApproveOrDeny = function (book) {
      return book.requested && book.owner._id === $scope.user._id;
    };

    $scope.canReturn = function (book) {
      return book.isBorrowed && book.borrower._id === $scope.user._id;
    };

    $scope.canDelete = function (book) {
      return !book.isBorrowed && book.owner._id === $scope.user._id;
    };

    $scope.request = function (book) {
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

    $scope.return = function (book) {
      $http.put('/api/books/returnBook/' + book._id)
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.delete = function (book) {
      $http.delete('/api/books/' + book._id)
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
      console.log('borrowing not implemented yet for: ' + book);
      //TODO: Implement
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });
