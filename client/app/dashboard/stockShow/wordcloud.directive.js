'use strict';

angular.module('proj4App')
    .directive('clicker', function($compile) {
    'use strict';
    return {
        compile: function(tElement, tAttrs) {
            var t = '<div data-pop>Pop</div> more';
            return function(scope, iElement) {
        iElement.bind('click', function() {
                    $('.cloudSpot').append($compile(t)(scope));
                    scope.$apply()
                });
            };
        }
    }
});
angular.module('proj4App')
    .directive('pop', function() {
    'use strict';
    return {
       // template: '<div>Testing template</div>'
       templateUrl: '/partials/pop.html'
    };
});

