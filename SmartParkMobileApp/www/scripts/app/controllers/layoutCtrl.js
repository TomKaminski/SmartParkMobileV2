(function () {
    'use strict';

    function layoutController(accountService, $state, $controller, $scope) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));
        var self = this;

        self.getUserContext = function() {
            return accountService.userData;
        }


        self.logout = function () {
            accountService.logout();
            accountService.initUserContext();
            $state.go('app.homepage');
        }
    }

    angular.module('app').controller('layoutCtrl', ['accountService', '$state', '$controller', '$scope', layoutController]);
})();