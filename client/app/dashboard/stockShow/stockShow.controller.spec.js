'use strict';

describe('Controller: StockShowCtrl', function () {

  // load the controller's module
  beforeEach(module('proj4App'));

  var StockShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockShowCtrl = $controller('StockShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
