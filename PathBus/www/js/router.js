angular.module('starter.rout',[])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home',{
      url:'/home',
      templateUrl:'templates/home.html',
      controller:'MapaCtrl',
      cache: false,
      // onExit: function (UPDATE_LOCATION) {
      //   clearTimeUPDATE_LOCATION = false;
      // }
    })
    .state('criarConta',{
      url:'/criarConta',
      templateUrl:'templates/criarConta.html',
      controller:''
    })
    .state('definicoes',{
      url:'/definicoes',
      templateUrl:'templates/definicoes.html',
      controller:''
    })
    .state('listaOnibus',{
      url:'/listaOnibus',
      templateUrl:'templates/listaOnibus.html',
      controller:'ListarBusCtrl'
    })
    .state('login',{
      url:'/login',
      templateUrl:'templates/login.html',
      controller:''
    })
    .state('recuperar',{
      url:'/recuperar',
      templateUrl:'templates/recuperar.html',
      controller:''
    })
});
