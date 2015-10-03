'use strict';

angular.module('documentsApp')
  .controller('ShellCtrl', function ($mdSidenav, $mdDialog, $mdMedia, $scope, $location, Auth) {


    $scope.menu = [
      {title: 'All Books', url: '/all-books', icon: '', count: ''},
      {title: 'Pending Requests', url: '/pending-requests', icon: '', count: ''},
      {title: 'Borrowing Books', url: '/borrowing-books', icon: '', count: ''},
      {title: 'Borrowed Books', url: '/borrowed-books', icon: '', count: ''}
    ];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };

    $scope.showAddDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'components/shell/dialog/dialog.html',
        controller: 'DialogController'
      });
    };
  });
