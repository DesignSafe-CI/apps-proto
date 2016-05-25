(function(angular) {
    "use strict";
    angular.module('appsProtoApp').service('MultipleList', [
        '$http', function ($http) {


        var MultipleList = function() {
          this.lists = []
        };

        MultipleList.prototype.addList = function(name, apps) {
            var self = this;
            var list = {};
            list.listName = 'apps';
            list.dragging = false;
            list.items = [];
            angular.forEach(apps, function(app){
              list.items.push({label: app});
            });

            // push apps list
            this.lists.push(list);

            // add empty list
            this.lists.push({listName: name, dragging: false, items: list.items});

            return self;
        };

        return MultipleList;
    }]);
})(angular);
