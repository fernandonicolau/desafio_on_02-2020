(function(angular){
  'user strict'

  angular
  .module('projetoBase')
  .factory('SrvCatalogo', SrvCatalogo);

  SrvCatalogo.$inject = ['$api'];

  function SrvCatalogo($api){

    var api = $api.base('api');

    return{
      get: _get,
      getLista: _getLista,
      salvar: _salvar,
      atualizar: _atualizar,
    };

    function _get(catalog_id){
      return api.get('catalog/'+catalog_id+'/catalog_objects');
    }

    function _getLista(){
      return api.get('catalog_objects');
    }

    function _salvar(entity){
      return api.post('catalog',entity);
    }

    function _atualizar(entity){
      return api.put('catalog',entity);
    }

  };

})(window.angular);
