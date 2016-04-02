(function () {
    'use strict';

    function globalLoadingService() {
        var isLoading = false;

        this.setIsLoading = function (turnOn) {
            isLoading = turnOn;
        }

        this.isContentLoading = function () {
            return isLoading;
        }
    }

    angular.module('app').service('globalLoadingService', globalLoadingService);
})();