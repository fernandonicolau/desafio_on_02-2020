App.config(['$stateProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  // $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('app/home');

  //
  // Application Routes
  // -----------------------------------
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('modernizr', 'icons')
    })
    .state('app.home', {
        url: '/home',
        title: 'Página inicial',
        controller: 'AppController',
        templateUrl: 'app/views/partials/home.html',
        authenticate: true
    })
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    });


}]);
