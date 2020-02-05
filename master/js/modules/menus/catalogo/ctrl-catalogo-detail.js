
(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoDetail', CtrlCatalogoDetail);

    CtrlCatalogoDetail.$inject = ['$scope', '$state', '$stateParams', 'JSON_LISTA_OBJETOS'];

  function CtrlCatalogoDetail($scope, $state, $stateParams, JSON_LISTA_OBJETOS) {

    var vm = this;
    $scope.A = {};
    
    // FIMEX USAR API PARA CONSUMIR DADOS
    console.log($state.current.screenMode);
    console.log($stateParams.objectId-1);    
    vm.object = JSON_LISTA_OBJETOS.objects[$stateParams.objectId-1];
    
    vm.voltar = () => {
      $state.go('app.catalogo.list');
    }

    vm.exibirImagemAladin = () => {
      let outHtml = '<link rel="stylesheet" href="https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css" />'+
      '<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.min.js" charset="utf-8"></script>'+
      '<div id="aladin-lite-div" style="width:700px;height:400px;"></div>'+
      '<script type="text/javascript" src="https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>'+
      '<script type="text/javascript">'+
      '    var aladin = A.aladin("#aladin-lite-div",'+
      '       {fov: 1.5, reticleSize: 64 }'+
      '    );'+
      '    aladin.gotoRaDec('+vm.object.ra+', '+vm.object.dec+');'+
      '</script>';       
        var myWindow = window.open("", "MsgWindow", "width=700,height=400");
        myWindow.document.write(outHtml);
    }

    //  var aladin = A.aladin('#aladin-lite-div');

  }

})(window.angular);
