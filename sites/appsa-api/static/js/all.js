!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=33)}([function(e,t,n){"use strict";var o=n(8),r=n(25),a=Object.prototype.toString;function i(e){return"[object Array]"===a.call(e)}function s(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===a.call(e)}function d(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.call(null,e[r],r,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===a.call(e)},isBuffer:r,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===a.call(e)},isFile:function(e){return"[object File]"===a.call(e)},isBlob:function(e){return"[object Blob]"===a.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:d,merge:function e(){var t={};function n(n,o){"object"==typeof t[o]&&"object"==typeof n?t[o]=e(t[o],n):t[o]=n}for(var o=0,r=arguments.length;o<r;o++)d(arguments[o],n);return t},deepMerge:function e(){var t={};function n(n,o){"object"==typeof t[o]&&"object"==typeof n?t[o]=e(t[o],n):t[o]="object"==typeof n?e({},n):n}for(var o=0,r=arguments.length;o<r;o++)d(arguments[o],n);return t},extend:function(e,t,n){return d(t,function(t,r){e[r]=n&&"function"==typeof t?o(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";function o(e){this.message=e}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,e.exports=o},function(e,t,n){"use strict";var o=n(0);e.exports=function(e,t){t=t||{};var n={};return o.forEach(["url","method","params","data"],function(e){void 0!==t[e]&&(n[e]=t[e])}),o.forEach(["headers","auth","proxy"],function(r){o.isObject(t[r])?n[r]=o.deepMerge(e[r],t[r]):void 0!==t[r]?n[r]=t[r]:o.isObject(e[r])?n[r]=o.deepMerge(e[r]):void 0!==e[r]&&(n[r]=e[r])}),o.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(o){void 0!==t[o]?n[o]=t[o]:void 0!==e[o]&&(n[o]=e[o])}),n}},function(e,t,n){"use strict";var o=n(17);e.exports=function(e,t,n,r,a){var i=new Error(e);return o(i,t,n,r,a)}},function(e,t,n){"use strict";var o=n(0),r=n(18),a=n(7),i=n(16),s=n(15),c=n(3);e.exports=function(e){return new Promise(function(t,d){var l=e.data,p=e.headers;o.isFormData(l)&&delete p["Content-Type"];var u=new XMLHttpRequest;if(e.auth){var f=e.auth.username||"",h=e.auth.password||"";p.Authorization="Basic "+btoa(f+":"+h)}if(u.open(e.method.toUpperCase(),a(e.url,e.params,e.paramsSerializer),!0),u.timeout=e.timeout,u.onreadystatechange=function(){if(u&&4===u.readyState&&(0!==u.status||u.responseURL&&0===u.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in u?i(u.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?u.response:u.responseText,status:u.status,statusText:u.statusText,headers:n,config:e,request:u};r(t,d,o),u=null}},u.onabort=function(){u&&(d(c("Request aborted",e,"ECONNABORTED",u)),u=null)},u.onerror=function(){d(c("Network Error",e,null,u)),u=null},u.ontimeout=function(){d(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",u)),u=null},o.isStandardBrowserEnv()){var m=n(14),b=(e.withCredentials||s(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}if("setRequestHeader"in u&&o.forEach(p,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete p[t]:u.setRequestHeader(t,e)}),e.withCredentials&&(u.withCredentials=!0),e.responseType)try{u.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&u.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&u.upload&&u.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){u&&(u.abort(),d(e),u=null)}),void 0===l&&(l=null),u.send(l)})}},function(e,t,n){"use strict";(function(t){var o=n(0),r=n(19),a={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(void 0!==t&&"[object process]"===Object.prototype.toString.call(t)?s=n(4):"undefined"!=typeof XMLHttpRequest&&(s=n(4)),s),transformRequest:[function(e,t){return r(t,"Accept"),r(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){c.headers[e]={}}),o.forEach(["post","put","patch"],function(e){c.headers[e]=o.merge(a)}),e.exports=c}).call(this,n(20))},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";var o=n(0);function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(o.isURLSearchParams(t))a=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),a=i.join("&")}if(a){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return e.apply(t,n)}}},function(e,t){!function(e){"use strict";e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=e(this.hash);if((t=t.length?t:e("[name="+this.hash.slice(1)+"]")).length)return e("html, body").animate({scrollTop:t.offset().top},1e3,"easeInOutExpo"),!1}}),e(".js-scroll-trigger").click(function(){e(".navbar-collapse").collapse("hide")}),e("body").scrollspy({target:"#sideNav"})}(jQuery)},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";var o=n(1);function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";var o=n(0);e.exports=o.isStandardBrowserEnv()?{write:function(e,t,n,r,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),o.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),o.isString(r)&&s.push("path="+r),o.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var o=n(0);e.exports=o.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var o=e;return t&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=o.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var o=n(0),r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,a,i={};return e?(o.forEach(e.split("\n"),function(e){if(a=e.indexOf(":"),t=o.trim(e.substr(0,a)).toLowerCase(),n=o.trim(e.substr(a+1)),t){if(i[t]&&r.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}}),i):i}},function(e,t,n){"use strict";e.exports=function(e,t,n,o,r){return e.config=t,n&&(e.code=n),e.request=o,e.response=r,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var o=n(3);e.exports=function(e,t,n){var r=n.config.validateStatus;!r||r(n.status)?e(n):t(o("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(e,t,n){"use strict";var o=n(0);e.exports=function(e,t){o.forEach(e,function(n,o){o!==t&&o.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[o])})}},function(e,t){var n,o,r=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{o="function"==typeof clearTimeout?clearTimeout:i}catch(e){o=i}}();var c,d=[],l=!1,p=-1;function u(){l&&c&&(l=!1,c.length?d=c.concat(d):p=-1,d.length&&f())}function f(){if(!l){var e=s(u);l=!0;for(var t=d.length;t;){for(c=d,d=[];++p<t;)c&&c[p].run();p=-1,t=d.length}c=null,l=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===i||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];d.push(new h(e,t)),1!==d.length||l||s(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){"use strict";var o=n(0);e.exports=function(e,t,n){return o.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";var o=n(0),r=n(21),a=n(6),i=n(5),s=n(13),c=n(12);function d(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return d(e),e.baseURL&&!s(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=r(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||i.adapter)(e).then(function(t){return d(e),t.data=r(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(d(e),t&&t.response&&(t.response.data=r(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var o=n(0);function r(){this.handlers=[]}r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";var o=n(0),r=n(7),a=n(23),i=n(22),s=n(2);function c(e){this.defaults=e,this.interceptors={request:new a,response:new a}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),r(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){c.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){c.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=c},function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,n){"use strict";var o=n(0),r=n(8),a=n(24),i=n(2);function s(e){var t=new a(e),n=r(a.prototype.request,t);return o.extend(n,a.prototype,t),o.extend(n,t),n}var c=s(n(5));c.Axios=a,c.create=function(e){return s(i(c.defaults,e))},c.Cancel=n(1),c.CancelToken=n(11),c.isCancel=n(6),c.all=function(e){return Promise.all(e)},c.spread=n(10),e.exports=c,e.exports.default=c},function(e,t,n){e.exports=n(26)},function(e,t,n){"use strict";var o,r={},a=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}();function s(e,t){for(var n=[],o={},r=0;r<e.length;r++){var a=e[r],i=t.base?a[0]+t.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};o[i]?o[i].parts.push(s):n.push(o[i]={id:i,parts:[s]})}return n}function c(e,t){for(var n=0;n<e.length;n++){var o=e[n],a=r[o.id],i=0;if(a){for(a.refs++;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(m(o.parts[i],t))}else{for(var s=[];i<o.parts.length;i++)s.push(m(o.parts[i],t));r[o.id]={id:o.id,refs:1,parts:s}}}}function d(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var o=n.nc;o&&(e.attributes.nonce=o)}if(Object.keys(e.attributes).forEach(function(n){t.setAttribute(n,e.attributes[n])}),"function"==typeof e.insert)e.insert(t);else{var r=i(e.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}return t}var l,p=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function u(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=p(t,r);else{var a=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}var f=null,h=0;function m(e,t){var n,o,r;if(t.singleton){var a=h++;n=f||(f=d(t)),o=u.bind(null,n,a,!1),r=u.bind(null,n,a,!0)}else n=d(t),o=function(e,t,n){var o=n.css,r=n.media,a=n.sourceMap;if(r&&e.setAttribute("media",r),a&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a());var n=s(e,t);return c(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var i=n[a],d=r[i.id];d&&(d.refs--,o.push(d))}e&&c(s(e,t),t);for(var l=0;l<o.length;l++){var p=o[l];if(0===p.refs){for(var u=0;u<p.parts.length;u++)p.parts[u]();delete r[p.id]}}}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=(i=o,s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),a=o.sources.map(function(e){return"/*# sourceURL=".concat(o.sourceRoot).concat(e," */")});return[n].concat(a).concat([r]).join("\n")}var i,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var a=this[r][0];null!=a&&(o[a]=!0)}for(var i=0;i<e.length;i++){var s=e[i];null!=s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),t.push(s))}},t}},function(e,t,n){(e.exports=n(29)(!1)).push([e.i,"/*!\n * Start Bootstrap - Resume v5.0.7 (https://startbootstrap.com/template-overviews/resume)\n * Copyright 2013-2019 Start Bootstrap\n * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-resume/blob/master/LICENSE)\n */\n\nbody {\n    font-family: Muli, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n    padding-top: 54px;\n    color: #868e96\n}\n\n@media (min-width:992px) {\n    body {\n        padding-top: 0;\n        padding-left: 17rem\n    }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font-family: 'Saira Extra Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n    font-weight: 700;\n    text-transform: uppercase;\n    color: #343a40\n}\n\nh1 {\n    font-size: 6rem;\n    line-height: 5.5rem\n}\n\nh2 {\n    font-size: 3.5rem\n}\n\nh3 {\n    font-size: 2rem\n}\n\np.lead {\n    font-size: 1.15rem;\n    font-weight: 400\n}\n\n.subheading {\n    text-transform: uppercase;\n    font-weight: 500;\n    font-family: 'Saira Extra Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n    font-size: 1.5rem\n}\n\n.social-icons a {\n    display: inline-block;\n    height: 3.5rem;\n    width: 3.5rem;\n    background-color: #495057;\n    color: #fff !important;\n    border-radius: 100%;\n    text-align: center;\n    font-size: 1.5rem;\n    line-height: 3.5rem;\n    margin-right: 1rem\n}\n\n.social-icons a:last-child {\n    margin-right: 0\n}\n\n.social-icons a:hover {\n    background-color:#efefef; \n}\n\n.dev-icons {\n    font-size: 3rem\n}\n\n.dev-icons .list-inline-item i:hover {\n    color: #44b045\n}\n\n#sideNav .navbar-nav .nav-item .nav-link {\n    font-weight: 800;\n    letter-spacing: .05rem;\n    text-transform: uppercase\n}\n\n#sideNav .navbar-toggler:focus {\n    outline-color: #d48a6e\n}\n\n@media (min-width:992px) {\n    #sideNav {\n        text-align: center;\n        position: fixed;\n        top: 0;\n        left: 0;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        width: 17rem;\n        height: 100vh\n    }\n    #sideNav .navbar-brand {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        margin: auto auto 0;\n        padding: .5rem\n    }\n    #sideNav .navbar-brand .img-profile {\n        max-width: 10rem;\n        max-height: 10rem;\n        border: .5rem solid rgba(255, 255, 255, .2)\n    }\n    #sideNav .navbar-collapse {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: start;\n        -ms-flex-align: start;\n        align-items: flex-start;\n        -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n        flex-grow: 0;\n        width: 100%;\n        margin-bottom: auto\n    }\n    #sideNav .navbar-collapse .navbar-nav {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        width: 100%\n    }\n    #sideNav .navbar-collapse .navbar-nav .nav-item {\n        display: block\n    }\n    #sideNav .navbar-collapse .navbar-nav .nav-item .nav-link {\n        display: block\n    }\n}\n\nsection.resume-section {\n    padding-top: 5rem !important;\n    padding-bottom: 5rem !important;\n    max-width: 75rem\n}\n\nsection.resume-section .resume-item .resume-date {\n    min-width: none\n}\n\nsection.resume-section.report-section {\n    max-width:none;\n}\n\n@media (min-width:768px) {\n    section.resume-section {\n        min-height: 100vh\n    }\n    section.resume-section .resume-item .resume-date {\n        min-width: 18rem\n    }\n}\n\n@media (min-width:992px) {\n    section.resume-section {\n        padding-top: 3rem !important;\n        padding-bottom: 3rem !important\n    }\n}\n\n.bg-primary {\n    background-color: #44b045 !important\n}\n\n.text-primary {\n    color: #44b045 !important\n}\n\na {\n    color: #44b045\n}\n\na:active,\na:focus,\na:hover {\n    color: #824027\n}\n\n.ios-toggle-container{\n    width:60px;\n    margin:0px auto;\n    text-align:center;\n}\n\n.ios-toggle,.ios-toggle:active{\nposition:absolute;\n/*top:-5000px;*/\nheight:0;\nwidth:0;\nopacity:0;\nborder:none;\noutline:none;\n}\n.checkbox-label{\ndisplay:block;\nposition:relative;\npadding:10px;\nmargin-bottom:20px;\nfont-size:12px;\nline-height:16px;\nwidth:100%;\nheight:36px;\n/*border-radius*/\n-webkit-border-radius:18px;\n   -moz-border-radius:18px;\n        border-radius:18px;\nbackground:#e2e3e5;\ncursor:pointer;\nbox-shadow: inset 0 0 0 20px #e2e3e5, 0 0 0 2px #e2e3e5;\n}\n.checkbox-label:before{\ncontent:'';\ndisplay:block;\nposition:absolute;\nz-index:1;\nline-height:34px;\ntext-indent:40px;\nheight:36px;\nwidth:36px;\n/*border-radius*/\n-webkit-border-radius:100%;\n   -moz-border-radius:100%;\n        border-radius:100%;\ntop:0px;\nleft:0px;\nright:auto;\nbackground:white;\n/*box-shadow*/\n-webkit-box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;\n   -moz-box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;\n        box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;\n}\n.checkbox-label:after{\ncontent:attr(data-off);\ndisplay:block;\nposition:absolute;\nz-index:0;\ntop:0;\nleft:-300px;\npadding:10px;\nheight:100%;\nwidth:300px;\ntext-align:right;\ncolor:#bfbfbf;\nwhite-space:nowrap;\n}\n.ios-toggle:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n   -moz-box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n        box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n}\n.ios-toggle:checked + .checkbox-label:before{\nleft:calc(100% - 36px);\n/*box-shadow*/\n-webkit-box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);\n   -moz-box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);\n        box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);\n}\n.ios-toggle:checked + .checkbox-label:after{\ncontent:attr(data-on);\nleft:60px;\nwidth:36px;\n}\n/* GREEN CHECKBOX */\n\n#checkbox1 + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;\n   -moz-box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;\n        box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;\n}\n#checkbox1:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n   -moz-box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n        box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n}\n#checkbox1:checked + .checkbox-label:after{\ncolor:rgba(19,191,17,1);\n}\n/* RED CHECKBOX */\n\n#checkbox2 + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 0px #f35f42,0 0 0 2px #dddddd;\n   -moz-box-shadow:inset 0 0 0 0px #f35f42,0 0 0 2px #dddddd;\n        box-shadow:inset 0 0 0 0px #f35f42,0 0 0 2px #dddddd;\n}\n#checkbox2:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 20px #f35f42,0 0 0 2px #f35f42;\n   -moz-box-shadow:inset 0 0 0 20px #f35f42,0 0 0 2px #f35f42;\n        box-shadow:inset 0 0 0 20px #f35f42,0 0 0 2px #f35f42;\n}\n#checkbox2:checked + .checkbox-label:after{\ncolor:#f35f42;\n}\n/* BLUE CHECKBOX */\n\n#checkbox3 + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 0px #1fc1c8,0 0 0 2px #dddddd;\n   -moz-box-shadow:inset 0 0 0 0px #1fc1c8,0 0 0 2px #dddddd;\n        box-shadow:inset 0 0 0 0px #1fc1c8,0 0 0 2px #dddddd;\n}\n#checkbox3:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 20px #1fc1c8,0 0 0 2px #1fc1c8;\n   -moz-box-shadow:inset 0 0 0 20px #1fc1c8,0 0 0 2px #1fc1c8;\n        box-shadow:inset 0 0 0 20px #1fc1c8,0 0 0 2px #1fc1c8;\n}\n#checkbox3:checked + .checkbox-label:after{\ncolor:#1fc1c8;\n}\n\n/*comment-box*/\n#rsr_table_wrapper{\n    width:100%;\n}\n\ndiv.dataTables_wrapper div.dataTables_filter{\n    text-align: right;\n    display: inline;\n    float: left;\n}\n\n.dataTables_wrapper .btn-group,\n.dataTables_wrapper .btn-group-vertical{\n    float: right;\n    margin-right: 20px;\n}\n\nsection.resume-section.report-section {\n    max-width: none;\n    padding: 10px!important;\n}\ntd {\n    font-size: 14px;\n}\ntd.text-right.comment-box {\n    padding-left: 0px !important;\n    padding-top: 10px !important;\n}\ntd.text-right.no-data{\n    color: #e2e3e5;\n}\ntd.text-right.has-data{\n    color: #000;\n    cursor: pointer;\n}\ntd.text-right.has-data:hover{\n    text-decoration: underline;\n    background: #ddd;\n}\ntable.dataTable thead th, \ntable.dataTable thead td,\ntable.dataTable tbody th,\ntable.dataTable tbody td {\n    padding: .5rem;\n    font-size: 14px;\n}\ntable.dataTable thead th, \ntable.dataTable thead td{\n    background-color: #eee;\n    color: #555;\n}\n.table thead th {\n    border-bottom: 1px solid #ddd;\n    border-top:none;\n}\ntable.dataTable tr.dtrg-group td{\n    background-color: #228b8b;\n    color: #FFFFFF;\n}\ntable.dataTable tr.dtrg-group.dtrg-level-1 td,\ntable.dataTable tr.dtrg-group.dtrg-level-2 td{\n    padding-left: 1em;\n    background-color: #e2e3e5;\n    font-weight:bold;\n    font-size:14px;\n    color: #484848;\n}\ntable.dataTable tr.dtrg-group.dtrg-level-2 td{\n    padding-left: 2em;\n    background-color: #f2f2f2;\n    font-weight:bold;\n    font-size:14px;\n    color: #484848;\n}\ntable.table thead th {\n}\ntable.dataTable tr.dtrg-group.dtrg-level-2 td.has-data{\n    color:#228b8b;\n    cursor: pointer;\n}\ntable.dataTable tr.dtrg-group.dtrg-level-1 td.comment-form-show {\n    background-color: #d2d2d2!important;\n    color: #6d757d !important;\n    text-align: center;\n    padding-right: 20px;\n    cursor:pointer;\n}\ntable.dataTable tr.dtrg-group.dtrg-level-1 td.comment-form-show:hover {\n    background-color: #44b045!important;\n    color: #f2f2f2 !important;\n}\n\ninput.search{\n    margin-right: 15px;\n    height: calc(1.5em + .75rem + 2px);\n    padding: .375rem .75rem;\n    font-size: 1rem;\n    font-weight: 400;\n    line-height: 1.5;\n    color: #495057;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 1px solid #ced4da;\n    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n}\n\ndiv.modal-comment {\n    font-size: 14px;\n    margin-bottom: 10px;\n    border-top: 1px solid #fefefe;\n}\ndiv.text-comment {\n    font-size: 14px;\n    padding: 10px;\n}\n\nspan.badge-comment {\n    cursor: pointer;\n    margin-right: 10px;\n    font-size:14px;\n}\n",""])},function(e,t,n){var o=n(30);"string"==typeof o&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1};n(28)(o,r);o.locals&&(e.exports=o.locals)},function(e,t,n){"use strict";n.r(t);n(31);const o=n(27),r=$("meta[name=path]").attr("content");let a=e=>{$(".modal-data").children().remove(),$(".modal-data").append("<div>"+e+"</div>"),$("#modal").modal("toggle"),$("#modal").on("hidden.bs.modal",function(){$("#save-comment").remove(),$("#discard-comment").hide(),$("#close-modal").show(),$(".modal-data").children().remove(),$(".modal-comment").children().hide(),$(".text-comment").remove()})},i=e=>o.post(r+"/api/postcomment",e).then(e=>{(e=>($(".modal-comment").prepend("<div class='text-comment'>"+e.event_date+": "+e.text+"</div>"),!0))(e.data)}).catch(e=>{console.log(e)}),s=e=>o.post(r+"/api/getcomments",e).then(e=>(e=>(e.map(e=>$(".modal-comment").prepend("<div class='text-comment'>"+e.event_date+": "+e.text+"</div>")),!0))(e.data)).catch(e=>{console.log(e)});$("#period-yearly").on("click",()=>{$("#period-semester").prop("checked",!1)}),$("#period-semester").on("click",()=>{$("#period-yearly").prop("checked",!1)}),$("input[name='project-selection'").map(e=>{let t=$("input[name='project-selection'"),n=$("input[name='project-selection'")[e],o=$("input[name='project-selection'")[e];$(n).on("click",()=>{$(t).map(e=>{let t=$("input[name='project-selection'")[e];t!==o&&$(t).prop("checked",!1)})})});let c=()=>{let e=(()=>{let e=$("#period-yearly").prop("checked"),t=$("#period-semester").prop("checked");return e?"yearly":!!t&&"semester"})();return{report_type:e,filter_date:(e=>{let t=$("#period-"+e+"-select option:selected").text();return""!==t&&t})(e),project_id:(()=>{let e=$("input[name='project-selection']:checked").map(function(e,t){return $(t).val()}).get();return!!e[0]&&e[0]})(),project_option:(()=>{let e=$("input[name='project-option']:checked").map(function(e,t){return $(t).val()}).get();return e.length>0&&e})()}};var d;$("#generate-report").on("click",()=>{let e=c();$("#list-of-alerts").children().remove();let t=!1,n="<h4><i class='fa fa-times-circle' style='color:red;'></i> ";return!1===e.project_id&&(t=!0,$("#list-of-alerts").append(n+"<a href='#projects'>Project ID is not Set</a></h4>")),!1===e.project_option&&(t=!0,$("#list-of-alerts").append(n+"<a href='#settings'>Country is not Set</a></h4>")),!1===e.filter_date&&(t=!0,$("#list-of-alerts").append(n+"<a href='#settings'>Period is not Set</a></h4>")),t?($("#alert").modal("toggle"),!1):(d=e,$("#generate-report i").show(),void o.post(r+"/api/datatables/"+d.project_id,d).then(e=>p(e.data)).catch(e=>{$("#list-of-alerts").append("<h4 class='text-center'>Data is Not Available</h4>"),$("#alert").modal().show()}))});let l=(e,t,n)=>{let o=(t+="-"+n)+"-D",r="no-data";null!==e[o]&&(r="has-data");let a="<td class='text-right "+r+"' data-details='"+JSON.stringify(e[o])+"'>";return a+=e[t],a+="</td>"},p=e=>{$.fn.DataTable.isDataTable("#rsr_table")&&$("#rsr_table").DataTable().destroy(),$("#rsr_table tbody").empty();let t=e.values,n=e.result_titles,c=e.titles;t.map((e,t)=>{let n="<tr>";return n+="<td>"+e.project_title+"</td>",n+="<td>"+e.indicator+"</td>",n+="<td>"+e.dimension_name+"</td>",n+="<td style='padding-left:50px;'>"+e.commodity+"</td>",["TTL","MW","MZ","ZA"].map(t=>{n+=l(e,"TG",t)}),["MW","MZ","ZA","TTL"].map(t=>{n+=l(e,"CA",t)}),n+="</tr>",$("#rsr_table tbody").append(n),n}),$("#rsr_table").show();const d=$("#rsr_table").DataTable({dom:"Brftip",ordering:!1,buttons:["copy","print","excel","pdf"],fixedHeader:!0,rowGroup:{startRender:(e,t)=>{let o=t=>{let n=e[0],o=e.cells().column(t).nodes(),r=[];return n.map((e,t)=>{let n=o[e].dataset.details;try{r.push(JSON.parse(n)[0])}catch(e){console.log("no-data")}return!0}),r},r="";if(-1===c.indexOf(t))return[4,5,6,7,8,9,10,11].map(t=>{let n=(t=t,e.data().pluck(t).reduce((e,t)=>e+1*t,0)),a=o(t);r+=(u=n,f=a,"<td class='text-right has-data' data-details='"+JSON.stringify(f)+"'>"+u+"</td>")}),$("<tr/>").append("<td>"+t+"</td>").append(r);let a=[];if(-1===n.indexOf(t)){[4,5,6,7,8,9,10,11].map(e=>{o(e).map(e=>{a.push(e)})});let e=JSON.stringify(a);return r="<td colspan=7>"+t+"</td>",r+="<td class='has-data comment-form-show' data-comments=true data-details='"+e+"' colspan=2>",r+="<i class='fa fa-plus'></i> Comments</td>",$("<tr/>").append(r)}return $("<tr/>").append("<td colspan=9>"+t+"</td>")},endRender:null,dataSrc:[0,1,2]},columnDefs:[{targets:[0,1,2],visible:!1}],scrollY:(screen.height-300).toString()+"px",scrollCollapse:!0,responsive:!0,paging:!1});d.columns.adjust(),$("div.dataTables_filter input").addClass("search"),$("#rsr_table tbody").on("click","td",function(){let e=$(this).attr("data-comments"),t=(d.cell(this),$(this).attr("data-details"));e?(e=>{let t=(e=JSON.parse(e))[0].indicator_name;e[0].result_id;$("#modal-title").text("Add New Comment"),$("#modal-subtitle").text(t),s(e),o.post(r+"api/comment-validator",e).then(e=>{let t=e.data;return $("#comment-validator").val(t),!0}).catch(e=>{console.log(e)}),$("#save-comment").remove(),$(".comment-group").show(),$("#comment-title").val(""),$("#comment-input").val(""),$("#discard-comment").show(),$("#close-modal").hide(),$(".modal-footer").append('<button type="button" class="btn btn-primary" id="save-comment">Save Comment</button>'),$("#save-comment").on("click",()=>{console.log("test");let e={validator:(()=>$("#comment-validator").val())(),message:(()=>$("#comment-title").val())(),title:(()=>$("#comment-input").val())()};console.log(e),i(e)}),a("")})(t):(e=>{if((e=JSON.parse(e)).length>0){let t=e[0].indicator_name,n=e[0].indicator_id,i=e[0].dimension_name;$("#modal-title").text(t),$("#modal-subtitle").text(i);let s="<table class='table table-striped'>";return s+="<thead>",s+="<tr>",s+="<td>Report Date</td>",s+="<td>Country</td>",s+="<td>Disaggregation</td>",s+="<td>Value</td>",s+="</tr>",s+="</thead>",s+="<tbody>",e.map(e=>{s+="<tr>",s+="<td>"+e.date+"</td>",s+="<td>"+e.country+"</td>",s+="<td>"+e.commodity+"</td>",s+="<td>"+e.value+"</td>",s+="</tr>"}),s+="</tbody>",a(s+="<table>"),o.get(r+"/api/live/indicator_period_framework/indicator/"+n).then(e=>($(".text-comment").remove(),e.data.map(e=>{e.actual_comment.length>0&&$(".modal-comment").append("<div class='text-comment'>"+e.actual_comment+"</div>")}))),!0}})(t)}),$("#generate-report i").hide(),$("#scroll-report").click()};var u,f,h},function(e,t,n){n(32),e.exports=n(9)}]);