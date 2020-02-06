(function(angular){
    'user strict'
  
    angular
    .module('projetoBase')
    .factory('SrvAladin', SrvAladin);
    
    function SrvAladin(){
    
      return{
        abrirSkyMapAladin: _abrirSkyMapAladin,
      };
  
      function _abrirSkyMapAladin(posicao){
            let outHtml = '<link rel="stylesheet" href="https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css" />'+
            '<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.min.js" charset="utf-8"></script>'+
            '<div id="aladin-lite-div" style="width:700px;height:400px;"></div>'+
            '<script type="text/javascript" src="https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>'+
            '<script type="text/javascript">'+
            '    var aladin = A.aladin("#aladin-lite-div",'+
            '       {fov: 1.5, reticleSize: 64 }'+
            '    );'+
            '    aladin.gotoRaDec('+posicao.ra+', '+posicao.dec+');'+
            '</script>';       
              var myWindow = window.open("", "MsgWindow", "width=700,height=400");
              myWindow.document.write(outHtml);
      }
  
    };
  
  })(window.angular);
  