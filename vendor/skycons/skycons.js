!function(t){"use strict";var n,i,e,a;e=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame,a=t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||t.msCancelAnimationFrame,e&&a?(n=function(t,n){var i={value:null};return function n(){i.value=e(n),t()}(),i},i=function(t){a(t.value)}):(n=setInterval,i=clearInterval);var o=2*Math.PI,r=2/Math.sqrt(2);function l(t,n,i,e,a){t.beginPath(),t.moveTo(n,i),t.lineTo(e,a),t.stroke()}function s(t,n,i,e,a,r,l,s){var h=Math.cos(n*o);!function(t,n,i,e){t.beginPath(),t.arc(n,i,e,0,o,!1),t.fill()}(t,i-Math.sin(n*o)*a,e+h*r+.5*(s-=l),l+(1-.5*h)*s)}function h(t,n,i,e,a,o,r,l){var h;for(h=5;h--;)s(t,n+h/5,i,e,a,o,r,l)}function c(t,n,i,e,a,o,r){n/=3e4;var l=.21*a,s=.12*a,c=.24*a,u=.28*a;t.fillStyle=r,h(t,n,i,e,l,s,c,u),t.globalCompositeOperation="destination-out",h(t,n,i,e,l,s,c-o,u-o),t.globalCompositeOperation="source-over"}function u(t,n,i,e,a,r,s){n/=12e4;var h,c,u,v,f=.25*a-.5*r,d=.32*a+.5*r,m=.5*a-.5*r;for(t.strokeStyle=s,t.lineWidth=r,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.arc(i,e,f,0,o,!1),t.stroke(),h=8;h--;)c=(n+h/8)*o,l(t,i+(u=Math.cos(c))*d,e+(v=Math.sin(c))*d,i+u*m,e+v*m)}function v(t,n,i,e,a,l,s){n/=15e3;var h=.29*a-.5*l,c=.05*a,u=Math.cos(n*o),v=u*o/-16;t.strokeStyle=s,t.lineWidth=l,t.lineCap="round",t.lineJoin="round",i+=u*c,t.beginPath(),t.arc(i,e,h,v+o/8,v+7*o/8,!1),t.arc(i+Math.cos(v)*h*r,e+Math.sin(v)*h*r,h,v+5*o/8,v+3*o/8,!0),t.closePath(),t.stroke()}var f=[[-.75,-.18,-.7219,-.1527,-.6971,-.1225,-.6739,-.091,-.6516,-.0588,-.6298,-.0262,-.6083,.0065,-.5868,.0396,-.5643,.0731,-.5372,.1041,-.5033,.1259,-.4662,.1406,-.4275,.1493,-.3881,.153,-.3487,.1526,-.3095,.1488,-.2708,.1421,-.2319,.1342,-.1943,.1217,-.16,.1025,-.129,.0785,-.1012,.0509,-.0764,.0206,-.0547,-.012,-.0378,-.0472,-.0324,-.0857,-.0389,-.1241,-.0546,-.1599,-.0814,-.1876,-.1193,-.1964,-.1582,-.1935,-.1931,-.1769,-.2157,-.1453,-.229,-.1085,-.2327,-.0697,-.224,-.0317,-.2064,.0033,-.1853,.0362,-.1613,.0672,-.135,.0961,-.1051,.1213,-.0706,.1397,-.0332,.1512,.0053,.158,.0442,.1624,.0833,.1636,.1224,.1615,.1613,.1565,.1999,.15,.2378,.1402,.2749,.1279,.3118,.1147,.3487,.1015,.3858,.0892,.4236,.0787,.4621,.0715,.5012,.0702,.5398,.0766,.5768,.089,.6123,.1055,.6466,.1244,.6805,.144,.7147,.163,.75,.18],[-.75,0,-.7033,.0195,-.6569,.0399,-.6104,.06,-.5634,.0789,-.5155,.0954,-.4667,.1089,-.4174,.1206,-.3676,.1299,-.3174,.1365,-.2669,.1398,-.2162,.1391,-.1658,.1347,-.1157,.1271,-.0661,.1169,-.017,.1046,.0316,.0903,.0791,.0728,.1259,.0534,.1723,.0331,.2188,.0129,.2656,-.0064,.3122,-.0263,.3586,-.0466,.4052,-.0665,.4525,-.0847,.5007,-.1002,.5497,-.113,.5991,-.124,.6491,-.1325,.6994,-.138,.75,-.14]],d=[{start:.36,end:.11},{start:.56,end:.16}];function m(t,n,i,e,a,r,l,s,h){n/=2500;var c,u,v,m,g=f[l],M=(n+l-d[l].start)%s,p=(n+l-d[l].end)%s,C=(n+l)%s;if(t.strokeStyle=h,t.lineWidth=r,t.lineCap="round",t.lineJoin="round",M<1){if(t.beginPath(),M*=g.length/2-1,M-=c=Math.floor(M),c*=2,c+=2,t.moveTo(i+(g[c-2]*(1-M)+g[c]*M)*a,e+(g[c-1]*(1-M)+g[c+1]*M)*a),p<1){for(p*=g.length/2-1,p-=u=Math.floor(p),u*=2,u+=2,m=c;m!==u;m+=2)t.lineTo(i+g[m]*a,e+g[m+1]*a);t.lineTo(i+(g[u-2]*(1-p)+g[u]*p)*a,e+(g[u-1]*(1-p)+g[u+1]*p)*a)}else for(m=c;m!==g.length;m+=2)t.lineTo(i+g[m]*a,e+g[m+1]*a);t.stroke()}else if(p<1){for(t.beginPath(),p*=g.length/2-1,p-=u=Math.floor(p),u*=2,u+=2,t.moveTo(i+g[0]*a,e+g[1]*a),m=2;m!==u;m+=2)t.lineTo(i+g[m]*a,e+g[m+1]*a);t.lineTo(i+(g[u-2]*(1-p)+g[u]*p)*a,e+(g[u-1]*(1-p)+g[u+1]*p)*a),t.stroke()}C<1&&(C*=g.length/2-1,C-=v=Math.floor(C),v*=2,function(t,n,i,e,a,r,l){var s=a/8,h=s/3,c=2*h,u=n%1*o,v=Math.cos(u),f=Math.sin(u);t.fillStyle=l,t.strokeStyle=l,t.lineWidth=r,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.arc(i,e,s,u,u+Math.PI,!1),t.arc(i-h*v,e-h*f,c,u+Math.PI,u,!1),t.arc(i+c*v,e+c*f,h,u+Math.PI,u,!0),t.globalCompositeOperation="destination-out",t.fill(),t.globalCompositeOperation="source-over",t.stroke()}(t,n,i+(g[(v+=2)-2]*(1-C)+g[v]*C)*a,e+(g[v-1]*(1-C)+g[v+1]*C)*a,a,r,h))}var g=function(t){this.list=[],this.interval=null,this.color=t&&t.color?t.color:"black",this.resizeClear=!(!t||!t.resizeClear)};g.CLEAR_DAY=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);u(t,n,.5*e,.5*a,o,.08*o,i)},g.CLEAR_NIGHT=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);v(t,n,.5*e,.5*a,o,.08*o,i)},g.PARTLY_CLOUDY_DAY=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);u(t,n,.625*e,.375*a,.75*o,.08*o,i),c(t,n,.375*e,.625*a,.75*o,.08*o,i)},g.PARTLY_CLOUDY_NIGHT=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);v(t,n,.667*e,.375*a,.75*o,.08*o,i),c(t,n,.375*e,.625*a,.75*o,.08*o,i)},g.CLOUDY=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);c(t,n,.5*e,.5*a,o,.08*o,i)},g.RAIN=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,r=Math.min(e,a);!function(t,n,i,e,a,r,l){n/=1350;var s,h,c,u,v=.16*a,f=11*o/12,d=7*o/12;for(t.fillStyle=l,s=4;s--;)h=(n+s/4)%1,c=i+(s-1.5)/1.5*(1===s||2===s?-1:1)*v,u=e+h*h*a,t.beginPath(),t.moveTo(c,u-1.5*r),t.arc(c,u,.75*r,f,d,!1),t.fill()}(t,n,.5*e,.37*a,.9*r,.08*r,i),c(t,n,.5*e,.37*a,.9*r,.08*r,i)},g.SLEET=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);!function(t,n,i,e,a,o,r){n/=750;var s,h,c,u,v=.1875*a;for(t.strokeStyle=r,t.lineWidth=.5*o,t.lineCap="round",t.lineJoin="round",s=4;s--;)h=(n+s/4)%1,l(t,c=Math.floor(i+(s-1.5)/1.5*(1===s||2===s?-1:1)*v)+.5,(u=e+h*a)-1.5*o,c,u+1.5*o)}(t,n,.5*e,.37*a,.9*o,.08*o,i),c(t,n,.5*e,.37*a,.9*o,.08*o,i)},g.SNOW=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,r=Math.min(e,a);!function(t,n,i,e,a,r,s){var h,c,u,v,f=.16*a,d=.75*r,m=(n/=3e3)*o*.7,g=Math.cos(m)*d,M=Math.sin(m)*d,p=m+o/3,C=Math.cos(p)*d,w=Math.sin(p)*d,y=m+2*o/3,b=Math.cos(y)*d,k=Math.sin(y)*d;for(t.strokeStyle=s,t.lineWidth=.5*r,t.lineCap="round",t.lineJoin="round",h=4;h--;)c=(n+h/4)%1,l(t,(u=i+Math.sin((c+h/4)*o)*f)-g,(v=e+c*a)-M,u+g,v+M),l(t,u-C,v-w,u+C,v+w),l(t,u-b,v-k,u+b,v+k)}(t,n,.5*e,.37*a,.9*r,.08*r,i),c(t,n,.5*e,.37*a,.9*r,.08*r,i)},g.WIND=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,o=Math.min(e,a);m(t,n,.5*e,.5*a,o,.08*o,0,2,i),m(t,n,.5*e,.5*a,o,.08*o,1,2,i)},g.FOG=function(t,n,i){var e=t.canvas.width,a=t.canvas.height,r=Math.min(e,a),s=.08*r;!function(t,n,i,e,a,o,r){n/=3e4;var l=.21*a,s=.06*a,c=.21*a,u=.28*a;t.fillStyle=r,h(t,n,i,e,l,s,c,u),t.globalCompositeOperation="destination-out",h(t,n,i,e,l,s,c-o,u-o),t.globalCompositeOperation="source-over"}(t,n,.5*e,.32*a,.75*r,s,i),n/=5e3;var c=Math.cos(n*o)*r*.02,u=Math.cos((n+.25)*o)*r*.02,v=Math.cos((n+.5)*o)*r*.02,f=Math.cos((n+.75)*o)*r*.02,d=.936*a,m=Math.floor(d-.5*s)+.5,g=Math.floor(d-2.5*s)+.5;t.strokeStyle=i,t.lineWidth=s,t.lineCap="round",t.lineJoin="round",l(t,c+.2*e+.5*s,m,u+.8*e-.5*s,m),l(t,v+.2*e+.5*s,g,f+.8*e-.5*s,g)},g.prototype={_determineDrawingFunction:function(t){return"string"==typeof t&&(t=g[t.toUpperCase().replace(/-/g,"_")]||null),t},add:function(t,n){var i;"string"==typeof t&&(t=document.getElementById(t)),null!==t&&"function"==typeof(n=this._determineDrawingFunction(n))&&(i={element:t,context:t.getContext("2d"),drawing:n},this.list.push(i),this.draw(i,500))},set:function(t,n){var i;for("string"==typeof t&&(t=document.getElementById(t)),i=this.list.length;i--;)if(this.list[i].element===t)return this.list[i].drawing=this._determineDrawingFunction(n),void this.draw(this.list[i],500);this.add(t,n)},remove:function(t){var n;for("string"==typeof t&&(t=document.getElementById(t)),n=this.list.length;n--;)if(this.list[n].element===t)return void this.list.splice(n,1)},draw:function(t,n){var i=t.context.canvas;this.resizeClear?i.width=i.width:t.context.clearRect(0,0,i.width,i.height),t.drawing(t.context,n,this.color)},play:function(){var t=this;this.pause(),this.interval=n(function(){var n,i=Date.now();for(n=t.list.length;n--;)t.draw(t.list[n],i)},1e3/60)},pause:function(){this.interval&&(i(this.interval),this.interval=null)}},t.Skycons=g}(this);