'use strict';

angular.module('documentsApp')
  .controller('BorrowedBooksCtrl', function ($scope, $http, $location, socket, tile, Auth, User) {
    $scope.pageTitle = "Community Books"
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
        var user = Auth.getCurrentUser();
        getBooksBorrowedBy(user);
        getBooksBorrowedFrom(user);
      } else {
        $location.path('/login');
      }
    });



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
