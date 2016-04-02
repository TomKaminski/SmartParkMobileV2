cordova.commandProxy.add("Toast", {
    show: function (successCallback, errorCallback) {
        var res = NotificationComponentWindows10.Toast.show();
        if (res.indexOf("Error") === 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    }
});