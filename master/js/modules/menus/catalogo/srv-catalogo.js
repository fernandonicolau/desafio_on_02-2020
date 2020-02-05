(function(angular){
  'user strict'

  angular
  .module('projetoBase')
  .factory('SrvCatalogo', SrvCatalogo);

  SrvCatalogo.$inject = [ '$api'];

  function SrvCatalogo($api){

    var api = $api.base('api/catalog');

    return{
      get: _get,
    };

    function _get(){
      return api.get('');
    }

  };

})(window.angular);
