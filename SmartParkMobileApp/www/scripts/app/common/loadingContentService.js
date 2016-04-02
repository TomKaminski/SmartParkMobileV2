(function () {
    'use strict';

    function loadingContentService($rootScope) {
        this.setIsLoading = function (name, value) {
            $rootScope.loadingContainer[name] = value;
        }

        this.isContentLoading = function (name) {
            return $rootScope.loadingContainer[name];
        }
    }

    angular.module('app').service('loadingContentService', ['$rootScope', loadingContentService]);
})();