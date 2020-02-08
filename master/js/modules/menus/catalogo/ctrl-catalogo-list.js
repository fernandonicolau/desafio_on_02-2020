(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoList', CtrlCatalogoList);

  CtrlCatalogoList.$inject = ['$state', 'GridCatalogoList', 'SrvCatalogo', 
  '$modal', 'ngDialog'];

    function CtrlCatalogoList($state, GridCatalogoList, SrvCatalogo, 
      $modal, ngDialog) {
      var vm = this;

      var init = () =>{
        vm.gridOpts = GridCatalogoList.grid();
        SrvCatalogo.getLista().then(function(result){
          vm.gridOpts.data = result.objects;
        });
      };
      init();

      vm.exibirCatalogo = (entity) =>{
        window.open(`#/app/views/catalogo/${entity.id}/exibir`, '_self');
      }    

      vm.novoCatalogo = (Catalogo) => {
        vm.modalCatalogo(Catalogo);
      }

      vm.editarCatalogo = (Catalogo) => {
        vm.modalCatalogo(Catalogo);
      }

      vm.modalCatalogo = function(catalogo){
        var modalInstance = $modal.open({
          templateUrl: 'app/views/catalogo/modal-catalogo.html',
          controller: 'CtrlModalCatalogo as vm',
          size: 'md',
          resolve: {
            Catalogo: function() {
              return angular.copy(catalogo);
            }
          }
        });
        modalInstance.result.then(function(data) {
          vm.gridOpts.data = [];
          init();
        });
      };

      vm.excluirCatalogo = (catalogo) => {
        ngDialog.openConfirm({
          template: 'excluir-catalogo.html',
          className: 'ngdialog-theme-default custom-width-700'
      }).then(function (value) {
        SrvCatalogo.deletar(catalogo).then(function (result) {
            init();
        });
      }, function (reason) {
        
      });
      }
      

    }
})(window.angular);
