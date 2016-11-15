angular.module('starter.busCtrl',[])

.controller('ListarBusCtrl', function($scope, ListaService){
  $scope.lisBus = [];
  $scope.lisProd =[];
  ListaService.pegarLista().then(function(response){
    $scope.lisBus = response.data;
    console.log(response.data);
  }).catch(function(response){
    console.log(response.error);
  })
});
