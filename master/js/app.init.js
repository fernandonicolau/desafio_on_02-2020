var App = angular.module('projetoBase', [
  'ngRoute',
  'ngAnimate',
  'ngStorage',
  'ngCookies',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ui.bootstrap',
  'ui.router',
  'oc.lazyLoad',
  'ngSanitize',
  'ngResource',
  'ui.utils',
  'angular-growl',
  'angular.filter',
  'angularSpinner'
]);

App.run(["$rootScope", "$state", "$stateParams", '$window', 'URL_API',
  function ($rootScope, $state, $stateParams, $window, URL_API) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        
      if ($rootScope.menuItems == null) {
        $state.menuItems = [];
        $state.menuItems.push({
          text: "Principal",
          heading: true
        });
        $state.menuItems.push({
          id: "catalogo-1",
          text: "Catalogo",
          sref: "app.catalogo.list",
          icon: "fa fa-list",
          label: "label label-info"
        });
        $rootScope.menuItems = $state.menuItems;
      }

    });
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;


    $rootScope.app = {
      name: 'PROJETO - BASE',
      description: 'Base de projeto em angular js',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: true
      },
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };

  }
]);