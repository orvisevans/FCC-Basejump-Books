'use strict';

angular.module('documentsApp')
  .controller('DialogController', function ($scope, $mdDialog, $http, Auth) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  $scope.clearDialog = function() {
    $scope.name = '';
    $scope.author = '';
    $scope.coverUrl = '';
  };


  $scope.addBook = function() {
    if(!Auth.isLoggedIn() || $scope.name === '' || $scope.author === '' || $scope.coverUrl === '' || $scope.owner === '') {
      return;
    }
    var newBook = {
        name: $scope.name,
        author: $scope.author,
        coverUrl: $scope.coverUrl,
        owner: Auth.getCurrentUser().id,
        dateAdded: new Date(),
        public: $scope.public
    };
    console.log(newBook);
    $http.post('/api/books', newBook).then(function() {
      $scope.clearDialog();
      $scope.closeDialog();
    });
  };
});
