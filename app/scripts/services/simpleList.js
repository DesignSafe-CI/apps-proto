(function(angular) {
    "use strict";
    angular.module('appsProtoApp').factory('SimpleList', [
        '$http', '$q', 'MetaController', 'AppsController', function ($http, $q, MetaController, AppsController) {

        var SimpleList = function() {
            this.selected = null,
            this.lists = {}
        };

        SimpleList.prototype.addList = function(name, apps) {
            var self = this;
              self.lists[name] = [];
              angular.forEach(apps, function(app){
                self.lists[name].push({label: app});
              });
            return self;
        };

        SimpleList.prototype.getListByQuery = function(query, name) {
          var self = this;
          var deferred = $q.defer();
          MetaController.listMetadata(query, 99999, 0)
            .then(function(apps){
                self.lists[name] = [];
                angular.forEach(apps, function(app){
                  self.lists[name].push({label: app.name});
                });
                deferred.resolve(self);
            })
            .catch(function(error){
              deferred.reject(error);
            });

          return deferred.promise;
        };

        return SimpleList;
    }]);
})(angular);
