(function () {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ngMessages']);

    app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptorFactory');

        $locationProvider.html5Mode(false);

        $stateProvider
            .state('app', {
                abstract: true,
                url: "/app",
                views: {
                    'layout': {
                        templateUrl: 'templates/layout.html',
                        controller: "layoutCtrl",
                        controllerAs: "layout"
                    }
                },
                cache: false
            })
            .state('app.homepage', {
                url: "/home",
                cache: false,
                views: {
                    'content': {
                        templateUrl: 'templates/home.html',
                        controller: "homepageCtrl",
                        controllerAs: "home"
                    }
                }
            })
            .state('app.homepage.alias', {
                url: "/",
                cache: false
            })
            .state('app.about', {
                url: '/about',
                cache: false,
                views: {
                    'content': {
                        templateUrl: 'templates/about.html',
                        controller: "aboutCtrl",
                        controllerAs: "about"
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                cache: false,
                views: {
                    'content': {
                        templateUrl: 'templates/settings.html',
                        controller: "settingsCtrl",
                        controllerAs: "settings"
                    }
                }
            })
            .state('app.forgot', {
                url: '/forgot',
                cache: false,
                views: {
                    'content': {
                        templateUrl: 'templates/forgot.html',
                        controller: "forgotCtrl",
                        controllerAs: "forgot"
                    }
                }
            });

        $urlRouterProvider.otherwise("/app/home");
    });

    app.constant('CONFIG', {
        hashHeaderName: 'HashHeader',
        apiGlobalUrl: "http://smartparkath.azurewebsites.net/Api",
        localStorageEnum: {
            "charges": "charges",
            "email": "email",
            "hash": "hash",
            "name": "name"
        },
        ConnectivityProblemMessage: "Wystąpił błąd połączenia, sprawdź łączność z internetem.",
        notificationEnum: {
            "error": "error",
            "success": "success"
        }
    });

    app.run(function ($rootScope) {
        $rootScope.loadingContainer = {};
        //$ionicPlatform.onHardwareBackButton(function () {
        //    navigator.app.exitApp();
        //});
    });
})();

