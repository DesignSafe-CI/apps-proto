(function(angular) {
    "use strict";
    angular.module('appsProtoApp').provider("config", function() {

        var values = {
            appName: "apps-proto",
            defaultLang: "en",

            listUrl: "",
            uploadUrl: "",
            renameUrl: "",
            copyUrl: "",
            removeUrl: "",

            tplPath: 'views'
        };

        return {
            $get: function() {
                return values;
            },
            set: function (constants) {
                angular.extend(values, constants);
            }
        };

    });
})(angular);
