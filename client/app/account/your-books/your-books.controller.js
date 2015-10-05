'use strict';

angular.module('documentsApp')
  .controller('YourBooksCtrl', function ($scope, $http, $location, socket, tile, Auth, User) {
    $scope.pageTitle = "Your Books"
    $scope.myBooks = [];

    function getBooksOwnedBy(user) {
      $http.get('/api/books/ownedBy/' + user._id).success(function(myBooks) {
        $scope.myBooks = myBooks;
        socket.syncUpdates('book', $scope.myBooks);
      });
    }

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
        getBooksOwnedBy($scope.user);
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
