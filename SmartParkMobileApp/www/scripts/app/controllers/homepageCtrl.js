(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout, $controller, $scope, CONFIG, loadingContentService, ionicToast) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;
        self.isGateBtnActive = true;
        self.refreshUserContext();
        self.gateBtnText = "NACIŚNIJ,<br/>ABY <b>OTWORZYĆ</b>";

        self.login = function (email, password) {
            apiFactory.genericPost(
               function () {
                   self.toggleGlobalLoading(true);
                   loadingContentService.setIsLoading('loginLoading', true);
               },
               function (data) {
                   accountService.login(data.Result.PasswordHash, email, data.Result.Charges, data.Result.Name);
                   self.refreshUserContext();
               },
               function () {
                   loadingContentService.setIsLoading('loginLoading', false);
                   self.toggleGlobalLoading(false);
               },
               function () {
                   self.toggleGlobalLoading(false);
                   loadingContentService.setIsLoading('loginLoading', false);
               },
               apiFactory.apiEnum.Login, { UserName: email, Password: password });
        }

        self.logout = function () {
            accountService.logout();
            self.refreshUserContext();
        }

        var i = 5;
        function removeDisabled() {
            if (i !== 0) {
                $timeout(function () {
                    i--;
                    self.gateBtnText = i;
                    removeDisabled();
                }, 1000);
            }
            if (i === 0) {
                self.isGateBtnActive = true;
                self.gateBtnText = "NACIŚNIJ,<br/>ABY <b>OTWORZYĆ</b>";
                i = 5;
            }
        }

        self.openGates = function () {
            self.isGateBtnActive = false;
            self.refreshUserContext();
            if (self.user.loggedIn === true) {
                apiFactory.genericPost(
                     function () {
                         self.toggleGlobalLoading(true);
                         loadingContentService.setIsLoading('openGateLoading', true);
                     },
                     function (data) {
                         accountService.updateCharges(data.Result);
                         self.refreshUserContext();
                         if (data.Result !== 0) {
                             self.gateBtnText = 5;
                             removeDisabled();
                             ionicToast.show('Brama otwierana, miłego dnia!', 'bottom', false, 5000, false);
                         } else {
                             ionicToast.show('Brak wyjazdów, doładuj konto!', 'bottom', false, 4000, true);
                             self.isGateBtnActive = true;
                         }
                         loadingContentService.setIsLoading('openGateLoading', false);
                     },
                     function (data) {
                         if (!data.IsValid) {
                             self.isGateBtnActive = true;
                             accountService.logout();
                         }
                         self.refreshUserContext();
                         self.toggleGlobalLoading(false);
                         loadingContentService.setIsLoading('openGateLoading', false);
                     },
                     function () {
                         self.toggleGlobalLoading(false);
                         loadingContentService.setIsLoading('openGateLoading', false);
                     },
                     apiFactory.apiEnum.OpenGate, { Email: self.user.userEmail });
            }
        }

        self.refresh = function () {
            self.refreshUserContext();
            if (self.user.loggedIn === true) {
                apiFactory.genericPost(
                    function () {
                        self.toggleGlobalLoading(true);
                        loadingContentService.setIsLoading('refreshChargesLoading', true);
                    },
                    function (data) {
                        accountService.updateCharges(data.Result);
                        self.refreshUserContext();
                    },
                    function () {
                        ionicToast.show('Liczba wyjazdów odświeżona', 'bottom', false, 4000, false);
                        loadingContentService.setIsLoading('refreshChargesLoading', false);
                        self.toggleGlobalLoading(false);
                    },
                    function () {
                        self.toggleGlobalLoading(false);
                        loadingContentService.setIsLoading('refreshChargesLoading', false);
                    },
                    apiFactory.apiEnum.RefreshCharges, { Email: self.user.userEmail });
            }
        };

    }

    angular.module('app').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout', '$controller', '$scope', 'CONFIG', 'loadingContentService', 'ionicToast', homepageController]);
})();


