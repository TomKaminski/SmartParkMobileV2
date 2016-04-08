angular.module('app').directive('charges', ['$timeout', 'accountService', function ($timeout, accountService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            loadname: '@'
        },
        template: '<span></span>',
        link: function ($scope, element) {
            $scope.$watch(function () {
                return accountService.userData.charges;
            }, function () {
                element.text(accountService.userData.charges);
            });
        }
    };
}]);