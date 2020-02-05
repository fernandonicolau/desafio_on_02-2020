'use strict';

angular.module('projetoBase')
  .factory('httpInterceptor', function ($window, $q, $rootScope,
    URL_API, growl, usSpinnerService) {

    function _unsetUser(){
      $rootScope.auth = false;
      $rootScope.currentUser = null;
    }

    return {

      request: function(config) {
        config.headers = config.headers || {};
        usSpinnerService.spin('spinner-1');

        return config || $q.when(config)
      },

      response: function(response) {

        if (response.data !== null) {
          if (response.data.type !== null) {
            switch (response.data.type) {
              case "SUCCESS":
                if(response.data.messages !== null){
                  response.data.messages.forEach(function(value) {
                    growl.success(value);
                  });
                }
                break;
              case "INFORMATION":
                response.data.messages.forEach(function(value) {
                  growl.warning(value);
                });
                break;
              case "CONFIRMATION":
                break;
              default:
            }
          }
        }

        usSpinnerService.stop('spinner-1');
        return response || $q.when(response);
      },
      responseError: function(response) {
        if (response.data !== null) {
          if (response.data.type !== null) {
            switch (response.data.type) {
              case "SERVER_ERROR":
                response.data.messages.forEach(function(value) {
                  growl.error(value);
                });
                _unsetUser();
                break;
              case "UNAUTHORIZED":
                response.data.messages.forEach(function(value) {
                  growl.error(value);
                });
                _unsetUser();
                break;
              case "FORBIDDEN":
                response.data.messages.forEach(function(value) {
                  growl.error(value);
                });
                _unsetUser();
                break;
              case "ERROR":
                response.data.messages.forEach(function(value) {
                  growl.error(value);
                });
                break;
              default:
            }
          }else{
            growl.error("Ocorreu um erro imprevisto. A equipe de Desenvolvimento já está verificando.");
          }
        }

        usSpinnerService.stop('spinner-1');
        return $q.reject(response);
      }
    };
  });
