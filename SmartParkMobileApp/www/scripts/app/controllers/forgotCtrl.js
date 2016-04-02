(function () {
    'use strict';

    function forgotController(accountService, apiFactory, $controller, $scope, CONFIG, loadingContentService, ionicToast) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;

        self.forgotPassword = function (email) {
            apiFactory.genericPost(
                  function () {
                      self.toggleGlobalLoading(true);
                      loadingContentService.setIsLoading('forgotPasswordLoading', true);
                  },
                  function () {
                      ionicToast.show('Wiadomość email została wysłana.', 'bottom', false, 5000, false);
                  },
                  function () {
                      loadingContentService.setIsLoading('forgotPasswordLoading', false);
                      self.toggleGlobalLoading(false);
                  },
                  function () {
                      self.toggleGlobalLoading(false);
                      loadingContentService.setIsLoading('forgotPasswordLoading', false);
                  },
                  apiFactory.apiEnum.ForgotPassword, { Email: email });
        }
    }

    angular.module('app').controller('forgotCtrl', ['accountService', 'apiFactory', '$controller', '$scope', 'CONFIG', 'loadingContentService', 'ionicToast', forgotController]);
})();


