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
    var t = 0, t_anterior = 0, t_atual = 0;
    var lat_anterior = 0, lng_anterior = 0;
    var lat_atual = 0, lng_atual = 0;
    var lat_A = 0; lng_A = 0;
    var lat_B = 0; lng_B = 0;
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
          tms: loc.timestamp,
          vel: 0
        };
          setTimeout(updateLocation, UPDATE_TIME);
        return LOCATION;
      })
      .catch(function(err){
        console.log(err);
      })
    }
    // if(LOCATION.spd > 25){
    if(26 > 25){
      var INTERVAL =  setInterval(function () {
          // console.info('linha 110', 'location:', JSON.stringify(LOCATION));
          lat_atual = LOCATION.lat; lng_atual = LOCATION.lng; t_atual = LOCATION.tms;
          // console.log('linha 116 lat_atual', lat_atual, 'lng_atual', lng_atual);
          //Encontrando a distância percorrida entre um ponto e outro!
          lat_B = Math.abs(Math.round(lat_anterior) - Math.round(lat_atual));
          lng_B = Math.abs(Math.round(lng_anterior) - Math.round(lng_atual));
          // console.log('linha 119', 'lat_B =', lat_B, 'lng_B =', lng_B);
          if((lat_A != lat_B && lat_A != 0) || (lng_A != lng_B && lat_B != 0)){
            t = Math.round(t_atual - t_anterior);
            var s = lat_B + lng_B;
            LOCATION.vel = s/t;
            // enviar(ITERVAL);
            console.log('linha 122','MUDOU DE LOCAL, O LOCAL ATUAL FOI ENVIADO', LOCATION);
              lat_A = lat_B; lng_A = lng_B;
          };
          // console.log('linha 125','NÃO HOUVE MUDANÇA NA POSIÇÃO!!!');
          lat_anterior = lat_atual; lng_anterior = lng_atual; t_anterior = t_atual;
        }, 5000);
    } else {
      clearInterval(INTERVAL)
    }

    // console.log('linha27', coords);
});
