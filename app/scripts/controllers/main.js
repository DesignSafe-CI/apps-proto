'use strict';

angular.module('appsProtoApp').controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$uibModal', 'config', 'AppsController', 'MetaController', 'SimpleList', 'MultipleList', function ($scope, $rootScope, $timeout, $q, $uibModal, config, AppsController, MetaController, SimpleList, MultipleList) {

  /*********************** tabs *********************/
   $scope.config = config;
   $scope.activeTabIndex = 0
   $scope.tabs = [];

   $scope.addTab = function(){
     var self = this;
     var deferred = $q.defer();
     var appList = new SimpleList();
     var query = '{"value.type": "application"}';
     var title = 'newlist';

    // Get MultipleList
     var appMultipleList = new MultipleList();
     var query = '{"value.type": "application"}';

     MetaController.listMetadata(query, 99999, 0)
       .then(function(metaList){
         var apps = [];
         angular.forEach(metaList, function(meta){
            apps.push(meta.name);
         });
         appMultipleList.addList('newlist', apps);

         $scope.tabs.push({
           title: title,
           content: {},
           edit: true,
           multiple: appMultipleList
         })
         $timeout(function(){
           $scope.activeTabIndex = ($scope.tabs.length - 1);
         });
         deferred.resolve(self);
       })
       .catch(function(error){
         deferred.reject(error);
       });

       return deferred.promise;
   }

   $scope.addDefaultTab = function (query, title) {
      var self = this;
      var deferred = $q.defer();
      var appList = new SimpleList();

      appList.getListByQuery(query, title)
        .then(function(appList){
          $scope.tabs.push({
            title: title,
            content: appList
          })
          $timeout(function(){
            $scope.activeTabIndex = ($scope.tabs.length - 1);
          });
          deferred.resolve(self);
        })
      .catch(function(error){
        deferred.reject(error);
      });
      return deferred.promise;

   };

   $scope.addUserTabs = function (query) {
      var self = this;
      var deferred = $q.defer();


      MetaController.listMetadata(query, 99999, 0)
        .then(function(metaList){
            // get list of apps in each list metadata
            angular.forEach(metaList, function(list){
              var appList = new SimpleList();
              $scope.tabs.push({
                title: list.value.listName,
                content: appList.addList(list.value.listName, list.value.listApps)
              })
              $timeout(function(){
                $scope.activeTabIndex = ($scope.tabs.length - 1);
              });
            });
            deferred.resolve(self);
        })
        .catch(function(error){
          deferred.reject(error);
        });
      return deferred.promise;

   };

   $scope.removeTab = function (event, index) {
     event.preventDefault();
     event.stopPropagation();
     $scope.tabs.splice(index, 1);
   };

  $scope.staticList = ['public', 'private'];

  $scope.initTabs = function(){
    var self = this;
    var promises = [];
    self.requesting = true;

    promises.push($scope.addDefaultTab('{"value.definition.isPublic": false}', 'private'));
    promises.push($scope.addDefaultTab('{"value.definition.isPublic": true}', 'public'));
    promises.push($scope.addUserTabs('{"value.listUsername": "mrojas"}'));

    $q.all(promises).then(
      function(data) {
        $timeout(function(){
          self.activeTabIndex = 0;
          self.requesting = false;
        });
      },
      function(error){
      });
  };

   $scope.initTabs();


    /***************************** draggable list *****************************/
    $scope.editList = function(){
      $scope.edit = true;
    }

    $scope.cancelEdit = function(list){
      list.edit = false;
    }

    $scope.saveList = function(list){
    }


    $scope.getSelectedItemsIncluding = function(list, item) {
      item.selected = true;
      return list.items.filter(function(item) { return item.selected; });
    };


    $scope.onDragstart = function(list, event) {
       list.dragging = true;
       if (event.dataTransfer.setDragImage) {
         var img = new Image();
         img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
         event.dataTransfer.setDragImage(img, 0, 0);
       }
    };

    $scope.onDrop = function(list, items, index) {
      angular.forEach(items, function(item) { item.selected = false; });
      list.items = list.items.slice(0, index)
                  .concat(items)
                  .concat(list.items.slice(index));
      return true;
    }

    $scope.onMoved = function(list) {
      list.items = list.items.filter(function(item) { return !item.selected; });
    };

    /******************* edit list/show metadata ***********************/
    $scope.getAppMetadata = function(app){
      var query = '{"name":"'+ app.label +'"}';
      MetaController.listMetadata(query, 1, 0)
        .then(function(data){
          $scope.currentApp = data[0];
          var modalInstance = $uibModal.open({
              templateUrl: 'views/edit.html',
              scope: $scope,
              resolve: {
                currentApp: function(){
                  return $scope.currentApp;
                },
                app: function(){
                  return app;
                }
              },
              controller: [
                  '$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                      $scope.run = function() {
                          $uibModalInstance.close();
                      };
                      $scope.cancel = function() {
                          app.edit = false;
                          $uibModalInstance.dismiss();
                      };
                  }
              ]
          });
        })
        .catch(function(error){
        });
    }

    $scope.saveList = function(list){
      var simpleList = list;
      simpleList.content.selected = null;
      simpleList.content.lists = {};
      simpleList.content.lists['newlist'] = [];
      angular.forEach(list.multiple.lists[1].items, function(list){
        simpleList.content.lists['newlist'].push({label: list.label})
      });
      simpleList.edit = false;

    }
  }]);
