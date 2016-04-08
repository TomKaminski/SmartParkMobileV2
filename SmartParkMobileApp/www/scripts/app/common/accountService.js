(function () {
    'use strict';

    function accountService(localStorageFactory, CONFIG) {

        this.userData = {
            loggedIn : false,
            charges : null,
            userEmail: null,
            memoryHash: null,
            userName: null
        }

        this.updateCharges = function (charges) {
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            this.userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
        };

        this.login = function (hash, email, charges, name) {
            localStorageFactory.set(CONFIG.localStorageEnum.email, email);
            localStorageFactory.set(CONFIG.localStorageEnum.hash, hash);
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            localStorageFactory.set(CONFIG.localStorageEnum.name, name);

            this.userData.loggedIn = true;
            this.userData.charges = charges;
            this.userData.userEmail = email;
            this.userData.memoryHash = hash;
            this.userData.userName = name;
        };

        this.getAccountData = function (refresh) {
            return refresh === true ? this.initUserContext() : this.userData;
        };

        this.getCharges = function() {
            return this.userData.charges;
        }

        this.initUserContext = function () {
            if (this.userData.loggedIn === true && this.userData.memoryHash !== null) {
                return this.userData;
            }

            this.userData.memoryHash = localStorageFactory.get(CONFIG.localStorageEnum.hash);
            if (this.userData.memoryHash === null) {
                this.userData.loggedIn = false;
                this.userData.charges = null;
                this.userData.userEmail = null;
                this.userData.userName = null;
            } else {
                this.userData.userEmail = localStorageFactory.get(CONFIG.localStorageEnum.email);
                this.userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
                this.userData.userName = localStorageFactory.get(CONFIG.localStorageEnum.name);
                this.userData.loggedIn = true;
            }
            return this.userData;
        };

        this.logout = function () {
            this.userData.loggedIn = false;
            this.userData.charges = null;
            this.userData.userEmail = null;
            this.userData.userName = null;
            this.userData.memoryHash = null;
            localStorageFactory.clear();
        };
    }
    angular.module('app').service('accountService', ['localStorageFactory', 'CONFIG', accountService]);
})();