"use strict";function uiCodemirrorDirective(r,e){return{restrict:"EA",require:"?ngModel",compile:function(){if(angular.isUndefined(window.CodeMirror))throw new Error("ui-codemirror need CodeMirror to work... (o rly?)");return i}};function i(i,o,n,t){var u=angular.extend({value:o.text()},e.codemirror||{},i.$eval(n.uiCodemirror),i.$eval(n.uiCodemirrorOpts)),a=function(r,e){var i;"TEXTAREA"===r[0].tagName?i=window.CodeMirror.fromTextArea(r[0],e):(r.html(""),i=new window.CodeMirror(function(e){r.append(e)},e));return i}(o,u);!function(r,e,i){if(!e)return;var o=Object.keys(window.CodeMirror.defaults);i.$watch(e,function(e,i){if(!angular.isObject(e))return;o.forEach(function(o){if(e.hasOwnProperty(o)){if(i&&e[o]===i[o])return;r.setOption(o,e[o])}})},!0)}(a,n.uiCodemirror||n.uiCodemirrorOpts,i),function(r,e,i){if(!e)return;e.$formatters.push(function(r){if(angular.isUndefined(r)||null===r)return"";if(angular.isObject(r)||angular.isArray(r))throw new Error("ui-codemirror cannot use an object or an array as a model");return r}),e.$render=function(){var i=e.$viewValue||"";r.setValue(i)},r.on("change",function(r){var o=r.getValue();o!==e.$viewValue&&i.$applyAsync(function(){e.$setViewValue(o)})})}(a,t,i),function(e,i,o){if(!i)return;o.$watch(i,function(i,o){i!==o&&r(function(){e.refresh()})})}(a,n.uiRefresh,i),i.$on("CodeMirror",function(r,e){if(!angular.isFunction(e))throw new Error("the CodeMirror event requires a callback function");e(a)}),angular.isFunction(u.onLoad)&&u.onLoad(a)}}angular.module("ui.codemirror",[]).constant("uiCodemirrorConfig",{}).directive("uiCodemirror",uiCodemirrorDirective),uiCodemirrorDirective.$inject=["$timeout","uiCodemirrorConfig"];