!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){var a="https://www.googleapis.com/calendar/v3/calendars",o=e.fullCalendar,n=o.applyAll;o.sourceNormalizers.push(function(e){var a,o=e.googleCalendarId,n=e.url;!o&&n&&((a=/^[^\/]+@([^\/\.]+\.)*(google|googlemail|gmail)\.com$/.test(n))?o=n:((a=/^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^\/]*)/.exec(n))||(a=/^https?:\/\/www.google.com\/calendar\/feeds\/([^\/]*)/.exec(n)))&&(o=decodeURIComponent(a[1])),o&&(e.googleCalendarId=o)),o&&(null==e.editable&&(e.editable=!1),e.url=o)}),o.sourceFetchers.push(function(o,r,l,t){if(o.googleCalendarId)return function(o,r,l,t,d){var c,i,s=a+"/"+encodeURIComponent(o.googleCalendarId)+"/events?callback=?",u=o.googleCalendarApiKey||d.options.googleCalendarApiKey,g=o.success;function p(a,n){var r=n||[{message:a}],l=window.console,t=l?l.warn||l.log:null;(o.googleCalendarError||e.noop).apply(d,r),(d.options.googleCalendarError||e.noop).apply(d,r),t&&t.apply(l,[a].concat(n||[]))}if(!u)return p("Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/"),{};r.hasZone()||(r=r.clone().utc().add(-1,"day"));l.hasZone()||(l=l.clone().utc().add(1,"day"));t&&"local"!=t&&(i=t.replace(" ","_"));return c=e.extend({},o.data||{},{key:u,timeMin:r.format(),timeMax:l.format(),timeZone:i,singleEvents:!0,maxResults:9999}),e.extend({},o,{googleCalendarId:null,url:s,data:c,startParam:!1,endParam:!1,timezoneParam:!1,success:function(a){var o,r,l=[];if(a.error)p("Google Calendar API: "+a.error.message,a.error.errors);else if(a.items&&(e.each(a.items,function(e,a){var o=a.htmlLink;i&&(o=function(e,a){return e.replace(/(\?.*?)?(#|$)/,function(e,o,n){return(o?o+"&":"?")+a+n})}(o,"ctz="+i)),l.push({id:a.id,title:a.summary,start:a.start.dateTime||a.start.date,end:a.end.dateTime||a.end.date,url:o,location:a.location,description:a.description})}),o=[l].concat(Array.prototype.slice.call(arguments,1)),r=n(g,this,o),e.isArray(r)))return r;return l}})}(o,r,l,t,this)})});