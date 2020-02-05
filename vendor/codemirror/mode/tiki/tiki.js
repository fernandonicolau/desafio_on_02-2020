!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("tiki",function(e){function t(e,t,n){return function(i,o){for(;!i.eol();){if(i.match(t)){o.tokenize=r;break}i.next()}return n&&(o.tokenize=n),e}}function n(e){return function(t,n){for(;!t.eol();)t.next();return n.tokenize=r,e}}function r(e,i){function o(t){return i.tokenize=t,t(e,i)}var a=e.sol(),u=e.next();switch(u){case"{":e.eat("/"),e.eatSpace();for(var c;c=e.eat(/[^\s\u00a0=\"\'\/?(}]/);)c;return i.tokenize=f,"tag";case"_":if(e.eat("_"))return o(t("strong","__",r));break;case"'":if(e.eat("'"))return o(t("em","''",r));break;case"(":if(e.eat("("))return o(t("variable-2","))",r));break;case"[":return o(t("variable-3","]",r));case"|":if(e.eat("|"))return o(t("comment","||"));break;case"-":if(e.eat("="))return o(t("header string","=-",r));if(e.eat("-"))return o(t("error tw-deleted","--",r));break;case"=":if(e.match("=="))return o(t("tw-underline","===",r));break;case":":if(e.eat(":"))return o(t("comment","::"));break;case"^":return o(t("tw-box","^"));case"~":if(e.match("np~"))return o(t("meta","~/np~"))}if(a)switch(u){case"!":return e.match("!!!!!")?o(n("header string")):e.match("!!!!")?o(n("header string")):e.match("!!!")?o(n("header string")):(e.match("!!"),o(n("header string")));case"*":case"#":case"+":return o(n("tw-listitem bracket"))}return null}var i,o,a,u,c=e.indentUnit;function f(e,t){var n,i=e.next(),a=e.peek();return"}"==i?(t.tokenize=r,"tag"):"("==i||")"==i?"bracket":"="==i?(o="equals",">"==a&&(i=e.next(),a=e.peek()),/[\'\"]/.test(a)||(t.tokenize=function(e,t){for(;!e.eol();){var n=e.next(),r=e.peek();if(" "==n||","==n||/[ )}]/.test(r)){t.tokenize=f;break}}return"string"}),"operator"):/[\'\"]/.test(i)?(t.tokenize=(n=i,function(e,t){for(;!e.eol();)if(e.next()==n){t.tokenize=f;break}return"string"}),t.tokenize(e,t)):(e.eatWhile(/[^\s\u00a0=\"\'\/?]/),"keyword")}function s(){for(var e=arguments.length-1;e>=0;e--)a.cc.push(arguments[e])}function l(){return s.apply(null,arguments),!0}function d(e,t){var n=a.context&&a.context.noIndent;a.context={prev:a.context,pluginName:e,indent:a.indented,startOfLine:t,noIndent:n}}function k(){a.context&&(a.context=a.context.prev)}function p(e){if("openPlugin"==e)return a.pluginName=i,l(g,(n=a.startOfLine,function(e){return"selfclosePlugin"==e||"endPlugin"==e?l():"endPlugin"==e?(d(a.pluginName,n),l()):l()}));if("closePlugin"==e){var t=!1;return a.context?(t=a.context.pluginName!=i,k()):t=!0,t&&(u="error"),l(function(e){return function(t){return e&&(u="error"),"endPlugin"==t?l():s()}}(t))}return"string"==e?(a.context&&"!cdata"==a.context.name||d("!cdata"),a.tokenize==r&&k(),l()):l();var n}function g(e){return"keyword"==e?(u="attribute",l(g)):"equals"==e?l(m,g):s()}function m(e){return"keyword"==e?(u="string",l()):"string"==e?l(x):s()}function x(e){return"string"==e?l(x):s()}return{startState:function(){return{tokenize:r,cc:[],indented:0,startOfLine:!0,pluginName:null,context:null}},token:function(e,t){if(e.sol()&&(t.startOfLine=!0,t.indented=e.indentation()),e.eatSpace())return null;u=o=i=null;var n=t.tokenize(e,t);if((n||o)&&"comment"!=n)for(a=t;;){if((t.cc.pop()||p)(o||n))break}return t.startOfLine=!1,u||n},indent:function(e,t){var n=e.context;if(n&&n.noIndent)return 0;for(n&&/^{\//.test(t)&&(n=n.prev);n&&!n.startOfLine;)n=n.prev;return n?n.indent+c:0},electricChars:"/"}}),e.defineMIME("text/tiki","tiki")});