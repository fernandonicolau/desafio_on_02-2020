App.config(['$ocLazyLoadProvider', 'APP_REQUIRES', '$locationProvider', function ($ocLazyLoadProvider, APP_REQUIRES, $locationProvider) {
    'use strict';

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    // $locationProvider.html5Mode(true);

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}])
.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
      prefix : 'app/i18n/',
      suffix : '.json'
  });
  $translateProvider.preferredLanguage('pt_BR');

}])
.config(['$httpProvider',
    function($httpProvider) {
      'use strict';
      $httpProvider.interceptors.push('httpInterceptor');
    }
])
.config(['growlProvider', function(growlProvider) {

  growlProvider.globalTimeToLive({ success: 3000, error: 5000, warning: 5000, info: 5000 });
  growlProvider.globalPosition('top-center');

}]).config(['$tooltipProvider', function ($tooltipProvider) {
    $tooltipProvider.options({appendToBody: true});
}]);
