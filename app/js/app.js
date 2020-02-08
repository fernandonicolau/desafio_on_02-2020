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


App
  .constant('APP_COLORS', {
    'primary': '#5d9cec',
    'success': '#27c24c',
    'info': '#23b7e5',
    'warning': '#ff902b',
    'danger': '#f05050',
    'inverse': '#131e26',
    'green': '#37bc9b',
    'pink': '#f532e5',
    'purple': '#7266ba',
    'dark': '#3a3f51',
    'yellow': '#fad732',
    'gray-darker': '#232735',
    'gray-dark': '#3a3f51',
    'gray': '#dde6e9',
    'gray-light': '#e4eaec',
    'gray-lighter': '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'whirl':              ['vendor/whirl/dist/whirl.css'],
      'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
      'animo':              ['vendor/animo.js/animo.js'],
      'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'animate':            ['vendor/animate.css/animate.min.css'],
      'icons':              ['vendor/skycons/skycons.js',
                             'vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css',
                             'vendor/weather-icons/css/weather-icons.min.css'],
      'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                             'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
      'flot-chart':         ['vendor/Flot/jquery.flot.js'],
      'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                             'vendor/Flot/jquery.flot.resize.js',
                             'vendor/Flot/jquery.flot.pie.js',
                             'vendor/Flot/jquery.flot.time.js',
                             'vendor/Flot/jquery.flot.categories.js',
                             'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                            // jquery core and widgets
      'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                             'vendor/jquery-ui/ui/widget.js'],
                             // loads only jquery required modules and touch support
      'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                             'vendor/jquery-ui/ui/widget.js',
                             'vendor/jquery-ui/ui/mouse.js',
                             'vendor/jquery-ui/ui/draggable.js',
                             'vendor/jquery-ui/ui/droppable.js',
                             'vendor/jquery-ui/ui/sortable.js',
                             'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
      'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
      'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
      // modes for common web files
      'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                             'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
      'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      'parsley':            ['vendor/parsleyjs/dist/parsley.min.js'],
      'datatables':         ['vendor/datatables/media/js/jquery.dataTables.min.js',
                             'vendor/datatable-bootstrap/css/dataTables.bootstrap.css'],
      'datatables-pugins':  ['vendor/datatable-bootstrap/js/dataTables.bootstrap.js',
                             'vendor/datatable-bootstrap/js/dataTables.bootstrapPagination.js',
                             'vendor/datatables-colvis/js/dataTables.colVis.js',
                             'vendor/datatables-colvis/css/dataTables.colVis.css'],
      'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                             'vendor/fullcalendar/dist/fullcalendar.css'],
      'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
      'ui.calendar':        ['vendor/angular-ui-calendar/src/calendar.js'],
      'nestable':           ['vendor/nestable/jquery.nestable.js'],
      'chart.js':           ['vendor/Chart.js/Chart.js'],
      'FusionCharts':       ['vendor/fusioncharts/js/fusioncharts.js'],
      'FusionTheme':        ['vendor/fusioncharts/js/themes/fusioncharts.theme.fusion.js'],
      'morris':             ['vendor/raphael/raphael.js',
                             'vendor/morris.js/morris.js',
                             'vendor/morris.js/morris.css'],
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js',
                                                  'vendor/ngWig/dist/css/ng-wig.css' ]},
      {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                 'vendor/angularjs-toaster/toaster.css']},
      {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                  'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
      {name: 'htmlSortable',              files: ['vendor/html.sortable/dist/html.sortable.js',
                                                 'vendor/html.sortable/dist/html.sortable.angular.js']},
      {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                                 'vendor/chosen_v1.2.0/chosen.min.css',
                                                 'vendor/angular-chosen-localytics/chosen.js']},
      {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                 'vendor/ngDialog/css/ngDialog.min.css',
                                                 'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
      {name: 'textAngular',               files: ['vendor/textAngular/dist/textAngular.css',
                                                  'vendor/textAngular/dist/textAngular-rangy.min.js',
                                                  'vendor/textAngular/dist/textAngular-sanitize.min.js',
                                                  'vendor/textAngular/dist/textAngular.min.js']},
      {name: 'ngWYSIWYG',                 files: ['vendor/ngWYSIWYG/dist/editor.min.css',
                                                  'vendor/ngWYSIWYG/dist/wysiwyg.min.js']},
      {name: 'angular.filter',            files: ['vendor/angular-filter/dist/angular-filter.min.js']},
      {name: 'ngFileUpload',              files: ['vendor/ng-file-upload/ng-file-upload.js']},
      {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/angular-file-upload.js']},
      {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                  'vendor/angular-ui-select/dist/select.css']},
      {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                                                  'vendor/chartist/dist/chartist.js',
                                                  'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
      {name: 'ng-nestable',               files: ['vendor/ng-nestable/src/angular-nestable.js',
                                                  'vendor/nestable/jquery.nestable.js']},
      {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.grid.pagination',        files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.grid.exporter',          files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.grid.autoResize',        files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.grid.resizeColumns',     files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.grid.moveColumns',       files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.grid.selection',        files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'ui.tree',                  files: ['vendor/angular-ui-tree/dist/angular-ui-tree.min.css',
                                                  'vendor/angular-ui-tree/dist/angular-ui-tree.min.js']},
      {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                                                  'vendor/angular-carousel/dist/angular-carousel.js']},
      {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                                                  'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                                                  'vendor/angular-bootstrap-slider/slider.js']}                                          
    ]
  });

'use strict';

angular.module('projetoBase')
  .service('$api', ["$http", "$q", "URL_API", function ($http, $q, URL_API) {

    this.base = function (value) {
      return new Resource(value);
    }

    function Resource(base) {

      var http = function (method, path, data, paginacao) {
        var deferred = $q.defer();

        if (method === 'POST' || method === 'PUT') {
          $http({method: method, data: data, url: URL_API.urlBase + '/' + base + '/' + path})
            .success(function (data) {
              deferred.resolve(data);
            }).error(function (err) {
              deferred.reject(err);
            });
          return deferred.promise;
        } else {
          $http({method: method, url: URL_API.urlBase + '/' + base + '/' + path, params: paginacao})
            .success(function (data) {
              deferred.resolve(data);
            }).error(function (err) {
              deferred.reject(err);
            });
          return deferred.promise;
        }

      }

      this.head = function (path) {
        return http('HEAD', path === undefined ? '' : path);
      };

      this.get = function (path, paginacao) {
        return http('GET', path === undefined ? '' : path, null, paginacao);
      };
      this.post = function (path, data) {
        return http('POST', path === undefined ? '' : path, data || '');
      };
      this.delete = function (path) {
        return http('DELETE', path === undefined ? '' : path );
      };
      this.put = function (path, data) {
        return http('PUT', path === undefined ? '' : path, data || '');
      }
    }

  }]);

(function (angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('AppController', AppController);

  AppController.$inject = ['$window', '$scope', '$rootScope', '$state','URL_API'];

  function AppController($window, $scope, $rootScope, $state, URL_API) {

    var vm = this;
    $rootScope.currTitle = $state.current.title;

    //$scope.url = URL_API.urlHome + "/#/app/logoff";
    //$scope.dashboard = URL_API.urlHome + "/#/app/dashboard/"+$window.localStorage.getItem('token');

    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      return title;
    };

    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });


    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };




    // Handle sidebar collapse items
    // -----------------------------------

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem) {


      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }

      $scope.lastEventFromChild = isChild($index);

      return true;

    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

  }

})(window.angular);

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

App.controller('SidebarController', ['$rootScope', '$scope', '$state', 'Utils',
  function($rootScope, $scope, $state, Utils){

    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };


    $scope.loadSidebarMenu = function() {
      menuItems = $state.menuItems;
     };
     $scope.loadSidebarMenu();


    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem) {


      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }

      $scope.lastEventFromChild = isChild($index);

      return true;

    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

}]);

'use strict';

angular.module('projetoBase')
  .factory('httpInterceptor', ["$window", "$q", "$rootScope", "URL_API", "growl", "usSpinnerService", function ($window, $q, $rootScope,
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
  }]);

App.directive('dsDate', ['$filter', function($filter) {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    require: 'ngModel',
    template: function(){
        return '<input type="text" placeholder="__/__/____" ui-mask="99/99/9999" class="form-control"/>';
    },


    link: function(scope, el, attr, ctrl){

      ctrl.$parsers.push(function(value){
        if (value.length === 8){
          return convertDate(value);
        } else {
          return value;
        }
      });


      ctrl.$formatters.push(function(value) {
          return $filter("date")(value,"dd/MM/yyyy");
      });

    }
  }

  function convertDate(value){
    var dateArray = value.slice('/');
    return new Date(value.slice(4,8), value.slice(2,4) - 1, value.slice(0,2));
  }

}]);

App.directive('sidebar', ['$rootScope', '$timeout', '$window', 'Utils', function($rootScope, $timeout, $window, Utils) {

  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {

      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          asideToggleOff();
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.external) {
          event.preventDefault();
          $window.open(toState.url, '_blank');
        }  
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        asideToggleOff();

        $rootScope.$broadcast('closeSidebarMenu');
      });

      // Autoclose when click outside the sidebar
      if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

        var wrapper = $('.wrapper');
        var sbclickEvent = 'click.sidebar';

        $rootScope.$watch('app.asideToggled', watchExternalClicks);

      }

      //////

      function watchExternalClicks(newVal) {
        // if sidebar becomes visible
        if ( newVal === true ) {
          $timeout(function(){ // render after current digest cycle
            wrapper.on(sbclickEvent, function(e){
              // if not child of sidebar
              if( ! $(e.target).parents('.aside').length ) {
                asideToggleOff();
              }
            });
          });
        }
        else {
          // dettach event
          wrapper.off(sbclickEvent);
        }
      }

      function asideToggleOff() {
        $rootScope.app.asideToggled = false;
        if(!$scope.$$phase) $scope.$apply(); // anti-pattern but sometimes necessary
      }
    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // -----------------------------------
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');

    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );

    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);

(function (root) {
	'use strict';

	function factory(angular, Spinner) {

		angular
			.module('angularSpinner', [])

			.factory('usSpinnerService', ['$rootScope', function ($rootScope) {
				var config = {};

				config.spin = function (key) {
					$rootScope.$broadcast('us-spinner:spin', key);
				};

				config.stop = function (key) {
					$rootScope.$broadcast('us-spinner:stop', key);
				};

				return config;
			}])

			.directive('usSpinner', ['$window', function ($window) {
				return {
					scope: true,
					link: function (scope, element, attr) {
						var SpinnerConstructor = Spinner || $window.Spinner;

						scope.spinner = null;

						scope.key = angular.isDefined(attr.spinnerKey) ? attr.spinnerKey : false;

						scope.startActive = angular.isDefined(attr.spinnerStartActive) ?
							attr.spinnerStartActive : scope.key ?
							false : true;

						scope.spin = function () {
							if (scope.spinner) {
								scope.spinner.spin(element[0]);
							}
						};

						scope.stop = function () {
							if (scope.spinner) {
								scope.spinner.stop();
							}
						};

						scope.$watch(attr.usSpinner, function (options) {
							scope.stop();
							scope.spinner = new SpinnerConstructor(options);
							if (!scope.key || scope.startActive) {
								scope.spinner.spin(element[0]);
							}
						}, true);

						scope.$on('us-spinner:spin', function (event, key) {
							if (key === scope.key) {
								scope.spin();
							}
						});

						scope.$on('us-spinner:stop', function (event, key) {
							if (key === scope.key) {
								scope.stop();
							}
						});

						scope.$on('$destroy', function () {
							scope.stop();
							scope.spinner = null;
						});
					}
				};
			}]);
	}

	if (typeof define === 'function' && define.amd) {
		/* AMD module */
		define(['angular', 'spin'], factory);
	} else {
		/* Browser global */
		factory(root.angular);
	}
}(window));

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

App.directive('scrollable', function(){
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      var defaultHeight = 250;
      elem.slimScroll({
          height: (attrs.height || defaultHeight)
      });
    }
  };
});

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){
    return {
      basepath: this.basepath
    }
  };

}]);

App
  .constant('JSON_LISTA_OBJETOS', {
	"objects": [{
		"catalog_id": 1,
		"id": 1,
		"ra": 10.6706957,
		"dec": 41.2454558,
		"name": "Andromeda Galaxy",
		"description": "The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral galaxy approximately 780 kiloparsecs (2.5 million light-years) from Earth, and the nearest major galaxy to the Milky Way",
		"wikipedia": "https://en.wikipedia.org/wiki/Andromeda_Galaxy",
		"catalog": {
			"id": 1,
			"name": "Galaxies"
		}
	}, {
		"catalog_id": 2,
		"id": 2,
		"ra": 17.8655228,
		"dec": 21.0344445,
		"name": "Milky Way Galaxy",
		"description": "The Milky Way is the galaxy that contains our Solar System, with the name describing the galaxy's appearance from Earth:",
		"wikipedia": "https://en.wikipedia.org/wiki/Milky_Way",
		"catalog": {
			"id": 1,
			"name": "Galaxies"
		}
	}],
	"page": 1,
	"total_pages": 1,
	"num_results": 2
});
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
  
/**=========================================================
 * Module: popover.js
 * Utility library to use across the theme
 =========================================================*/
 angular.module( 'ui.bootstrap.popover' )
 .directive( 'popoverHtmlUnsafePopup', function () {
     return {
         restrict: 'EA',
         replace: true,
         scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
         template: '<div style="width: 600px; max-width: 600px!important;" class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }"><div class="arrow"></div><div class="popover-inner" style="width: 600px;"><h3 class="popover-title" bind-html-unsafe="title" ng-show="title"></h3><div class="popover-content" bind-html-unsafe="content" style="style="width: 500px; max-width: 600px!important;""></div></div></div>'
     };
 })
 .directive( 'popoverHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
     return $tooltip('popoverHtmlUnsafe', 'popover', 'click' );
 }]);

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';

    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };

    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-28909194-3', 'auto');
      ga('send', 'pageview');
    }
}]);


(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoDetail', CtrlCatalogoDetail);

    CtrlCatalogoDetail.$inject = ['$scope', '$state', '$stateParams', 'GridObjetos',
    'growl', 'SrvCatalogo', 'SrvObjetos', 'ngDialog', 'SrvAladin', '$modal'];

  function CtrlCatalogoDetail($scope, $state, $stateParams, GridObjetos,
    growl, SrvCatalogo, SrvObjetos, ngDialog, SrvAladin, $modal) {

    var vm = this;
    vm.gridOpts = GridObjetos.grid();

    var init = () => {
      SrvObjetos.get($stateParams.objectId).then(function(result){
        if (result) {
          vm.object = result;
          SrvCatalogo.getListaObjetcs(vm.object.id).then(function(result){
            vm.gridOpts.data = result.objects;
          });
        }
      });
    };
    init();

    vm.editarObjeto = (objeto) => {
      vm.modalObjetos(objeto);
    }

    vm.exibirObjeto = (objeto) => {
      vm.modalObjetos(objeto);
    }
    
    vm.modalObjetos = function(objetoCatalogo){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/objetos/modal-objeto.html',
        controller: 'CtrlModalObjetos as vm',
        size: 'md',
        resolve: {
          objetoCatalogo: function() {
            return angular.copy(objetoCatalogo);
          }
        }
      });
      modalInstance.result.then(function(data) {
        vm.gridOpts.data = [];
        init();
      });
    };

    vm.abrirAladin = (entity) => {
      SrvAladin.abrirSkyMapAladin(entity);
    }

    vm.deletarObjeto = (objetoCatalogo) => {
      ngDialog.openConfirm({
          template: 'excluir-objetoCatalogo.html',
          className: 'ngdialog-theme-default custom-width-700'
      }).then(function (value) {
        // SrvObjetos.deletar(objetoCatalogo).then(function (result) {
        //     init();
        // });
      }, function (reason) {
        
      });
  }

    vm.voltar = () => {
      $state.go('app.catalogo.list');
    }

  }

})(window.angular);

(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .controller('CtrlCatalogoList', CtrlCatalogoList);

  CtrlCatalogoList.$inject = ['$state', 'GridCatalogoList', 'SrvCatalogo', 
  '$modal', 'ngDialog'];

    function CtrlCatalogoList($state, GridCatalogoList, SrvCatalogo, 
      $modal, ngDialog) {
      var vm = this;

      var init = () =>{
        vm.gridOpts = GridCatalogoList.grid();
        SrvCatalogo.getLista().then(function(result){
          vm.gridOpts.data = result.objects;
        });
      };
      init();

      vm.exibirCatalogo = (entity) =>{
        window.open(`#/app/views/catalogo/${entity.id}/exibir`, '_self');
      }    

      vm.novoCatalogo = (Catalogo) => {
        vm.modalCatalogo(Catalogo);
      }

      vm.editarCatalogo = (Catalogo) => {
        vm.modalCatalogo(Catalogo);
      }

      vm.modalCatalogo = function(catalogo){
        var modalInstance = $modal.open({
          templateUrl: 'app/views/catalogo/modal-catalogo.html',
          controller: 'CtrlModalCatalogo as vm',
          size: 'md',
          resolve: {
            Catalogo: function() {
              return angular.copy(catalogo);
            }
          }
        });
        modalInstance.result.then(function(data) {
          vm.gridOpts.data = [];
          init();
        });
      };

      vm.excluirCatalogo = (catalogo) => {
        ngDialog.openConfirm({
          template: 'excluir-catalogo.html',
          className: 'ngdialog-theme-default custom-width-700'
      }).then(function (value) {
        SrvCatalogo.deletar(catalogo).then(function (result) {
            init();
        });
      }, function (reason) {
        
      });
      }
      

    }
})(window.angular);

(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .factory('GridCatalogoList', GridCatalogoList);

  function GridCatalogoList() {

    function _grid() {
      var optionsGrid = {
        paginationPageSizes: [10, 50, 75],
        paginationPageSize: 10,
        enableSorting: true,
        columnDefs: [
          { name: 'Nome', field:'name', cellTemplate: 'ver.html', width: '30%'},
          { name: 'Owner', field:'owner',  width: '40%'},
          { name: 'Data', field:'date', cellTemplate: 'dataFormatada.html',  width: '20%'},
          { name: 'Ações', enableFiltering: false, cellTemplate: 'acoes.html', width: '12%'}
        ],
        enableFiltering: true,
        enableColumnResizing: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterPdfDefaultStyle: {fontSize: 8},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true},
        exporterPdfHeader: { text: "Grid de Catalogo", style: 'headerStyle' },
        exporterPdfFooter: function ( currentPage, pageCount ) {
          return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function ( docDefinition ) {
          docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
          docDefinition.styles.footerStyle = { fontSize: 8, bold: true };
          return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600
      }

      return optionsGrid;

    }

    return {
      grid: _grid
    };


  }

})(window.angular);

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

(function(angular){
  'user strict'

  angular
  .module('projetoBase')
  .factory('SrvCatalogo', SrvCatalogo);

  SrvCatalogo.$inject = ['$api'];

  function SrvCatalogo($api){

    var api = $api.base('api');

    return{
      getLista: _getLista,
      getListaObjetcs: _getListaObjetcs,
      salvar: _salvar,
      atualizar: _atualizar,
      deletar: _deletar
    };

    function _getLista(){
      return api.get('catalog');
    }

    function _getListaObjetcs(id_catalog){
      return api.get('catalog/'+id_catalog+'/catalog_objects');
    }

    
    function _salvar(entity){
      return api.post('catalog',entity);
    }

    function _atualizar(entity){
      return api.put('catalog/'+entity.id ,entity);
    }

    function _deletar(entity){
      return api.delete('catalog/'+entity.id);
    }


  };

})(window.angular);

(function(angular){
  'user strict'

  angular
  .module('projetoBase')
  .factory('SrvCatalogo', SrvCatalogo);

  SrvCatalogo.$inject = ['$api'];

  function SrvCatalogo($api){

    var api = $api.base('api');

    return{
      getLista: _getLista,
      getListaObjetcs: _getListaObjetcs,
      salvar: _salvar,
      atualizar: _atualizar,
      deletar: _deletar
    };

    function _getLista(){
      return api.get('catalog');
    }

    function _getListaObjetcs(id_catalog){
      return api.get('catalog/'+id_catalog+'/catalog_objects');
    }

    
    function _salvar(entity){
      return api.post('catalog',entity);
    }

    function _atualizar(entity){
      return api.put('catalog/'+entity.id ,entity);
    }

    function _deletar(entity){
      return api.delete('catalog/'+entity.id);
    }


  };

})(window.angular);

(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .factory('GridObjetos', GridObjetos);

  function GridObjetos() {

    function _grid() {
      var optionsGrid = {
        paginationPageSizes: [10, 50, 75],
        paginationPageSize: 10,
        enableSorting: true,
        columnDefs: [
          { name: 'Nome', field:'name', cellTemplate: 'ver.html', width: '15%'},
          { name: 'Descrição', field:'description',  width: '30%'},
          { name: 'Tipo Catalogo', field:'catalog.name',  width: '15%'},
          { name: 'RA', field:'ra',  width: '13%'},
          { name: 'DEC', field:'dec',  width: '13%'},
          { name: 'Ações', enableFiltering: false, cellTemplate: 'acoes.html', width: '12%'}

        ],
        enableFiltering: true,
        enableColumnResizing: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterPdfDefaultStyle: {fontSize: 8},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true},
        exporterPdfHeader: { text: "Grid de Objetos", style: 'headerStyle' },
        exporterPdfFooter: function ( currentPage, pageCount ) {
          return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function ( docDefinition ) {
          docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
          docDefinition.styles.footerStyle = { fontSize: 8, bold: true };
          return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600
      }

      return optionsGrid;

    }

    return {
      grid: _grid
    };


  }

})(window.angular);

(function (angular) {
        'use strict';

angular
    .module('projetoBase')
    .controller('CtrlModalObjetos', CtrlModalObjetos);

CtrlModalObjetos.$inject = ['$scope', 'growl', 'SrvCatalogo', 'SrvObjetos', '$modalInstance', 'objetoCatalogo'];

function CtrlModalObjetos($scope, growl, SrvCatalogo, SrvObjetos, $modalInstance, objetoCatalogo) {
    
    var vm = this;

    vm.object = objetoCatalogo;

    vm.salvar = () => {
//        SrvObjetos.salvar(vm.object).then(function (result) {
//            if (true) {
//                growl.success("Catalogo criado com successo");
//            }
//        });
    }

    vm.atualizar = () => {
//        SrvObjetos.atualizar(vm.object).then(function (result) {
//            if (true) {
//                growl.success("Catalogo atualizado com successo");
//            }
//        });
    }

    vm.cancel = () => {
        $modalInstance.dismiss('cancel');
    };

}
})(window.angular);
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

(function (angular) {
    'use strict';

angular
.module('projetoBase')
.controller('CtrlModalCatalogo', CtrlModalCatalogo);

CtrlModalCatalogo.$inject = ['$scope', 'growl', 'SrvCatalogo', '$modalInstance', 'Catalogo'];

function CtrlModalCatalogo($scope, growl, SrvCatalogo, $modalInstance, Catalogo) {

var vm = this;

vm.object = Catalogo;

vm.salvar = () => {
    vm.object.date = vm.getDateFormatada();
    SrvCatalogo.salvar(vm.object).then(function (result) {
        if (true) {
            growl.success("Catalogo criado com successo");
            $modalInstance.close();
        }
    });
}

vm.atualizar = () => {
    SrvCatalogo.atualizar(vm.object).then(function (result) {
        if (true) {
            growl.success("Catalogo atualizado com successo");
            $modalInstance.close();
        }
    });
}

vm.cancel = () => {
    $modalInstance.dismiss('cancel');
};

vm.getDateFormatada = () =>{
    var date = new Date();
    var dateFormatada = 
    date.getFullYear() + "-" +
    (date.getMonth() < 10 ? "0" : "") +
    date.getMonth() + "-" +
    (date.getDate() < 10 ? "0" : "") +
    date.getDate() + "T" +
    date.getHours() + ":" +
    date.getMinutes() + ":000000";
    return dateFormatada;
}

}
})(window.angular);
angular.module("projetoBase")
.constant("URL_API",
  {
    "urlBase":"http://lna.linea.gov.br"
  }
);

// http://lna.linea.gov.br
// localhost:5000