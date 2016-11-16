angular.module('starter.control',['starter'])
.value('LOCATION', {})
.value('UPDATE_TIME', 5000)
// .value('UPDATE_LOCATION', true)
.controller('MapaCtrl',function(
  Geoloc,
  $scope,
  $ionicLoading,
  $ionicPlatform,
  LOCATION,
  UPDATE_TIME
  // UPDATE_LOCATION
){
    // UPDATE_LOCATION = true;
    var configmap = false;
    var coords = {};
    var lat_a = {}, lng_a = {};
    var lat_b = {}, lng_b = {};
    var lat_A = {}; lng_A = {};
    var lat_B = {}; lng_B = {};
    // var speed = 31; //LOCATION.speed;
    // var firstLoc = {};
    // var lastLoc = {};
    // var latlngspeed = {lat: coords.latitude, lng: coords.longitude, spd: coords.speed};

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
          'latLng': {lat: LOCATION.lat*3/4, lng: LOCATION.lng*3/4},
          'tilt': 0,
          'zoom': 1,
          'bearing': 0
        }
      });
        map.setPadding(2);
        map.setVisible(true);
        // console.log(map.setVisible);
        configmap = true;
        // console.info('linha 44: ', LOCATION.lat);
        $ionicLoading.hide();
        // console.log('linha46', LOCATION.lng);
        map.animateCamera({
          target: {lat: LOCATION.lat, lng: LOCATION.lng},
          zoom: 16,
          tilt: 10,
          bearing: 0,
          duration: 4000
        }, function(){
          // marcadores para o ôinbus
        })
        // setTimeout(function () {
        //   map.getCameraPosition(function(camera) {
        //     var data = ["Current camera position:\n",
        //     "latitude:" + camera.target.lat,
        //     "longitude:" + camera.target.lng,
        //     "zoom:" + camera.zoom,
        //     "tilt:" + camera.tilt,
        //     "bearing:" + camera.bearing].join("\n");
        //     // console.warn(data);
        //   });
        // }, 3000);
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
          setTimeout(updateLocation, UPDATE_TIME);
        return LOCATION;
      })
      .catch(function(err){
        console.log(err);
      })
    }
    if(LOCATION.spd > 25){
    // if(26 > 25){
      var INTERVAL =  setInterval(function () {
          // console.info('linha 110', 'location:', JSON.stringify(LOCATION));
          // lng_a = {};
          // lat_a = {};
          lat_b = LOCATION.lat;
          lng_b = LOCATION.lng;
          // console.log('linha 119 lat_b', lat_b);
          lat_B = Math.abs(Math.round(lat_a) - Math.round(lat_b));
          lng_B = Math.abs(Math.round(lng_a) - Math.round(lng_b));
          // console.log('linha 123 lat_B', lat_B);
          // console.log('linha 124 lng_B', lng_B);
          if(lat_A != lat_B || lng_A != lng_B){
            // envuar(ITERVAL);
            console.log('linha 127','MUDOU DE LOCAL, O LOCAL ATUAL FOI ENVIADO', LOCATION);
              lat_A = lat_B; lng_A = lng_B;
          };
          console.log('linha 129','NÃO HOUVE MUDANÇA NA POSIÇÃO!!!');
          lat_a = lat_b; lng_a = lng_b;
        }, 5000);
    } else {
      clearInterval(INTERVAL)
    }

    // console.log('linha27', coords);
});
