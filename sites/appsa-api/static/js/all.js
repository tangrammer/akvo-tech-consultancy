!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){"use strict";var r=n(1),o=n(17),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===i.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:u,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},deepMerge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]="object"==typeof n?e({},n):n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(23),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(void 0!==t&&"[object process]"===Object.prototype.toString.call(t)?s=n(5):"undefined"!=typeof XMLHttpRequest&&(s=n(5)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(i)})),e.exports=c}).call(this,n(22))},function(e,t,n){"use strict";var r=n(0),o=n(24),i=n(2),a=n(26),s=n(27),c=n(6);e.exports=function(e){return new Promise((function(t,u){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var f=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",h=e.auth.password||"";d.Authorization="Basic "+btoa(p+":"+h)}if(f.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),f.timeout=e.timeout,f.onreadystatechange=function(){if(f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in f?a(f.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?f.response:f.responseText,status:f.status,statusText:f.statusText,headers:n,config:e,request:f};o(t,u,r),f=null}},f.onabort=function(){f&&(u(c("Request aborted",e,"ECONNABORTED",f)),f=null)},f.onerror=function(){u(c("Network Error",e,null,f)),f=null},f.ontimeout=function(){u(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",f)),f=null},r.isStandardBrowserEnv()){var m=n(28),b=(e.withCredentials||s(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;b&&(d[e.xsrfHeaderName]=b)}if("setRequestHeader"in f&&r.forEach(d,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:f.setRequestHeader(t,e)})),e.withCredentials&&(f.withCredentials=!0),e.responseType)try{f.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&f.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){f&&(f.abort(),u(e),f=null)})),void 0===l&&(l=null),f.send(l)}))}},function(e,t,n){"use strict";var r=n(25);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){t=t||{};var n={};return r.forEach(["url","method","params","data"],(function(e){void 0!==t[e]&&(n[e]=t[e])})),r.forEach(["headers","auth","proxy"],(function(o){r.isObject(t[o])?n[o]=r.deepMerge(e[o],t[o]):void 0!==t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):void 0!==e[o]&&(n[o]=e[o])})),r.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])})),n}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){n(10),e.exports=n(33)},function(e,t,n){"use strict";n.r(t);n(11);const r=n(15),o="/appsa-api";let i={},a=()=>$("input[name='project-option']:checked").map((function(e,t){return $(t).val()})).get(),s=()=>$("input[name='project-selection']:checked").map((function(e,t){return $(t).val()})).get(),c=e=>$("#period-"+e+"-select option:selected").text(),u=()=>{let e=(()=>$("input[name='period-type']:checked").map((function(e,t){return $(t).val()})).get())(),t="";return e.length>0&&(t=e[0]),"yearly"===t&&$("#period-semester").prop("checked",!1),"semester"===t&&$("#period-yearly").prop("checked",!1),{filter_date:c(t),project_id:s(),project_option:a()}};$("#generate-report").on("click",()=>{i=u(),console.log(i),function(e){$("#generate-report i").show(),r.post(o+"/api/datatables/"+e.project_id,e).then((function(e){e.data.map((function(e,t){let n="<tr>";return n+="<td>"+e.project_title+"</td>",n+="<td>"+e.indicator+"</td>",n+="<td style='padding-left:50px;'>"+e.commodity+"</td>",n+="<td class='text-right'>"+e["CA-MW"]+"</td>",n+="<td class='text-right'>"+e["CA-MZ"]+"</td>",n+="<td class='text-right'>"+e["CA-ZA"]+"</td>",n+="<td class='text-right'>"+e["TG-MW"]+"</td>",n+="<td class='text-right'>"+e["TG-MZ"]+"</td>",n+="<td class='text-right'>"+e["TG-ZA"]+"</td>",n+="</tr>",$("#rsr_table tbody").append(n),n})),$("#rsr_table").show(),$("#rsr_table").DataTable({dom:"Brftip",ordering:!1,buttons:[{extend:"print",text:"Print Report",exportOptions:{modifier:{page:"current"}}}],rowGroup:{dataSrc:[0,1]},columnDefs:[{targets:[0,1],visible:!1}],scrollY:"600px",scrollCollapse:!0,paging:!1}),$("#generate-report i").hide(),$("#scroll-report").click()})).catch((function(e){console.log(e)}))}(i)})},function(e,t,n){var r=n(12);"string"==typeof r&&(r=[[e.i,r,""]]);var o={insert:"head",singleton:!1};n(14)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(13)(!1)).push([e.i,"/*!\n * Start Bootstrap - Resume v5.0.7 (https://startbootstrap.com/template-overviews/resume)\n * Copyright 2013-2019 Start Bootstrap\n * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-resume/blob/master/LICENSE)\n */\n\nbody {\n    font-family: Muli, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n    padding-top: 54px;\n    color: #868e96\n}\n\n@media (min-width:992px) {\n    body {\n        padding-top: 0;\n        padding-left: 17rem\n    }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font-family: 'Saira Extra Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n    font-weight: 700;\n    text-transform: uppercase;\n    color: #343a40\n}\n\nh1 {\n    font-size: 6rem;\n    line-height: 5.5rem\n}\n\nh2 {\n    font-size: 3.5rem\n}\n\nh3 {\n    font-size: 2rem\n}\n\np.lead {\n    font-size: 1.15rem;\n    font-weight: 400\n}\n\n.subheading {\n    text-transform: uppercase;\n    font-weight: 500;\n    font-family: 'Saira Extra Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n    font-size: 1.5rem\n}\n\n.social-icons a {\n    display: inline-block;\n    height: 3.5rem;\n    width: 3.5rem;\n    background-color: #495057;\n    color: #fff !important;\n    border-radius: 100%;\n    text-align: center;\n    font-size: 1.5rem;\n    line-height: 3.5rem;\n    margin-right: 1rem\n}\n\n.social-icons a:last-child {\n    margin-right: 0\n}\n\n.social-icons a:hover {\n    background-color: #44b045\n}\n\n.dev-icons {\n    font-size: 3rem\n}\n\n.dev-icons .list-inline-item i:hover {\n    color: #44b045\n}\n\n#sideNav .navbar-nav .nav-item .nav-link {\n    font-weight: 800;\n    letter-spacing: .05rem;\n    text-transform: uppercase\n}\n\n#sideNav .navbar-toggler:focus {\n    outline-color: #d48a6e\n}\n\n@media (min-width:992px) {\n    #sideNav {\n        text-align: center;\n        position: fixed;\n        top: 0;\n        left: 0;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        width: 17rem;\n        height: 100vh\n    }\n    #sideNav .navbar-brand {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        margin: auto auto 0;\n        padding: .5rem\n    }\n    #sideNav .navbar-brand .img-profile {\n        max-width: 10rem;\n        max-height: 10rem;\n        border: .5rem solid rgba(255, 255, 255, .2)\n    }\n    #sideNav .navbar-collapse {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: start;\n        -ms-flex-align: start;\n        align-items: flex-start;\n        -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n        flex-grow: 0;\n        width: 100%;\n        margin-bottom: auto\n    }\n    #sideNav .navbar-collapse .navbar-nav {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        width: 100%\n    }\n    #sideNav .navbar-collapse .navbar-nav .nav-item {\n        display: block\n    }\n    #sideNav .navbar-collapse .navbar-nav .nav-item .nav-link {\n        display: block\n    }\n}\n\nsection.resume-section {\n    padding-top: 5rem !important;\n    padding-bottom: 5rem !important;\n    max-width: 75rem\n}\n\nsection.resume-section .resume-item .resume-date {\n    min-width: none\n}\n\n@media (min-width:768px) {\n    section.resume-section {\n        min-height: 100vh\n    }\n    section.resume-section .resume-item .resume-date {\n        min-width: 18rem\n    }\n}\n\n@media (min-width:992px) {\n    section.resume-section {\n        padding-top: 3rem !important;\n        padding-bottom: 3rem !important\n    }\n}\n\n.bg-primary {\n    background-color: #44b045 !important\n}\n\n.text-primary {\n    color: #44b045 !important\n}\n\na {\n    color: #44b045\n}\n\na:active,\na:focus,\na:hover {\n    color: #824027\n}\n\n.ios-toggle-container{\n    width:60px;\n    margin:0px auto;\n    text-align:center;\n}\n\n.ios-toggle,.ios-toggle:active{\nposition:absolute;\n/*top:-5000px;*/\nheight:0;\nwidth:0;\nopacity:0;\nborder:none;\noutline:none;\n}\n.checkbox-label{\ndisplay:block;\nposition:relative;\npadding:10px;\nmargin-bottom:20px;\nfont-size:12px;\nline-height:16px;\nwidth:100%;\nheight:36px;\n/*border-radius*/\n-webkit-border-radius:18px;\n   -moz-border-radius:18px;\n        border-radius:18px;\nbackground:#e2e3e5;\ncursor:pointer;\nbox-shadow: inset 0 0 0 20px #e2e3e5, 0 0 0 2px #e2e3e5;\n}\n.checkbox-label:before{\ncontent:'';\ndisplay:block;\nposition:absolute;\nz-index:1;\nline-height:34px;\ntext-indent:40px;\nheight:36px;\nwidth:36px;\n/*border-radius*/\n-webkit-border-radius:100%;\n   -moz-border-radius:100%;\n        border-radius:100%;\ntop:0px;\nleft:0px;\nright:auto;\nbackground:white;\n/*box-shadow*/\n-webkit-box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;\n   -moz-box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;\n        box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;\n}\n.checkbox-label:after{\ncontent:attr(data-off);\ndisplay:block;\nposition:absolute;\nz-index:0;\ntop:0;\nleft:-300px;\npadding:10px;\nheight:100%;\nwidth:300px;\ntext-align:right;\ncolor:#bfbfbf;\nwhite-space:nowrap;\n}\n.ios-toggle:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n   -moz-box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n        box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n}\n.ios-toggle:checked + .checkbox-label:before{\nleft:calc(100% - 36px);\n/*box-shadow*/\n-webkit-box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);\n   -moz-box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);\n        box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);\n}\n.ios-toggle:checked + .checkbox-label:after{\ncontent:attr(data-on);\nleft:60px;\nwidth:36px;\n}\n/* GREEN CHECKBOX */\n\n#checkbox1 + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;\n   -moz-box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;\n        box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;\n}\n#checkbox1:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n   -moz-box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n        box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);\n}\n#checkbox1:checked + .checkbox-label:after{\ncolor:rgba(19,191,17,1);\n}\n/* RED CHECKBOX */\n\n#checkbox2 + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 0px #f35f42,0 0 0 2px #dddddd;\n   -moz-box-shadow:inset 0 0 0 0px #f35f42,0 0 0 2px #dddddd;\n        box-shadow:inset 0 0 0 0px #f35f42,0 0 0 2px #dddddd;\n}\n#checkbox2:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 20px #f35f42,0 0 0 2px #f35f42;\n   -moz-box-shadow:inset 0 0 0 20px #f35f42,0 0 0 2px #f35f42;\n        box-shadow:inset 0 0 0 20px #f35f42,0 0 0 2px #f35f42;\n}\n#checkbox2:checked + .checkbox-label:after{\ncolor:#f35f42;\n}\n/* BLUE CHECKBOX */\n\n#checkbox3 + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 0px #1fc1c8,0 0 0 2px #dddddd;\n   -moz-box-shadow:inset 0 0 0 0px #1fc1c8,0 0 0 2px #dddddd;\n        box-shadow:inset 0 0 0 0px #1fc1c8,0 0 0 2px #dddddd;\n}\n#checkbox3:checked + .checkbox-label{\n/*box-shadow*/\n-webkit-box-shadow:inset 0 0 0 20px #1fc1c8,0 0 0 2px #1fc1c8;\n   -moz-box-shadow:inset 0 0 0 20px #1fc1c8,0 0 0 2px #1fc1c8;\n        box-shadow:inset 0 0 0 20px #1fc1c8,0 0 0 2px #1fc1c8;\n}\n#checkbox3:checked + .checkbox-label:after{\ncolor:#1fc1c8;\n}\n",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot).concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var a=0;a<e.length;a++){var s=e[a];null!=s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),t.push(s))}},t}},function(e,t,n){"use strict";var r,o={},i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}();function s(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function c(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=o[r.id],a=0;if(i){for(i.refs++;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(b(r.parts[a],t))}else{for(var s=[];a<r.parts.length;a++)s.push(b(r.parts[a],t));o[r.id]={id:r.id,refs:1,parts:s}}}}function u(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var r=n.nc;r&&(e.attributes.nonce=r)}if(Object.keys(e.attributes).forEach((function(n){t.setAttribute(n,e.attributes[n])})),"function"==typeof e.insert)e.insert(t);else{var o=a(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}return t}var l,d=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function f(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=d(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function p(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o&&e.setAttribute("media",o),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var h=null,m=0;function b(e,t){var n,r,o;if(t.singleton){var i=m++;n=h||(h=u(t)),r=f.bind(null,n,i,!1),o=f.bind(null,n,i,!0)}else n=u(t),r=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=s(e,t);return c(n,t),function(e){for(var r=[],i=0;i<n.length;i++){var a=n[i],u=o[a.id];u&&(u.refs--,r.push(u))}e&&c(s(e,t),t);for(var l=0;l<r.length;l++){var d=r[l];if(0===d.refs){for(var f=0;f<d.parts.length;f++)d.parts[f]();delete o[d.id]}}}}},function(e,t,n){e.exports=n(16)},function(e,t,n){"use strict";var r=n(0),o=n(1),i=n(18),a=n(7);function s(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=s(n(4));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=n(8),c.CancelToken=n(31),c.isCancel=n(3),c.all=function(e){return Promise.all(e)},c.spread=n(32),e.exports=c,e.exports.default=c},function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,n){"use strict";var r=n(0),o=n(2),i=n(19),a=n(20),s=n(7);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(r.merge(n||{},{method:e,url:t}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,o){return this.request(r.merge(o||{},{method:e,url:t,data:n}))}})),e.exports=c},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(21),i=n(3),a=n(4),s=n(29),c=n(30);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!s(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,u=[],l=!1,d=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&p())}function p(){if(!l){var e=s(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++d<t;)c&&c[d].run();d=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||l||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(6);e.exports=function(e,t,n){var o=n.config.validateStatus;!o||o(n.status)?e(n):t(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}})),a):a}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(8);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t){!function(e){"use strict";e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click((function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=e(this.hash);if((t=t.length?t:e("[name="+this.hash.slice(1)+"]")).length)return e("html, body").animate({scrollTop:t.offset().top},1e3,"easeInOutExpo"),!1}})),e(".js-scroll-trigger").click((function(){e(".navbar-collapse").collapse("hide")})),e("body").scrollspy({target:"#sideNav"})}(jQuery)}]);