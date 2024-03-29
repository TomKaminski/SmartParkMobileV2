﻿angular.module('app').directive('loader', ['$timeout', '$rootScope', function ($timeout, $rootScope) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            loadname: '@'
        },
        template: '<ion-spinner icon="spiral"></ion-spinner>',
        link: function ($scope, element) {
            $scope.$watch(function () {
                return $rootScope.loadingContainer[$scope.loadname];
            }, function () {
                if ($rootScope.loadingContainer[$scope.loadname]) {
                    $timeout(function () {
                        element.removeClass('ng-hide');
                    });
                } else {
                    $timeout(function () {
                        element.addClass('ng-hide');
                    });
                }
            });
        }
    };
}]);