(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{107:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(28),a=n.n(i),o=(n(77),n(78),n(34)),s=n(5),u=n(50),j=n.n(u),l=n(61),d=n(26),f=n(132),b=n(136),h=n(137),x=n(135),O=n(3);function p(){var e=Object(c.useState)(""),t=Object(d.a)(e,2);t[0],t[1],Object(s.f)();return Object(O.jsx)(x.a,{sx:{flexGrow:1},children:Object(O.jsx)(f.a,{position:"static",children:Object(O.jsx)(b.a,{children:Object(O.jsx)(h.a,{variant:"h6",noWrap:!0,component:"div",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Social Distancing Analyser"})})})})}var m=n(134),v=n(66),w=n.n(v),g=n(131);function S(){var e=Object(c.useState)(null),t=Object(d.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)(!1),a=Object(d.a)(i,2),o=a[0],s=a[1],u=function(){var e=Object(l.a)(j.a.mark((function e(t){var c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),s(!0),(c=new FormData).append("file",n.files[0]),e.next=6,w()({method:"POST",url:"/video_data",timeout:2e5,data:c,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return e})).then((function(e){console.log(e)}));case 6:return e.next=8,fetch("/video/"+n.files[0].name).then((function(e){e.blob().then((function(e){var t=window.URL.createObjectURL(e),c=document.createElement("a");c.href=t,c.download=n.files[0].name,c.click()}))}));case 8:s(!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(p,{}),Object(O.jsx)("h1",{children:"Submit Video for Analysis"}),Object(O.jsxs)("form",{onSubmit:u,method:"post",children:[Object(O.jsx)("input",{type:"file",ref:function(e){r(e)},accept:"video/*"}),Object(O.jsx)("input",{type:"submit"})]}),Object(O.jsx)(g.a,{open:o,sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},children:Object(O.jsx)(m.a,{color:"inherit"})})]})}var y=function(){return Object(O.jsx)("div",{children:Object(O.jsx)(o.a,{children:Object(O.jsx)(s.c,{children:Object(O.jsx)(s.a,{exact:!0,path:"/",children:Object(O.jsx)(S,{})})})})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};a.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(y,{})}),document.getElementById("root")),F()},77:function(e,t,n){},78:function(e,t,n){}},[[107,1,2]]]);
//# sourceMappingURL=main.e4c77273.chunk.js.map