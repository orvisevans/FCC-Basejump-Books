'use strict';

angular.module('documentsApp')
  .controller('PendingRequestsCtrl', function ($scope, $http, $location, socket, tile, Auth) {
    $scope.pageTitle = 'Pending Requests';
    $scope.booksRequestedByUser = [];
    $scope.booksRequestedFromUser = [];

    function getBooksRequestedBy(user) {
      $http.get('/api/books/requestedBy/' + user._id).success(function(books) {
        $scope.booksRequestedByUser = books;
        socket.syncUpdates('book', $scope.booksRequestedByUser);
      });
    }

    function getBooksRequestedFrom(user) {
      $http.get('/api/books/requestedFrom/' + user._id).success(function(books) {
        $scope.booksRequestedFromUser = books;
        socket.syncUpdates('book', $scope.booksRequestedFromUser);
      });
    }

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
        getBooksRequestedBy($scope.user);
        getBooksRequestedFrom($scope.user);
      } else {
        $location.path('/login');
      }
    });

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
