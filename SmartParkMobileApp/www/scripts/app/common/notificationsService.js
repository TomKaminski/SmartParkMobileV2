(function () {
    'use strict';

    function notificationService(ionicToast) {

        this.showNotifications = function (model) {
            if (model != undefined) {
                if (model.SuccessNotifications != undefined) {
                    for (var i = 0; i < model.SuccessNotifications.length; i++) {
                        ionicToast.show(model.SuccessNotifications[i], 'bottom', false, 4000, false);
                    }
                }

                if (model.ValidationErrors != undefined) {
                    for (var j = 0; j < model.ValidationErrors.length; j++) {
                        ionicToast.show(model.ValidationErrors[j], 'bottom', false, 4000, true);
                    }
                }
            }
        }

        this.showNotification = function (text, isSuccess) {
            if (isSuccess) {
                ionicToast.show(text, 'bottom', false, 4000, false);
            } else {
                ionicToast.show(text, 'bottom', false, 4000, true);
            }
        }
    }

    angular.module('app').service('notificationService', ['ionicToast', notificationService]);
})();