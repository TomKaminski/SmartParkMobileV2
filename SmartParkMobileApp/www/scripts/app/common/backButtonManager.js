(function () {
    'use strict';

    function backButtonManager($ionicPlatform) {

        this.deregister = undefined;

        this.disable = function () {
            this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                e.preventDefault();
                return false;
            }, 101);
        }

        return this;
    }

    angular.module('app').service('backButtonManager', ['$ionicPlatform', backButtonManager]);
})();