(function (angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$window', '$scope', '$rootScope',
  '$stateParams', 'URL_API'];

  function IndexController($window, $scope, $rootScope,
    $stateParams, URL_API) {

    var vm = this;
    var init = function(){
      $state.go('app.home');
    };
    init();

    if ($rootScope.menuItems == null) {
      $scope.loadSidebarMenu = function() {
        $state.menuItems = [];
        $state.menuItems.push({
          text: "Principal",
          heading: true
        });
        $rootScope.menuItems = $state.menuItems;
     };
    }
    
  }

})(window.angular);
