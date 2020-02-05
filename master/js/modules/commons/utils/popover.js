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
