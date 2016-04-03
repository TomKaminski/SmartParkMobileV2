(function () {
    'use strict';

    function baseCtrl(globalLoadingService) {
        this.globalLoading = false;

        this.toggleGlobalLoading = function (turnOn) {
            globalLoadingService.setIsLoading(turnOn);
        }

        this.isGlobalLoadingOn = function () {
            this.globalLoading = globalLoadingService.isContentLoading();
        }
    }

    angular.module('app').controller('baseCtrl', ['globalLoadingService', baseCtrl]);
})();