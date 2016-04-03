(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate, accountService, $state, $controller, $scope, $ionicHistory, backButtonManager) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));
        var self = this;
        backButtonManager.disable();

        self.getUserContext = function() {
            return accountService.userData;
        }

        self.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        self.logout = function () {
            $ionicSideMenuDelegate.toggleLeft();
            accountService.logout();
            accountService.initUserContext();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.homepage');
        }

        self.goTo = function (state) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go(state);
            $ionicSideMenuDelegate.toggleLeft();
        }
    }

    angular.module('app').controller('layoutCtrl', ['$ionicSideMenuDelegate', 'accountService', '$state', '$controller', '$scope', '$ionicHistory', 'backButtonManager', layoutController]);
})();