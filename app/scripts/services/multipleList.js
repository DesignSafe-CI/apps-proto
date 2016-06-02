(function(angular) {
    "use strict";
    angular.module('appsProtoApp').service('MultipleList', [
        '$http', '$q', function ($http, $q) {


        var MultipleList = function() {
          this.lists = []
        };

        MultipleList.prototype.addList = function(name, apps) {
            var self = this;
            var deferred = $q.defer();
            var list = {};
            list.listName = name;
            list.dragging = false;
            list.items = [];
            angular.forEach(apps, function(app){
              list.items.push({label: app});
            });

            // push apps list
            this.lists.push(list);

            return deferred.resolve(self);
        };

        return MultipleList;
    }]);
})(angular);
