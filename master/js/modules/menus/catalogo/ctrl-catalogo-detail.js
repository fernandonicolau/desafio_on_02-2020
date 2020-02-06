
(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoDetail', CtrlCatalogoDetail);

    CtrlCatalogoDetail.$inject = ['$scope', '$state', '$stateParams', 
    'growl', 'SrvCatalogo', 'JSON_LISTA_OBJETOS'];

  function CtrlCatalogoDetail($scope, $state, $stateParams, 
    growl, SrvCatalogo, JSON_LISTA_OBJETOS) {

    var vm = this;
    vm.screenMode = $state.current.screenMode;
    vm.listaTipoCatalogo = [{
      id: 1,
      name: 'Galaxies'
    }];
    
    // FIMEX USAR API PARA CONSUMIR DADOS
    if (vm.screenMode !== 'NEW') {
      console.log($state.current.screenMode);
      console.log($stateParams.objectId-1);    
      vm.object = JSON_LISTA_OBJETOS.objects[$stateParams.objectId-1];
  
  
      SrvCatalogo.get($stateParams.objectId).then(function(result){
        if (true) {
          vm.object = data;
        }
      });
    }
    
    vm.salvar = () => {
      SrvCatalogo.getLista(vm.object).then(function(result){
        if (true) {
          growl.sucess("Catalogo criado com sucesso");
        }
      });
    }

    vm.atualizar = () => {
      SrvCatalogo.getLista(vm.object).then(function(result){
        if (true) {
          growl.sucess("Catalogo atualizado com sucesso");
        }
      });
    }

    vm.voltar = () => {
      $state.go('app.catalogo.list');
    }

  }

})(window.angular);
