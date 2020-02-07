(function (angular) {
        'use strict';

angular
    .module('projetoBase')
    .controller('CtrlModalObjetos', CtrlModalObjetos);

CtrlModalObjetos.$inject = ['$scope', 'growl', 'SrvCatalogo', 'SrvObjetos', '$modalInstance', 'objetoCatalogo'];

function CtrlModalObjetos($scope, growl, SrvCatalogo, SrvObjetos, $modalInstance, objetoCatalogo) {
    
    var vm = this;

    vm.object = objetoCatalogo;

    vm.salvar = () => {
        SrvObjetos.salvar(vm.object).then(function (result) {
            if (true) {
                growl.success("Catalogo criado com successo");
            }
        });
    }

    vm.atualizar = () => {
        SrvObjetos.atualizar(vm.object).then(function (result) {
            if (true) {
                growl.success("Catalogo atualizado com successo");
            }
        });
    }

    vm.cancel = () => {
        $modalInstance.dismiss('cancel');
    };

}
})(window.angular);