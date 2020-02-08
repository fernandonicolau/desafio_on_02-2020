(function(angular){
  'user strict'

  angular
  .module('projetoBase')
  .factory('SrvCatalogo', SrvCatalogo);

  SrvCatalogo.$inject = ['$api'];

  function SrvCatalogo($api){

    var api = $api.base('api');

    return{
      getLista: _getLista,
      getListaObjetcs: _getListaObjetcs,
      salvar: _salvar,
      atualizar: _atualizar,
      deletar: _deletar
    };

    function _getLista(){
      return api.get('catalog');
    }

    function _getListaObjetcs(id_catalog){
      return api.get('catalog/'+id_catalog+'/catalog_objects');
    }

    
    function _salvar(entity){
      return api.post('catalog',entity);
    }

    function _atualizar(entity){
      return api.put('catalog/'+entity.id ,entity);
    }

    function _deletar(entity){
      return api.delete('catalog/'+entity.id);
    }


  };

})(window.angular);
