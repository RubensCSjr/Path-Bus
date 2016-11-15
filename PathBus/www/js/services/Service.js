angular.module('starter.service',['ngCordova'])

.factory('Geoloc', function($ionicPlatform, $cordovaGeolocation){
  var posOpt = {timeout:10000, enableHighAccurayc: true, maximumage:0}
  return{
     getLocal: function(){
      return $ionicPlatform.ready().then(function(){
        return $cordovaGeolocation.getCurrentPosition(posOpt)
      })
    }
  }
})

.factory('ListaService', function($http){
  var url = '';
  var getLista = function(){
    return $http.get('https://pathbus.herokuapp.com/linha');
  };
  var saveLisBus = function(onibus){
    return $http.post("", onibus);
  }
  return {
    pegarLista : getLista,
    salvarBus: saveLisBus,
  };
})
