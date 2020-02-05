!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("sparql",function(t){var e,n=t.indentUnit;function r(t){return new RegExp("^(?:"+t.join("|")+")$","i")}var i=r(["str","lang","langmatches","datatype","bound","sameterm","isiri","isuri","iri","uri","bnode","count","sum","min","max","avg","sample","group_concat","rand","abs","ceil","floor","round","concat","substr","strlen","replace","ucase","lcase","encode_for_uri","contains","strstarts","strends","strbefore","strafter","year","month","day","hours","minutes","seconds","timezone","tz","now","uuid","struuid","md5","sha1","sha256","sha384","sha512","coalesce","if","strlang","strdt","isnumeric","regex","exists","isblank","isliteral","a"]),o=r(["base","prefix","select","distinct","reduced","construct","describe","ask","from","named","where","order","limit","offset","filter","optional","graph","by","asc","desc","as","having","undef","values","group","minus","in","not","service","silent","using","insert","delete","union","true","false","with","data","copy","to","move","add","create","drop","clear","load"]),a=/[*+\-<>=&|\^\/!\?]/;function c(t,n){var r,s=t.next();if(e=null,"$"==s||"?"==s)return"?"==s&&t.match(/\s/,!1)?"operator":(t.match(/^[\w\d]*/),"variable-2");if("<"!=s||t.match(/^[\s\u00a0=]/,!1)){if('"'==s||"'"==s)return n.tokenize=(r=s,function(t,e){for(var n,i=!1;null!=(n=t.next());){if(n==r&&!i){e.tokenize=c;break}i=!i&&"\\"==n}return"string"}),n.tokenize(t,n);if(/[{}\(\),\.;\[\]]/.test(s))return e=s,"bracket";if("#"==s)return t.skipToEnd(),"comment";if(a.test(s))return t.eatWhile(a),"operator";if(":"==s)return t.eatWhile(/[\w\d\._\-]/),"atom";if("@"==s)return t.eatWhile(/[a-z\d\-]/i),"meta";if(t.eatWhile(/[_\w\d]/),t.eat(":"))return t.eatWhile(/[\w\d_\-]/),"atom";var u=t.current();return i.test(u)?"builtin":o.test(u)?"keyword":"variable"}return t.match(/^[^\s\u00a0>]*>?/),"atom"}function s(t,e,n){t.context={prev:t.context,indent:t.indent,col:n,type:e}}function u(t){t.indent=t.context.indent,t.context=t.context.prev}return{startState:function(){return{tokenize:c,context:null,indent:0,col:0}},token:function(t,n){if(t.sol()&&(n.context&&null==n.context.align&&(n.context.align=!1),n.indent=t.indentation()),t.eatSpace())return null;var r=n.tokenize(t,n);if("comment"!=r&&n.context&&null==n.context.align&&"pattern"!=n.context.type&&(n.context.align=!0),"("==e)s(n,")",t.column());else if("["==e)s(n,"]",t.column());else if("{"==e)s(n,"}",t.column());else if(/[\]\}\)]/.test(e)){for(;n.context&&"pattern"==n.context.type;)u(n);n.context&&e==n.context.type&&u(n)}else"."==e&&n.context&&"pattern"==n.context.type?u(n):/atom|string|variable/.test(r)&&n.context&&(/[\}\]]/.test(n.context.type)?s(n,"pattern",t.column()):"pattern"!=n.context.type||n.context.align||(n.context.align=!0,n.context.col=t.column()));return r},indent:function(t,e){var r=e&&e.charAt(0),i=t.context;if(/[\]\}]/.test(r))for(;i&&"pattern"==i.type;)i=i.prev;var o=i&&r==i.type;return i?"pattern"==i.type?i.col:i.align?i.col+(o?0:1):i.indent+(o?0:n):0}}}),t.defineMIME("application/sparql-query","sparql")});