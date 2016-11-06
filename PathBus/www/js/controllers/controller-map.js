angular.module('starter.control',['starter'])

.controller('MapaCtrl',function(
  Geoloc,
  $scope,
  $ionicLoading,
  $ionicPlatform){
    var configmap = false;
    var coords = {};
    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Localizando...'
      });

      $ionicPlatform.ready(function(){
        Geoloc.getLocal()
        .then(function(coor){
          coords = coor.coords;
          // console.log('linha18',coor);
          var mapT = document.getElementById("map_canvas");
          var map = plugin.google.maps.Map.getMap(mapT);
          map.setVisible(false);
          map.addEventListener(plugin.google.maps.event.MAP_READY, confMap);
        }, function(err){
          console.log(err);
        });
      });
      // console.log('linha27', coords);

    var confMap = function(map){
    if(configmap === false){
      map.setOptions({
        'backgroundColor': 'white',
        'mapType': plugin.google.maps.MapTypeId.ROADMAP,
        'controls': {
          'compass': false,
          'myLocationButton': true,
          'indoorPicker': false,
          'zoom': false // Only for Android
        },
        'gestures': {
          'scroll': true,
          'tilt': false,
          'rotate': false,
          'zoom': true
        },
        'camera': {
          'latLng': {lat: 0, lng: 0},
          'tilt': 0,
          'zoom': 1,
          'bearing': 0
        }
      });
        map.setPadding(2);
        map.setVisible(true);
        configmap = true;
        // console.info('linha 56: ', coords.latitude);
        $ionicLoading.hide();
        // console.log('linha58', coords.latitude);
        map.animateCamera({
          target: {lat: coords.latitude, lng: coords.longitude},
          zoom: 16,
          tilt: 10,
          bearing: 0,
          duration: 1000
        }, function(){
          // marcadores para o ôinbus
        })
      }
    }
});
