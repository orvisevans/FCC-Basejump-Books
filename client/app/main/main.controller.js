'use strict';

angular.module('documentsApp')
  .controller('MainCtrl', function ($scope, $http, socket, tile) {
    $scope.pageTitle = 'Things';
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.getColor = tile.getColor;
    $scope.getSpan = tile.getSpan;

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
