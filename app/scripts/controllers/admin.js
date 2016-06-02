'use strict';

angular.module('appsProtoApp')
  .controller('AdminCtrl', function ($scope) {
    // Search apps
    // AppsController.searchApps(99999, 0, 'name.like=opensees*')
    //   .then(function(data){
    //     console.log('data');
    //     console.log(data);
    //     console.log(data.length);
    //     angular.forEach(data, function(meta){
    //       // MetaController.listMetadataPermissions(meta.uuid, 99999, 0)
    //       //   .then(function(pem){
    //       //     console.log(meta.uuid);
    //       //     console.log(pem);
    //       //     console.log('\n');
    //       //   })
    //       //   .catch(function(){
    //       //     console.log(data);
    //       //   });
    //     });
    //
    //   })
    //   .catch(function(data){
    //
    //   });

    // Change permissions
    // MetaController.listMetadata('{"value.type": "apps-root"}', 99999, 0)
    //   .then(function(data){
    //       console.log(data);
    //       console.log(data.length);
    //       console.log();
    //       angular.forEach(data, function(meta){
    //         console.log(meta.uuid);
    //         var body = {
    //           "username": "world",
    //           "permission": "READ"
    //         }
    //
    //         MetaController.addMetadataPermission(body, meta.uuid)
    //           .then(
    //             function(data){
    //               console.log('success changing permissions');
    //               console.log(data);
    //
    //           })
    //           .catch(
    //             function(data){
    //               console.log('error');
    //               console.log(data);
    //           });
    //       });
    //   })
    //   .catch(function(data){
    //       console.log('error');
    //       console.log(data);
    //   });

    // Remove metadata
    // var query = '{"value.type":"apps-root"}';
    // var query = '{"value.type":"apps"}';
    // MetaController.listMetadata(query, 999999, 0)
    //   .then(function(data){
    //     console.log(data.length);
    //     angular.forEach(data, function(meta){
    //       console.log(meta.uuid);
    //       console.log(meta);
    //       MetaController.deleteMetadata(meta.uuid)
    //         .then(function(data){
    //           console.log('deleted metadata');
    //           console.log(data);
    //         })
    //         .catch(function(data){
    //           console.log('error deleting');
    //           console.log(data);
    //         });
    //     });
    //   });

    // Add apps-root
    // AppsController.searchApps(99999, 0, 'publicOnly.eq=true')
    //     .then(function(apps){
    //       console.log('publicOnly');
    //       console.log(apps);
    //       angular.forEach(apps, function(app){
    //         var apps_root_name = app.name.split('-',1)[0];
    //         MetaController.listMetadata('{"name":"'+ apps_root_name + '", "value.isPublic":'+app.isPublic+', "value.isPublic": true}', 99999, 0)
    //           .then(
    //             function(data){
    //               // console.log(data);
    //               // console.log(data.length);
    //               if (data.length === 0){
    //                 var metadata = {};
    //                 metadata.name = apps_root_name;
    //                 metadata.value = {};
    //                 metadata.value.name = apps_root_name;
    //                 metadata.value.type = 'apps-root';
    //                 metadata.value.isPublic = (app.isPublic) ? true : false;
    //
    //                 console.log('adding ' + metadata.name);
    //                 console.log(metadata);
    //                 MetaController.addMetadata(metadata)
    //                  .then(function(data){
    //                    console.log('success adding metadata');
    //                    console.log(data.uuid);
    //                  })
    //                  .catch(function(data){
    //                    console.log('error adding metadata');
    //                    console.log(data);
    //                  });
    //               } else {
    //                 console.log('it exists already');
    //                 console.log(data);
    //               }
    //           })
    //           .catch(
    //             function(data){
    //               console.log(data);
    //           });
    //         });
    //       });

    // Add apps-meta
    // AppsController.listApps(99999, 0)
    //     .then(function(apps){
    //       angular.forEach(apps, function(app){
    //         console.log('app');
    //         console.log(app);
    //         MetaController.listMetadata('{"name":"'+app.id+'"}', 99999, 0)
    //           .then(function(data){
    //
    //             if (data.length === 0){
    //               // console.log('this exists ');
    //               // console.log(app.id);
    //               var metadata = {};
    //               metadata.name = app.id;
    //               metadata.value = {};
    //               metadata.value.name = app.id;
    //               metadata.value.category = 'agave';
    //               metadata.value.type = 'apps';
    //               MetaController.addMetadata(metadata)
    //                .then(function(data){
    //                  console.log('success adding metadata');
    //                  console.log(data.uuid);
    //                })
    //                .catch(function(data){
    //                  console.log('error adding metadata');
    //                  console.log(data);
    //                });
    //             }
    //           })
    //           .catch(function(data){
    //             console.log(data);
    //           });
    //
    //       });
    //     })
    //     .catch(function(data){
    //       console.log(data);
    //     })

    // Add mylist
    // var metadata = {};
    // metadata.name = 'mylist';
    // metadata.value = {};
    // metadata.value.username = 'mrojas';
    // metadata.value.name = 'mylist';
    // metadata.value.type = 'apps-list';
    // metadata.value.apps = ['fork-runner3-0.1.0', 'ncbi-blast-2.2.30u3'];
    //
    // MetaController.addMetadata(metadata)
    //   .then(function(data){
    //     console.log('success');
    //     console.log(data);
    //   })
    //   .catch(function(data){
    //     console.log('error');
    //     console.log(data);
    //   });

    // Update metadata
    // var metadata = {};
    // metadata.name = "fork";
    // metadata.value = {};
    // metadata.value.name = "fork",
    // metadata.value.type = "apps-root";
    // metadata.value.isPublic = false;
    // MetaController.updateMetadata(metadata,'metadata_id')
    //   .then(function(data){
    //     console.log(data);
    //     console.log('update success');
    //   })
    //   .catch(function(data){
    //     console.log('update error');
    //   });

  });
