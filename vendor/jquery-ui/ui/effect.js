!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){var e,n=t;return t.effects={effect:{}},function(t,e){var n,r=/^([\-+])=\s*(\d+\.?\d*)/,o=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],i=t.Color=function(e,n,r,o){return new t.Color.fn.parse(e,n,r,o)},a={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},s={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},f=i.support={},c=t("<p>")[0],u=t.each;function l(t,e,n){var r=s[e.type]||{};return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:0>t?0:r.max<t?r.max:t)}function d(e){var r=i(),s=r._rgba=[];return e=e.toLowerCase(),u(o,function(t,n){var o,i=n.re.exec(e),f=i&&n.parse(i),c=n.space||"rgba";if(f)return o=r[c](f),r[a[c].cache]=o[a[c].cache],s=r._rgba=o._rgba,!1}),s.length?("0,0,0,0"===s.join()&&t.extend(s,n.transparent),r):n[e]}function p(t,e,n){return 6*(n=(n+1)%1)<1?t+(e-t)*n*6:2*n<1?e:3*n<2?t+(e-t)*(2/3-n)*6:t}c.style.cssText="background-color:rgba(1,1,1,.5)",f.rgba=c.style.backgroundColor.indexOf("rgba")>-1,u(a,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),i.fn=t.extend(i.prototype,{parse:function(e,r,o,s){if(void 0===e)return this._rgba=[null,null,null,null],this;(e.jquery||e.nodeType)&&(e=t(e).css(r),r=void 0);var f=this,c=t.type(e),p=this._rgba=[];return void 0!==r&&(e=[e,r,o,s],c="array"),"string"===c?this.parse(d(e)||n._default):"array"===c?(u(a.rgba.props,function(t,n){p[n.idx]=l(e[n.idx],n)}),this):"object"===c?(u(a,e instanceof i?function(t,n){e[n.cache]&&(f[n.cache]=e[n.cache].slice())}:function(n,r){var o=r.cache;u(r.props,function(t,n){if(!f[o]&&r.to){if("alpha"===t||null==e[t])return;f[o]=r.to(f._rgba)}f[o][n.idx]=l(e[t],n,!0)}),f[o]&&t.inArray(null,f[o].slice(0,3))<0&&(f[o][3]=1,r.from&&(f._rgba=r.from(f[o])))}),this):void 0},is:function(t){var e=i(t),n=!0,r=this;return u(a,function(t,o){var i,a=e[o.cache];return a&&(i=r[o.cache]||o.to&&o.to(r._rgba)||[],u(o.props,function(t,e){if(null!=a[e.idx])return n=a[e.idx]===i[e.idx]})),n}),n},_space:function(){var t=[],e=this;return u(a,function(n,r){e[r.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var n=i(t),r=n._space(),o=a[r],f=0===this.alpha()?i("transparent"):this,c=f[o.cache]||o.to(f._rgba),d=c.slice();return n=n[o.cache],u(o.props,function(t,r){var o=r.idx,i=c[o],a=n[o],f=s[r.type]||{};null!==a&&(null===i?d[o]=a:(f.mod&&(a-i>f.mod/2?i+=f.mod:i-a>f.mod/2&&(i-=f.mod)),d[o]=l((a-i)*e+i,r)))}),this[r](d)},blend:function(e){if(1===this._rgba[3])return this;var n=this._rgba.slice(),r=n.pop(),o=i(e)._rgba;return i(t.map(n,function(t,e){return(1-r)*o[e]+r*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&e<3&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(255*r)),"#"+t.map(n,function(t){return 1===(t=(t||0).toString(16)).length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),i.fn.parse.prototype=i.fn,a.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,r=t[0]/255,o=t[1]/255,i=t[2]/255,a=t[3],s=Math.max(r,o,i),f=Math.min(r,o,i),c=s-f,u=s+f,l=.5*u;return e=f===s?0:r===s?60*(o-i)/c+360:o===s?60*(i-r)/c+120:60*(r-o)/c+240,n=0===c?0:l<=.5?c/u:c/(2-u),[Math.round(e)%360,n,l,null==a?1:a]},a.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],o=t[3],i=r<=.5?r*(1+n):r+n-r*n,a=2*r-i;return[Math.round(255*p(a,i,e+1/3)),Math.round(255*p(a,i,e)),Math.round(255*p(a,i,e-1/3)),o]},u(a,function(e,n){var o=n.props,a=n.cache,s=n.to,f=n.from;i.fn[e]=function(e){if(s&&!this[a]&&(this[a]=s(this._rgba)),void 0===e)return this[a].slice();var n,r=t.type(e),c="array"===r||"object"===r?e:arguments,d=this[a].slice();return u(o,function(t,e){var n=c["object"===r?t:e.idx];null==n&&(n=d[e.idx]),d[e.idx]=l(n,e)}),f?((n=i(f(d)))[a]=d,n):i(d)},u(o,function(n,o){i.fn[n]||(i.fn[n]=function(i){var a,s=t.type(i),f="alpha"===n?this._hsla?"hsla":"rgba":e,c=this[f](),u=c[o.idx];return"undefined"===s?u:("function"===s&&(i=i.call(this,u),s=t.type(i)),null==i&&o.empty?this:("string"===s&&(a=r.exec(i))&&(i=u+parseFloat(a[2])*("+"===a[1]?1:-1)),c[o.idx]=i,this[f](c)))})})}),i.hook=function(e){var n=e.split(" ");u(n,function(e,n){t.cssHooks[n]={set:function(e,r){var o,a,s="";if("transparent"!==r&&("string"!==t.type(r)||(o=d(r)))){if(r=i(o||r),!f.rgba&&1!==r._rgba[3]){for(a="backgroundColor"===n?e.parentNode:e;(""===s||"transparent"===s)&&a&&a.style;)try{s=t.css(a,"backgroundColor"),a=a.parentNode}catch(t){}r=r.blend(s&&"transparent"!==s?s:"_default")}r=r.toRgbaString()}try{e.style[n]=r}catch(t){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=i(e.elem,n),e.end=i(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),t.cssHooks.borderColor={expand:function(t){var e={};return u(["Top","Right","Bottom","Left"],function(n,r){e["border"+r+"Color"]=t}),e}},n=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(n),function(){var e,r=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};function i(e){var n,r,o=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,i={};if(o&&o.length&&o[0]&&o[o[0]])for(r=o.length;r--;)"string"==typeof o[n=o[r]]&&(i[t.camelCase(n)]=o[n]);else for(n in o)"string"==typeof o[n]&&(i[n]=o[n]);return i}t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,r){t.fx.step[r]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(n.style(t.elem,r,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,n,a,s){var f=t.speed(n,a,s);return this.queue(function(){var n,a=t(this),s=a.attr("class")||"",c=f.children?a.find("*").addBack():a;c=c.map(function(){return{el:t(this),start:i(this)}}),(n=function(){t.each(r,function(t,n){e[n]&&a[n+"Class"](e[n])})})(),c=c.map(function(){return this.end=i(this.el[0]),this.diff=function(e,n){var r,i,a={};for(r in n)i=n[r],e[r]!==i&&(o[r]||!t.fx.step[r]&&isNaN(parseFloat(i))||(a[r]=i));return a}(this.start,this.end),this}),a.attr("class",s),c=c.map(function(){var e=this,n=t.Deferred(),r=t.extend({},f,{queue:!1,complete:function(){n.resolve(e)}});return this.el.animate(this.diff,r),n.promise()}),t.when.apply(t,c.get()).done(function(){n(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),f.complete.call(a[0])})})},t.fn.extend({addClass:(e=t.fn.addClass,function(n,r,o,i){return r?t.effects.animateClass.call(this,{add:n},r,o,i):e.apply(this,arguments)}),removeClass:function(e){return function(n,r,o,i){return arguments.length>1?t.effects.animateClass.call(this,{remove:n},r,o,i):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(n,r,o,i,a){return"boolean"==typeof r||void 0===r?o?t.effects.animateClass.call(this,r?{add:n}:{remove:n},o,i,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:n},r,o,i)}}(t.fn.toggleClass),switchClass:function(e,n,r,o,i){return t.effects.animateClass.call(this,{add:n,remove:e},r,o,i)}})}(),function(){function e(e,n,r,o){return t.isPlainObject(e)&&(n=e,e=e.effect),e={effect:e},null==n&&(n={}),t.isFunction(n)&&(o=n,r=null,n={}),("number"==typeof n||t.fx.speeds[n])&&(o=r,r=n,n={}),t.isFunction(r)&&(o=r,r=null),n&&t.extend(e,n),r=r||n.duration,e.duration=t.fx.off?0:"number"==typeof r?r:r in t.fx.speeds?t.fx.speeds[r]:t.fx.speeds._default,e.complete=o||n.complete,e}function n(e){return!(e&&"number"!=typeof e&&!t.fx.speeds[e])||("string"==typeof e&&!t.effects.effect[e]||(!!t.isFunction(e)||"object"==typeof e&&!e.effect))}var r;t.extend(t.effects,{version:"1.11.3",save:function(t,e){for(var n=0;n<e.length;n++)null!==e[n]&&t.data("ui-effects-"+e[n],t[0].style[e[n]])},restore:function(t,e){var n,r;for(r=0;r<e.length;r++)null!==e[r]&&(void 0===(n=t.data("ui-effects-"+e[r]))&&(n=""),t.css(e[r],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var n={width:e.outerWidth(!0),height:e.outerHeight(!0),float:e.css("float")},r=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),o={width:e.width(),height:e.height()},i=document.activeElement;try{i.id}catch(t){i=document.body}return e.wrap(r),(e[0]===i||t.contains(e[0],i))&&t(i).focus(),r=e.parent(),"static"===e.css("position")?(r.css({position:"relative"}),e.css({position:"relative"})):(t.extend(n,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,r){n[r]=e.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(o),r.css(n).show()},removeWrapper:function(e){var n=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===n||t.contains(e[0],n))&&t(n).focus()),e},setTransition:function(e,n,r,o){return o=o||{},t.each(n,function(t,n){var i=e.cssUnit(n);i[0]>0&&(o[n]=i[0]*r+i[1])}),o}}),t.fn.extend({effect:function(){var n=e.apply(this,arguments),r=n.mode,o=n.queue,i=t.effects.effect[n.effect];if(t.fx.off||!i)return r?this[r](n.duration,n.complete):this.each(function(){n.complete&&n.complete.call(this)});function a(e){var r=t(this),o=n.complete,a=n.mode;function s(){t.isFunction(o)&&o.call(r[0]),t.isFunction(e)&&e()}(r.is(":hidden")?"hide"===a:"show"===a)?(r[a](),s()):i.call(r[0],n,s)}return!1===o?this.each(a):this.queue(o||"fx",a)},show:(r=t.fn.show,function(t){if(n(t))return r.apply(this,arguments);var o=e.apply(this,arguments);return o.mode="show",this.effect.call(this,o)}),hide:function(t){return function(r){if(n(r))return t.apply(this,arguments);var o=e.apply(this,arguments);return o.mode="hide",this.effect.call(this,o)}}(t.fn.hide),toggle:function(t){return function(r){if(n(r)||"boolean"==typeof r)return t.apply(this,arguments);var o=e.apply(this,arguments);return o.mode="toggle",this.effect.call(this,o)}}(t.fn.toggle),cssUnit:function(e){var n=this.css(e),r=[];return t.each(["em","px","%","pt"],function(t,e){n.indexOf(e)>0&&(r=[parseFloat(n),e])}),r}})}(),e={},t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,n){e[n]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,n){t.easing["easeIn"+e]=n,t.easing["easeOut"+e]=function(t){return 1-n(1-t)},t.easing["easeInOut"+e]=function(t){return t<.5?n(2*t)/2:1-n(-2*t+2)/2}}),t.effects});