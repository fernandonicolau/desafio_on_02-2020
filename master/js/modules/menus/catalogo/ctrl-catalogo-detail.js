
(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoDetail', CtrlCatalogoDetail);

    CtrlCatalogoDetail.$inject = ['$scope', '$state', '$stateParams', 'GridObjetos',
    'growl', 'SrvCatalogo', 'SrvObjetos', 'ngDialog', 'SrvAladin', '$modal'];

  function CtrlCatalogoDetail($scope, $state, $stateParams, GridObjetos,
    growl, SrvCatalogo, SrvObjetos, ngDialog, SrvAladin, $modal) {

    var vm = this;
    vm.gridOpts = GridObjetos.grid();

    var init = () => {
      SrvObjetos.get($stateParams.objectId).then(function(result){
        if (result) {
          vm.object = result;
          SrvCatalogo.getListaObjetcs(vm.object.id).then(function(result){
            vm.gridOpts.data = result.objects;
          });
        }
      });
    };
    init();

    vm.editarObjeto = (objeto) => {
      vm.modalObjetos(objeto);
    }

    vm.exibirObjeto = (objeto) => {
      vm.modalObjetos(objeto);
    }
    
    vm.modalObjetos = function(objetoCatalogo){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/objetos/modal-objeto.html',
        controller: 'CtrlModalObjetos as vm',
        size: 'md',
        resolve: {
          objetoCatalogo: function() {
            return angular.copy(objetoCatalogo);
          }
        }
      });
      modalInstance.result.then(function(data) {
        vm.gridOpts.data = [];
        init();
      });
    };

    vm.abrirAladin = (entity) => {
      SrvAladin.abrirSkyMapAladin(entity);
    }

    vm.deletarObjeto = (objetoCatalogo) => {
      ngDialog.openConfirm({
          template: 'excluir-objetoCatalogo.html',
          className: 'ngdialog-theme-default custom-width-700'
      }).then(function (value) {
        SrvObjetos.deletar(objetoCatalogo).then(function (result) {
            init();
        });
      }, function (reason) {
        
      });
  }

    vm.voltar = () => {
      $state.go('app.catalogo.list');
    }

  }

})(window.angular);
