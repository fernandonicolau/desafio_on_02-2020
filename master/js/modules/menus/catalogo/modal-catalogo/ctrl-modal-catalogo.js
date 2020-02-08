(function (angular) {
    'use strict';

angular
.module('projetoBase')
.controller('CtrlModalCatalogo', CtrlModalCatalogo);

CtrlModalCatalogo.$inject = ['$scope', 'growl', 'SrvCatalogo', '$modalInstance', 'Catalogo'];

function CtrlModalCatalogo($scope, growl, SrvCatalogo, $modalInstance, Catalogo) {

var vm = this;

vm.object = Catalogo;

vm.salvar = () => {
    vm.object.date = vm.getDateFormatada();
    SrvCatalogo.salvar(vm.object).then(function (result) {
        if (true) {
            growl.success("Catalogo criado com successo");
            $modalInstance.close();
        }
    });
}

vm.atualizar = () => {
    SrvCatalogo.atualizar(vm.object).then(function (result) {
        if (true) {
            growl.success("Catalogo atualizado com successo");
            $modalInstance.close();
        }
    });
}

vm.cancel = () => {
    $modalInstance.dismiss('cancel');
};

vm.getDateFormatada = () =>{
    var date = new Date();
    var dateFormatada = 
    date.getFullYear() + "-" +
    (date.getMonth() < 10 ? "0" : "") +
    date.getMonth() + "-" +
    (date.getDate() < 10 ? "0" : "") +
    date.getDate() + "T" +
    date.getHours() + ":" +
    date.getMinutes() + ":000000";
    return dateFormatada;
}

}
})(window.angular);