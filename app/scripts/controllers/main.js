'use strict';

angular.module('appsProtoApp').controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$uibModal', 'config', 'AppsController', 'MetaController', 'ProfilesController', 'SimpleList', 'MultipleList', function ($scope, $rootScope, $timeout, $q, $uibModal, config, AppsController, MetaController, ProfilesController, SimpleList, MultipleList) {

  /***************************** tabs *****************************/
   $scope.config = config;
   $scope.activeTabIndex = 0
   $scope.tabs = [];

  $scope.editTab = function(tab){
    if (typeof tab.multiple === 'undefined'){
      var self = this;
      var deferred = $q.defer();
      var appList = new SimpleList();
      var promises = [];

     // Get MultipleList
      var appMultipleList = new MultipleList();
      var query = '{"value.type": "apps"}';

      MetaController.listMetadata(query, 99999, 0)
        .then(function(metaList){
          var apps = [];
          var myapps = [];

          angular.forEach(metaList, function(app){
            apps.push(app.name);
          });

          promises.push(appMultipleList.addList('apps', apps));

          angular.forEach(tab.content.lists[tab.title], function(myapp){
            myapps.push(myapp.label);
          });

          promises.push(appMultipleList.addList(tab.title, myapps));

          $q.all(promises).then(
            function(data) {
              tab.content = {};
              tab.multiple = appMultipleList;
              tab.original = appMultipleList.lists[1];
              tab.edit = true;
            },
            function(error){
            });
          deferred.resolve(self);
        })
        .catch(function(error){
          deferred.reject(error);
        });

        return deferred.promise;
    }

  };

  $scope.addTab = function(){
    var self = this;
    var deferred = $q.defer();
    var appList = new SimpleList();
    var title = 'clickme';
    var promises = [];
    var appMultipleList = new MultipleList();
    var query = '{"value.type": "apps"}';

    MetaController.listMetadata(query, 99999, 0)
      .then(function(metaList){
        var apps = [];
        var myapps = [];

        angular.forEach(metaList, function(app){
          apps.push(app.name);
        });

        // Add all apps list and empty list
        promises.push(appMultipleList.addList('apps', apps));
        promises.push(appMultipleList.addList(title));

        $q.all(promises).then(
          function(data) {
            $scope.tabs.push({
              title: title,
              content: {},
              edit: true,
              multiple: appMultipleList,
              original: appMultipleList.lists[1]
            })
            $timeout(function(){
              $scope.activeTabIndex = ($scope.tabs.length - 1);
            });
          },
          function(error){
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
      var simpleList = new SimpleList();

      simpleList.getListByQuery(query, title)
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

        query = '{"value.type": "apps-list", "value.username": "mrojas"}';

        MetaController.listMetadata(query, 99999, 0)
          .then(function(metaList){
              // get list of apps in each list metadata
              angular.forEach(metaList, function(list){
                var appList = new SimpleList();
                $scope.tabs.push({
                  title: list.value.name,
                  content: appList.addList(list.value.name, list.value.apps)
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

      ProfilesController.getProfile()
        .then(function(data){
          $scope.username = data.username;

          promises.push($scope.addDefaultTab('{"value.type": "apps-root", "value.isPublic": false}', 'private'));
          promises.push($scope.addDefaultTab('{"value.type": "apps-root", "value.isPublic": true}', 'public'));
          promises.push($scope.addUserTabs('{"value.type": "apps-list", "value.username": "'+$scope.username+'"}'));

            $q.all(promises).then(
              function(data) {
                $timeout(function(){
                  self.activeTabIndex = 0;
                  self.requesting = false;
                });
              },
              function(error){
              });
        })
        .catch(function(data){
        });
    };

    $scope.saveTab = function(tab, list){
      var query = '{"value.name":"'+tab.title+'","value.type": "apps-list"}';
      MetaController.listMetadata(query, 99999, 0)
        .then(function(data){
          var metadata = {};
          if (data.length === 0){
            metadata.name = list.listName;
            metadata.value = {};
            metadata.value.name = list.listName;
            metadata.value.username = $scope.username;
            metadata.value.type = 'apps-list';
            metadata.value.apps = [];
            angular.forEach(list.items, function(item){
              metadata.value.apps.push(item.label);
            });

            MetaController.addMetadata(metadata)
              .then(function(data){
                var simpleList = tab;
                simpleList.content.selected = null;
                simpleList.content.lists = {};
                simpleList.content.lists[list.listName] = [];
                angular.forEach(tab.multiple.lists[1].items, function(item){
                  simpleList.content.lists[list.listName].push({label: item.label})
                });
                simpleList.title = list.listName;
                simpleList.edit = false;
              })
              .catch(function(data){
              });
            //   var body = {};
          } else {
            // update metadata record
            metadata.name = list.listName;
            metadata.value = {};
            metadata.value.name = list.listName;
            metadata.value.username = $scope.username;
            metadata.value.type = 'apps-list';
            metadata.value.apps = [];
            angular.forEach(list.items, function(item){
              metadata.value.apps.push(item.label);
            });

            MetaController.updateMetadata(metadata, data[0].uuid)
              .then(function(data){
                var simpleList = tab;
                simpleList.content.selected = null;
                simpleList.content.lists = {};
                simpleList.content.lists[list.listName] = [];
                angular.forEach(tab.multiple.lists[1].items, function(item){
                  simpleList.content.lists[list.listName].push({label: item.label})
                });
                simpleList.title = list.listName;
                simpleList.edit = false;
              })
              .catch(function(data){
              })

          }
        })
        .catch(function(data){
        });
    };

    $scope.cancelTab = function(tab, list){
      var simpleList = tab;
      simpleList.content.selected = null;
      simpleList.content.lists = {};
      simpleList.content.lists[tab.title] = [];
      angular.forEach(tab.original.items, function(item){
        simpleList.content.lists[tab.title].push({label: item.label})
      });
      simpleList.edit = false;
    }

   $scope.initTabs();


    /***************************** draggable list *****************************/

    $scope.getSelectedItemsIncluding = function(list, item) {
      item.selected = true;
      return list.items.filter(function(item) { return item.selected; });
    };


    $scope.onDragstart = function(list, event) {
       list.dragging = true;
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

    /*********************** metadata modal ***********************/
    $scope.getAppMetadata = function(app){
      var query = '';

      if (app.label.indexOf('-') !== -1){
        query = 'id.eq='+app.label;
      } else {
        query = 'id.like='+app.label+'-*';
      }

      AppsController.searchApps(99999, 0, query)
        .then(function(data){
          $scope.apps = data;
          var modalInstance = $uibModal.open({
              templateUrl: 'views/modal.html',
              scope: $scope,
              size: 'lg',
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
                      $scope.showDetails = false;

                      $scope.run = function(appId) {
                        var query = '{"value.name":"'+appId+'","value.type": "apps"}';

                        MetaController.listMetadata(query, 99999, 0)
                          .then(function(data){
                            $rootScope.workspaceInput = data[0];
                            $uibModalInstance.dismiss();
                          })
                          .catch(function(data){
                          });
                      };

                      $scope.cancel = function() {
                          app.edit = false;
                          $uibModalInstance.dismiss();
                      };
                  }
              ]
            });
        })
        .catch(function(data){
        });
    }
  }]);
