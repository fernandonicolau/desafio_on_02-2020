(function(angular){
  'user strict'

  angular
  .module('projetoBase')
  .factory('SrvObjetos', SrvObjetos);

  SrvObjetos.$inject = ['$api'];

  function SrvObjetos($api){

    var api = $api.base('api');

    return{
      get: _get,
      salvar: _salvar,
      atualizar: _atualizar,
      deletar: _deletar
    };

    function _get(catalog_id){
      return api.get('catalog/'+catalog_id);
    }

    function _salvar(entity){
      return api.post('catalog',entity);
    }

    function _atualizar(entity){
      return api.put('catalog',entity);
    }

    function _deletar(entity){
      return api.delete('catalog/'+entity.id);
    }

  };

})(window.angular);
