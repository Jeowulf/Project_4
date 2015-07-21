'use strict';

describe('Controller: AllPortfoliosCtrl', function () {

  // load the controller's module
  beforeEach(module('proj4App'));

  var AllPortfoliosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllPortfoliosCtrl = $controller('AllPortfoliosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
