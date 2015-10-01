'use strict';

angular.module('documentsApp')
  .controller('ProfileCtrl', function ($scope, $location, Auth) {
    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $scope.user = Auth.getCurrentUser();
      } else {
        $location.path('/login');
      }
    });
  });
