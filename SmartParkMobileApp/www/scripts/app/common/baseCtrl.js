(function () {
    'use strict';

    function baseCtrl($scope, accountService, globalLoadingService) {
        this.globalLoading = false;

        this.refreshUserContext = function () {
            this.user = accountService.initUserContext();
        }

        this.toggleGlobalLoading = function (turnOn) {
            globalLoadingService.setIsLoading(turnOn);
        }

        this.isGlobalLoadingOn = function () {
            this.globalLoading = globalLoadingService.isContentLoading();
        }
    }

    angular.module('app').controller('baseCtrl', ['$scope','accountService','globalLoadingService', baseCtrl]);
})();