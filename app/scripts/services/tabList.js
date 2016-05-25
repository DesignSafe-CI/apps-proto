(function(angular) {
    "use strict";
    angular.module('appsProtoApp').factory('TabList', [
        '$http', '$q', 'SimpleList', function ($http, $q, SimpleList) {

        var TabList = function() {
            this.tabs = [];
        };

        TabList.prototype.addTab = function(query, title) {
          var self = this;
          var deferred = $q.defer();
          var appList = new SimpleList();
          appList.getList(query, 'private')
            .then(function(appList){
              console.log('appList');
              var tab = {
                title: title,
                content: appList,
                active: false
              }
              self.tabs.push(tab);
              deferred.resolve(self);
            })
            .catch(function(error){
              console.log('addTab error');
              console.log(error);
              deferred.reject(error);
            });

          return deferred.promise;
        };


        // AppList.prototype.getSelectedItemsIncluding = function(list, item) {
        //   item.selected = true;
        //   return list.items.filter(function(item) { return item.selected; });
        // };
        //
        //
        // AppList.prototype.onDragstart = function(list, event) {
        //    list.dragging = true;
        //    if (event.dataTransfer.setDragImage) {
        //      var img = new Image();
        //      img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
        //      event.dataTransfer.setDragImage(img, 0, 0);
        //    }
        // };
        //
        //
        // AppList.prototype.onDrop = function(list, items, index) {
        //   angular.forEach(items, function(item) { item.selected = false; });
        //   list.items = list.items.slice(0, index)
        //               .concat(items)
        //               .concat(list.items.slice(index));
        //   return true;
        // }
        //
        //
        // AppList.prototype.onMoved = function(list) {
        //   list.items = list.items.filter(function(item) { return !item.selected; });
        // };


        // // Generate the initial model
        // angular.forEach($scope.modelsMultiple, function(list) {
        //   for (var i = 1; i <= 4; ++i) {
        //       list.items.push({label: "Item " + list.listName + i});
        //   }
        // });
        //
        // // Model to JSON for demo purpose
        // AppList.prototype.$watch('modelsSimple', function(modelsSimple) {
        //     $scope.modelsSimpleAsJson = angular.toJson(modelsSimple, true);
        // }, true);
        //
        // AppList.prototype.$watch('modelsMultiple', function(modelsMultiple) {
        //     $scope.modelsMultipleAsJson = angular.toJson(modelsMultiple, true);
        // }, true);

        return TabList;
    }]);
})(angular);
