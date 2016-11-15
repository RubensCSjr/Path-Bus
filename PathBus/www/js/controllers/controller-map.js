angular.module('starter.control',['starter'])
.value('LOCATION', {})
.value('UPDATE_TIME', 5000)
.value('UPDATE_LOCATION', true)
.controller('MapaCtrl',function(
  Geoloc,
  $scope,
  $ionicLoading,
  $ionicPlatform,
  $interval,
  LOCATION,
  UPDATE_TIME,
  UPDATE_LOCATION
){
    UPDATE_LOCATION = true;
    var configmap = false;
    var coords = {};
    // var speed = 31; //LOCATION.speed;
    var firstLoc = {};
    var lastLoc = {};
    var latlngspeed = {lat: coords.latitude, lng: coords.longitude, spd: coords.speed};

    var confMap = function(map){
    if(configmap === false){
      // console.log(configmap);
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
          'latLng': {lat: coords.latitude*3/4, lng: coords.longitude*3/4},
          'tilt': 0,
          'zoom': 1,
          'bearing': 0
        }
      });
        map.setPadding(2);
        map.setVisible(true);
        // console.log(map.setVisible);
        configmap = true;
        // console.info('linha 44: ', coords.latitude);
        $ionicLoading.hide();
        // console.log('linha46', coords.longitude);
        map.animateCamera({
          target: {lat: coords.latitude, lng: coords.longitude},
          zoom: 16,
          tilt: 10,
          bearing: 0,
          duration: 4000
        }, function(){
          // marcadores para o ôinbus
        })
        setTimeout(function () {
          map.getCameraPosition(function(camera) {
            var data = ["Current camera position:\n",
            "latitude:" + camera.target.lat,
            "longitude:" + camera.target.lng,
            "zoom:" + camera.zoom,
            "tilt:" + camera.tilt,
            "bearing:" + camera.bearing].join("\n");
            // console.warn(data);
          });
        }, 3000);
      }
    }
    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Localizando...'
      });

    $ionicPlatform.ready(function(){
      updateLocation()
      .then(function(actualLocation){
        var mapT = document.getElementById("map_canvas");
        var map = plugin.google.maps.Map.getMap(mapT);
        map.setVisible(false);
        map.addEventListener(plugin.google.maps.event.MAP_READY, confMap);
      })
      .catch(function (e) { console.error("Houve uma treta:", e.message)});
    });
    var updateLocation = updateLocation;
    function updateLocation() {
      return Geoloc.getLocal()
      .then(function(loc){
        LOCATION = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          spd: loc.coords.speed,
          tms: loc.timestamp
        };
        if (UPDATE_LOCATION) setTimeout(updateLocation, UPDATE_TIME);
        return LOCATION;
      })
      .catch(function(err){
        console.log(err);
      })
    }

    setInterval(function () {
        console.info('location:', JSON.stringify(LOCATION));
    }, 2000);

    // console.log('linha27', coords);
});
