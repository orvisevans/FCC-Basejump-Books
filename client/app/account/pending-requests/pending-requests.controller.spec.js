'use strict';

describe('Controller: PendingRequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('documentsApp'));

  var PendingRequestsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PendingRequestsCtrl = $controller('PendingRequestsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
