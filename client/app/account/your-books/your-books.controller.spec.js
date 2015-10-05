'use strict';

describe('Controller: YourBooksCtrl', function () {

  // load the controller's module
  beforeEach(module('documentsApp'));

  var YourBooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YourBooksCtrl = $controller('YourBooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
