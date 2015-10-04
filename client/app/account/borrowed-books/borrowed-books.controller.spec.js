'use strict';

describe('Controller: BorrowedBooksCtrl', function () {

  // load the controller's module
  beforeEach(module('documentsApp'));

  var BorrowedBooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BorrowedBooksCtrl = $controller('BorrowedBooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
