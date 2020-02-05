!function(e,t){if("function"!=typeof define||!define.amd)return t(e);define("angular-file-upload",["angular"],function(e){return t(e)})}("undefined"==typeof angular?null:angular,function(e){var t=e.module("angularFileUpload",[]);return t.value("fileUploaderOptions",{url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1}).factory("FileUploader",["fileUploaderOptions","$rootScope","$http","$window","$compile",function(t,o,i,r,n){function s(o){var i=e.copy(t);e.extend(this,i,o,{isUploading:!1,_nextIndex:0,_failFilterIndex:-1,_directives:{select:[],drop:[],over:[]}}),this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}function p(t){var o=e.isElement(t)?t.value:t;this["_createFrom"+(e.isString(o)?"FakePath":"Object")](o)}function a(t,o,i){var r=e.isElement(o),n=r?e.element(o):null,p=r?null:o;e.extend(this,{url:t.url,alias:t.alias,headers:e.copy(t.headers),formData:e.copy(t.formData),removeAfterUpload:t.removeAfterUpload,withCredentials:t.withCredentials,method:t.method},i,{uploader:t,file:new s.FileLikeObject(o),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:p,_input:n}),n&&this._replaceNode(n)}function l(t){e.extend(this,t),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}function u(e){u.super_.apply(this,arguments),this.uploader.isHTML5||this.element.removeAttr("multiple"),this.element.prop("value",null)}function d(e){d.super_.apply(this,arguments)}function h(e){h.super_.apply(this,arguments)}return s.prototype.isHTML5=!(!r.File||!r.FormData),s.prototype.addToQueue=function(t,o,i){var r=this.isArrayLikeObject(t)?t:[t],n=this._getFilters(i),p=this.queue.length,a=[];e.forEach(r,function(e){var t=new s.FileLikeObject(e);if(this._isValidFile(t,n,o)){var i=new s.FileItem(this,e,o);a.push(i),this.queue.push(i),this._onAfterAddingFile(i)}else{var r=this.filters[this._failFilterIndex];this._onWhenAddingFileFailed(t,r,o)}},this),this.queue.length!==p&&(this._onAfterAddingAll(a),this.progress=this._getTotalProgress()),this._render(),this.autoUpload&&this.uploadAll()},s.prototype.removeFromQueue=function(e){var t=this.getIndexOfItem(e),o=this.queue[t];o.isUploading&&o.cancel(),this.queue.splice(t,1),o._destroy(),this.progress=this._getTotalProgress()},s.prototype.clearQueue=function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0},s.prototype.uploadItem=function(e){var t=this.getIndexOfItem(e),o=this.queue[t],i=this.isHTML5?"_xhrTransport":"_iframeTransport";o._prepareToUploading(),this.isUploading||(this.isUploading=!0,this[i](o))},s.prototype.cancelItem=function(e){var t=this.getIndexOfItem(e),o=this.queue[t],i=this.isHTML5?"_xhr":"_form";o&&o.isUploading&&o[i].abort()},s.prototype.uploadAll=function(){var t=this.getNotUploadedItems().filter(function(e){return!e.isUploading});t.length&&(e.forEach(t,function(e){e._prepareToUploading()}),t[0].upload())},s.prototype.cancelAll=function(){var t=this.getNotUploadedItems();e.forEach(t,function(e){e.cancel()})},s.prototype.isFile=function(e){var t=r.File;return t&&e instanceof t},s.prototype.isFileLikeObject=function(e){return e instanceof s.FileLikeObject},s.prototype.isArrayLikeObject=function(t){return e.isObject(t)&&"length"in t},s.prototype.getIndexOfItem=function(t){return e.isNumber(t)?t:this.queue.indexOf(t)},s.prototype.getNotUploadedItems=function(){return this.queue.filter(function(e){return!e.isUploaded})},s.prototype.getReadyItems=function(){return this.queue.filter(function(e){return e.isReady&&!e.isUploading}).sort(function(e,t){return e.index-t.index})},s.prototype.destroy=function(){e.forEach(this._directives,function(t){e.forEach(this._directives[t],function(e){e.destroy()},this)},this)},s.prototype.onAfterAddingAll=function(e){},s.prototype.onAfterAddingFile=function(e){},s.prototype.onWhenAddingFileFailed=function(e,t,o){},s.prototype.onBeforeUploadItem=function(e){},s.prototype.onProgressItem=function(e,t){},s.prototype.onProgressAll=function(e){},s.prototype.onSuccessItem=function(e,t,o,i){},s.prototype.onErrorItem=function(e,t,o,i){},s.prototype.onCancelItem=function(e,t,o,i){},s.prototype.onCompleteItem=function(e,t,o,i){},s.prototype.onCompleteAll=function(){},s.prototype._getTotalProgress=function(e){if(this.removeAfterUpload)return e||0;var t=this.getNotUploadedItems().length,o=t?this.queue.length-t:this.queue.length,i=100/this.queue.length,r=(e||0)*i/100;return Math.round(o*i+r)},s.prototype._getFilters=function(t){if(e.isUndefined(t))return this.filters;if(e.isArray(t))return t;var o=t.match(/[^\s,]+/g);return this.filters.filter(function(e){return-1!==o.indexOf(e.name)},this)},s.prototype._render=function(){o.$$phase||o.$apply()},s.prototype._folderFilter=function(e){return!(!e.size&&!e.type)},s.prototype._queueLimitFilter=function(){return this.queue.length<this.queueLimit},s.prototype._isValidFile=function(e,t,o){return this._failFilterIndex=-1,!t.length||t.every(function(t){return this._failFilterIndex++,t.fn.call(this,e,o)},this)},s.prototype._isSuccessCode=function(e){return e>=200&&e<300||304===e},s.prototype._transformResponse=function(t,o){var r=this._headersGetter(o);return e.forEach(i.defaults.transformResponse,function(e){t=e(t,r)}),t},s.prototype._parseHeaders=function(t){var o,i,r,n={};return t?(e.forEach(t.split("\n"),function(e){r=e.indexOf(":"),o=e.slice(0,r).trim().toLowerCase(),i=e.slice(r+1).trim(),o&&(n[o]=n[o]?n[o]+", "+i:i)}),n):n},s.prototype._headersGetter=function(e){return function(t){return t?e[t.toLowerCase()]||null:e}},s.prototype._xhrTransport=function(t){var o=t._xhr=new XMLHttpRequest,i=new FormData,r=this;r._onBeforeUploadItem(t),e.forEach(t.formData,function(t){e.forEach(t,function(e,t){i.append(t,e)})}),i.append(t.alias,t._file,t.file.name),o.upload.onprogress=function(e){var o=Math.round(e.lengthComputable?100*e.loaded/e.total:0);r._onProgressItem(t,o)},o.onload=function(){var e=r._parseHeaders(o.getAllResponseHeaders()),i=r._transformResponse(o.response,e),n=r._isSuccessCode(o.status)?"Success":"Error";r["_on"+n+"Item"](t,i,o.status,e),r._onCompleteItem(t,i,o.status,e)},o.onerror=function(){var e=r._parseHeaders(o.getAllResponseHeaders()),i=r._transformResponse(o.response,e);r._onErrorItem(t,i,o.status,e),r._onCompleteItem(t,i,o.status,e)},o.onabort=function(){var e=r._parseHeaders(o.getAllResponseHeaders()),i=r._transformResponse(o.response,e);r._onCancelItem(t,i,o.status,e),r._onCompleteItem(t,i,o.status,e)},o.open(t.method,t.url,!0),o.withCredentials=t.withCredentials,e.forEach(t.headers,function(e,t){o.setRequestHeader(t,e)}),o.send(i),this._render()},s.prototype._iframeTransport=function(t){var o=e.element('<form style="display: none;" />'),i=e.element('<iframe name="iframeTransport'+Date.now()+'">'),r=t._input,n=this;t._form&&t._form.replaceWith(r),t._form=o,n._onBeforeUploadItem(t),r.prop("name",t.alias),e.forEach(t.formData,function(t){e.forEach(t,function(t,i){var r=e.element('<input type="hidden" name="'+i+'" />');r.val(t),o.append(r)})}),o.prop({action:t.url,method:"POST",target:i.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),i.bind("load",function(){try{var e=i[0].contentDocument.body.innerHTML}catch(e){}var o={response:e,status:200,dummy:!0},r={},s=n._transformResponse(o.response,r);n._onSuccessItem(t,s,o.status,r),n._onCompleteItem(t,s,o.status,r)}),o.abort=function(){var e=0,s={};i.unbind("load").prop("src","javascript:false;"),o.replaceWith(r),n._onCancelItem(t,void 0,e,s),n._onCompleteItem(t,void 0,e,s)},r.after(o),o.append(r).append(i),o[0].submit(),this._render()},s.prototype._onWhenAddingFileFailed=function(e,t,o){this.onWhenAddingFileFailed(e,t,o)},s.prototype._onAfterAddingFile=function(e){this.onAfterAddingFile(e)},s.prototype._onAfterAddingAll=function(e){this.onAfterAddingAll(e)},s.prototype._onBeforeUploadItem=function(e){e._onBeforeUpload(),this.onBeforeUploadItem(e)},s.prototype._onProgressItem=function(e,t){var o=this._getTotalProgress(t);this.progress=o,e._onProgress(t),this.onProgressItem(e,t),this.onProgressAll(o),this._render()},s.prototype._onSuccessItem=function(e,t,o,i){e._onSuccess(t,o,i),this.onSuccessItem(e,t,o,i)},s.prototype._onErrorItem=function(e,t,o,i){e._onError(t,o,i),this.onErrorItem(e,t,o,i)},s.prototype._onCancelItem=function(e,t,o,i){e._onCancel(t,o,i),this.onCancelItem(e,t,o,i)},s.prototype._onCompleteItem=function(t,o,i,r){t._onComplete(o,i,r),this.onCompleteItem(t,o,i,r);var n=this.getReadyItems()[0];this.isUploading=!1,e.isDefined(n)?n.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),this._render())},s.isFile=s.prototype.isFile,s.isFileLikeObject=s.prototype.isFileLikeObject,s.isArrayLikeObject=s.prototype.isArrayLikeObject,s.isHTML5=s.prototype.isHTML5,s.inherit=function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.super_=t},s.FileLikeObject=p,s.FileItem=a,s.FileDirective=l,s.FileSelect=u,s.FileDrop=d,s.FileOver=h,p.prototype._createFromFakePath=function(e){this.lastModifiedDate=null,this.size=null,this.type="like/"+e.slice(e.lastIndexOf(".")+1).toLowerCase(),this.name=e.slice(e.lastIndexOf("/")+e.lastIndexOf("\\")+2)},p.prototype._createFromObject=function(t){this.lastModifiedDate=e.copy(t.lastModifiedDate),this.size=t.size,this.type=t.type,this.name=t.name},a.prototype.upload=function(){this.uploader.uploadItem(this)},a.prototype.cancel=function(){this.uploader.cancelItem(this)},a.prototype.remove=function(){this.uploader.removeFromQueue(this)},a.prototype.onBeforeUpload=function(){},a.prototype.onProgress=function(e){},a.prototype.onSuccess=function(e,t,o){},a.prototype.onError=function(e,t,o){},a.prototype.onCancel=function(e,t,o){},a.prototype.onComplete=function(e,t,o){},a.prototype._onBeforeUpload=function(){this.isReady=!0,this.isUploading=!0,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()},a.prototype._onProgress=function(e){this.progress=e,this.onProgress(e)},a.prototype._onSuccess=function(e,t,o){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(e,t,o)},a.prototype._onError=function(e,t,o){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(e,t,o)},a.prototype._onCancel=function(e,t,o){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(e,t,o)},a.prototype._onComplete=function(e,t,o){this.onComplete(e,t,o),this.removeAfterUpload&&this.remove()},a.prototype._destroy=function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input},a.prototype._prepareToUploading=function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0},a.prototype._replaceNode=function(e){var t=n(e.clone())(e.scope());t.prop("value",null),e.css("display","none"),e.after(t)},l.prototype.events={},l.prototype.bind=function(){for(var e in this.events){var t=this.events[e];this.element.bind(e,this[t])}},l.prototype.unbind=function(){for(var e in this.events)this.element.unbind(e,this.events[e])},l.prototype.destroy=function(){var e=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(e,1),this.unbind()},l.prototype._saveLinks=function(){for(var e in this.events){var t=this.events[e];this[t]=this[t].bind(this)}},s.inherit(u,l),u.prototype.events={$destroy:"destroy",change:"onChange"},u.prototype.prop="select",u.prototype.getOptions=function(){},u.prototype.getFilters=function(){},u.prototype.isEmptyAfterSelection=function(){return!!this.element.attr("multiple")},u.prototype.onChange=function(){var e=this.uploader.isHTML5?this.element[0].files:this.element[0],t=this.getOptions(),o=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(e,t,o),this.isEmptyAfterSelection()&&this.element.prop("value",null)},s.inherit(d,l),d.prototype.events={$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},d.prototype.prop="drop",d.prototype.getOptions=function(){},d.prototype.getFilters=function(){},d.prototype.onDrop=function(t){var o=this._getTransfer(t);if(o){var i=this.getOptions(),r=this.getFilters();this._preventAndStop(t),e.forEach(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(o.files,i,r)}},d.prototype.onDragOver=function(t){var o=this._getTransfer(t);this._haveFiles(o.types)&&(o.dropEffect="copy",this._preventAndStop(t),e.forEach(this.uploader._directives.over,this._addOverClass,this))},d.prototype.onDragLeave=function(t){t.currentTarget===this.element[0]&&(this._preventAndStop(t),e.forEach(this.uploader._directives.over,this._removeOverClass,this))},d.prototype._getTransfer=function(e){return e.dataTransfer?e.dataTransfer:e.originalEvent.dataTransfer},d.prototype._preventAndStop=function(e){e.preventDefault(),e.stopPropagation()},d.prototype._haveFiles=function(e){return!!e&&(e.indexOf?-1!==e.indexOf("Files"):!!e.contains&&e.contains("Files"))},d.prototype._addOverClass=function(e){e.addOverClass()},d.prototype._removeOverClass=function(e){e.removeOverClass()},s.inherit(h,l),h.prototype.events={$destroy:"destroy"},h.prototype.prop="over",h.prototype.overClass="nv-file-over",h.prototype.addOverClass=function(){this.element.addClass(this.getOverClass())},h.prototype.removeOverClass=function(){this.element.removeClass(this.getOverClass())},h.prototype.getOverClass=function(){return this.overClass},s}]).directive("nvFileSelect",["$parse","FileUploader",function(e,t){return{link:function(o,i,r){var n=o.$eval(r.uploader);if(!(n instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');var s=new t.FileSelect({uploader:n,element:i});s.getOptions=e(r.options).bind(s,o),s.getFilters=function(){return r.filters}}}}]).directive("nvFileDrop",["$parse","FileUploader",function(e,t){return{link:function(o,i,r){var n=o.$eval(r.uploader);if(!(n instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');if(n.isHTML5){var s=new t.FileDrop({uploader:n,element:i});s.getOptions=e(r.options).bind(s,o),s.getFilters=function(){return r.filters}}}}}]).directive("nvFileOver",["FileUploader",function(e){return{link:function(t,o,i){var r=t.$eval(i.uploader);if(!(r instanceof e))throw new TypeError('"Uploader" must be an instance of FileUploader');new e.FileOver({uploader:r,element:o}).getOverClass=function(){return i.overClass||this.overClass}}}}]),t});