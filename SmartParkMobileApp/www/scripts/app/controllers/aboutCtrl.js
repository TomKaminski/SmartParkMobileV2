(function () {
    'use strict';

    function aboutCtrl($controller, $scope) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));
        var self = this;
    }

    angular.module('app').controller('aboutCtrl', ['$controller', '$scope', aboutCtrl]);
})();


