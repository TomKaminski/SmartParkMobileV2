(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout, $controller, $scope, CONFIG, loadingContentService, ionicToast, notificationService) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;
        self.isGateBtnActive = true;
        accountService.initUserContext();
        self.user = accountService.userData;
        self.gateBtnText = "NACIŚNIJ,<br/>ABY <b>OTWORZYĆ</b>";

        self.login = function (email, password) {
            apiFactory.genericPost(
               function () {
                   self.toggleGlobalLoading(true);
                   loadingContentService.setIsLoading('loginLoading', true);
               },
               function (data) {
                   accountService.login(data.Result.PasswordHash, email, data.Result.Charges, data.Result.Name);
                   self.charges = accountService.userData.charges;

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
        }

        var i = 5;
        function removeDisabled(charges) {
            if (i !== 0) {
                $timeout(function () {
                    i--;
                    self.gateBtnText = i;
                    removeDisabled(charges);
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
            if (self.user.loggedIn === true) {
                self.toggleGlobalLoading(true);
                loadingContentService.setIsLoading('openGateLoading', true);

                apiFactory.post(apiFactory.apiEnum.OpenGate, { Email: self.user.userEmail }).then(function(data) {
                    if (data.IsValid === true) {
                        accountService.updateCharges(data.Result);
                        if (data.Result !== 0) {
                            self.gateBtnText = 5;
                            removeDisabled(data.Result);
                            ionicToast.show('Brama otwierana, miłego dnia!', 'bottom', false, 5000, false);
                        } else {
                            ionicToast.show('Brak wyjazdów, doładuj konto!', 'bottom', false, 4000, true);
                            self.isGateBtnActive = true;
                        }
                        loadingContentService.setIsLoading('openGateLoading', false);
                    } else {
                        self.isGateBtnActive = true;
                        accountService.logout();
                    }
                    notificationService.showNotifications(data);
                    self.toggleGlobalLoading(false);
                    loadingContentService.setIsLoading('openGateLoading', false);
                }, function() {
                    self.toggleGlobalLoading(false);
                    loadingContentService.setIsLoading('openGateLoading', false);
                    notificationService.showNotification("Wystąpił błąd podczas łączenia się z serwerem.", false);
                });
            }
        }

        self.refresh = function () {
            if (self.user.loggedIn === true) {
                apiFactory.genericPost(
                    function () {
                        self.toggleGlobalLoading(true);
                        loadingContentService.setIsLoading('refreshChargesLoading', true);
                    },
                    function (data) {
                        accountService.updateCharges(data.Result);
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

    angular.module('app').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout', '$controller', '$scope', 'CONFIG', 'loadingContentService', 'ionicToast', 'notificationService', homepageController]);
})();


