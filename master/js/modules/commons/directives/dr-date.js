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
