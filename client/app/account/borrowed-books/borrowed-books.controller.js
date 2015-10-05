'use strict';

angular.module('documentsApp')
  .controller('BorrowedBooksCtrl', function ($scope, $http, $location, socket, tile, Auth, User) {
    $scope.pageTitle = "Borrowed Books"
    $scope.booksBorrowedByUser = [];
    $scope.booksBorrowedFromUser = [];

    function getBooksBorrowedBy(user) {
      $http.get('/api/books/borrowedBy/' + user._id).success(function(books) {
        $scope.booksBorrowedByUser = books;
        socket.syncUpdates('book', $scope.booksBorrowedByUser);
      });
    }

    function getBooksBorrowedFrom(user) {
      $http.get('/api/books/borrowedFrom/' + user._id).success(function(books) {
        $scope.booksBorrowedFromUser = books;
        socket.syncUpdates('book', $scope.booksBorrowedFromUser);
      });
    }

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
        getBooksBorrowedBy($scope.user);
        getBooksBorrowedFrom($scope.user);
      } else {
        $location.path('/login');
      }
    });

    $scope.returnBook = function (book) {
      $http.put('/api/books/returnBook/' + book._id)
        .success(function(bookRes) {
          book = bookRes;
        });
    };

    $scope.dueDate = function (book) {
      return book.dueDate.slice(0,15);
    };



    $scope.getColor = tile.getColor;
    $scope.getSpan = tile.getSpan;

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });
