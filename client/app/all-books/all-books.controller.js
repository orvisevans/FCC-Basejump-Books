'use strict';

angular.module('documentsApp')
  .controller('AllBooksCtrl', function ($scope, $http, $animate, socket, tile, Auth) {
    $scope.pageTitle = 'Community Books';
    $scope.allBooks = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.bookSearch = '';

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
      }
    });

    $http.get('/api/books').success(function(allBooks) {
      $scope.allBooks = allBooks;
      socket.syncUpdates('book', $scope.allBooks);
    });

    function iAm(user) {
      return user._id === $scope.user._id;
    }

    $scope.canRequest = function (book) {
      return !book.requested && !book.onLoan && !iAm(book.owner);
    };

    $scope.canCancelRequest = function (book) {
      return book.requested && iAm(book.requester);
    };

    $scope.canApproveOrDeny = function (book) {
      return iAm(book.owner) && book.requested;
    };

    $scope.canReturn = function (book) {
      return book.onLoan && iAm(book.borrower);
    };

    $scope.canDelete = function (book) {
      return iAm(book.owner) && !book.onLoan;
    };

    $scope.request = function (book) {
      $http.put('/api/books/request/' + book._id, { requester: $scope.user._id })
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.cancelRequest = function (book) {
      $http.put('/api/books/cancel-request/' + book._id)
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.approveRequest = function (book) {
      $http.put('/api/books/approve-request/' + book._id, { requester: book.requester})
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.denyRequest = function (book) {
      $http.put('/api/books/deny-request/' + book._id, { requester: book.requester})
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.return = function (book) {
      $http.put('/api/books/return/' + book._id)
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
