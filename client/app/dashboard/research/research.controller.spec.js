'use strict';

describe('Controller: ResearchCtrl', function () {

  // load the controller's module
  beforeEach(module('proj4App'));

  var ResearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResearchCtrl = $controller('ResearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
