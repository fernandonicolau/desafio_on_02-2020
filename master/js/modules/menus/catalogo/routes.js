App.config(['$stateProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $urlRouterProvider, RouteHelpersProvider) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  // $locationProvider.html5Mode(true);

  // default route
  $urlRouterProvider.otherwise('app/home');
  var moduleUrl = '/app/views/catalogo';
  //
  // Application Routes
  // -----------------------------------
  $stateProvider
  // .state('app.catalogo',{
  //   title: 'Catalogo',
  //   url:'/catalogo',
  //   templateUrl: 'app/views/catalogo/catalogo-list.html',
  // })  
  .state('app.catalogo', {
      abstract: true,
      url: '/views/catalogo',
      template: '<div ui-view></div>',
      resolve: RouteHelpersProvider.resolveFor('ngWYSIWYG', 'textAngular',
      'ui.select', 'ngDialog', 'ui.grid.autoResize',
      'ui.grid.resizeColumns', 'ui.grid.moveColumns',
      'ui.grid.pagination', 'ui.grid.exporter')
  })
  .state('app.catalogo.list', {
      title: 'Catalogo',
      url: '/listar',
      templateUrl: `${moduleUrl}/list.html`,
      controller: 'CtrlCatalogoList as vm'
  })
  .state('app.catalogo.new', {
      url: '/novo',
      templateUrl: `${moduleUrl}/catalogo.html`,
      controller: 'CtrlCatalogoDetail as vm'
  })
  .state('app.catalogo.view', {
      url: '/:objectId/exibir',
      templateUrl: `${moduleUrl}/catalogo.html`,
      controller: 'CtrlCatalogoDetail as vm',
      screenMode: 'VIEW'
  })
  .state('app.catalogo.edit', {
      url: '/:objectId/editar',
      templateUrl: `${moduleUrl}/catalogo.html`,
      controller: 'CtrlCatalogoDetail as vm',
      screenMode: 'EDIT'
  })




}]);
