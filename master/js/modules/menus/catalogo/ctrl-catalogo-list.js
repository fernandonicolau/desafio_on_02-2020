(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoList', CtrlCatalogoList);

  CtrlCatalogoList.$inject = ['$state', 'GridCatalogoList', 'JSON_LISTA_OBJETOS'];

    function CtrlCatalogoList($state, GridCatalogoList, JSON_LISTA_OBJETOS) {
      var vm = this;

      var init = () =>{
        vm.gridOpts = GridCatalogoList.grid();

        // FIXME USAR API PARA CONSUMIR DADOS
        vm.gridOpts.data = JSON_LISTA_OBJETOS.objects;
      };
      init();


      vm.exibirGalaxia = (entity) =>{
        window.open(`#/app/views/catalogo/${entity.id}/exibir`, '_self');
      }

      vm.editarConteudo = (entity) =>{
        window.open(`#/app/views/catalogo/${entity.id}/editar`, '_self');
      }

    }
})(window.angular);
