(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"0066":function(t,e,i){},"9aad":function(t,e,i){"use strict";var a=i("0066"),s=i.n(a);s.a},ce3b:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"project"}},[t._m(0),i("div",{staticClass:"q-pa-md"},[i("q-list",t._l(t.projects,(function(e,a){return i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:a,staticClass:"lt-xs-pl0",attrs:{color:"purple",clickable:""}},[i("q-item-section",{attrs:{thumbnail:""}},[i("q-img",{staticClass:"img-def lt-xs-img1",staticStyle:{"max-width":"300px"},attrs:{src:e.img_min}})],1),i("q-item-section",[i("q-item-label",{staticClass:"text-body1"},[t._v(t._s(e.name))])],1),i("q-item-section",{attrs:{center:"",side:""}},[i("div",{staticClass:"text-grey-8 q-gutter-xs text-center"},[i("q-icon",{attrs:{name:"visibility",size:"20px"}}),i("div",[t._v(t._s(t._f("number")(e.views)))])],1)]),i("q-item-section",{attrs:{center:"",side:""}},[i("div",{staticClass:"text-grey-8 q-gutter-xs text-center"},[i("q-icon",{attrs:{name:"rounded_cornery",size:"20px"}}),i("div",[t._v(t._s(t._f("currency")(e.square))+" м"),i("sup",[t._v("2")])])],1)])],1)})),1)],1),i("q-drawer",{attrs:{"show-if-above":"",side:"right",elevated:""},model:{value:t.right,callback:function(e){t.right=e},expression:"right"}},[i("div",{staticClass:"q-pa-md"},[t._v("\n      Этажи:\n      "),i("q-checkbox",{attrs:{label:"1",color:"blue"},model:{value:t.filter.floors[0],callback:function(e){t.$set(t.filter.floors,0,e)},expression:"filter.floors[0]"}}),i("q-checkbox",{attrs:{label:"2",color:"blue"},model:{value:t.filter.floors[1],callback:function(e){t.$set(t.filter.floors,1,e)},expression:"filter.floors[1]"}}),i("q-checkbox",{attrs:{label:"3",color:"blue"},model:{value:t.filter.floors[2],callback:function(e){t.$set(t.filter.floors,2,e)},expression:"filter.floors[2]"}}),i("q-checkbox",{attrs:{label:"4",color:"blue"},model:{value:t.filter.floors[3],callback:function(e){t.$set(t.filter.floors,3,e)},expression:"filter.floors[3]"}})],1),i("div",{staticClass:"fixed-bottom bg-white"},[i("q-separator"),i("div",{staticClass:"row"},[i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-light-blue-14",attrs:{clickable:"",to:"/profile"}},[i("q-item-section",[i("q-icon",{attrs:{name:"perm_identity",size:"22px"}})],1)],1),i("q-separator",{attrs:{vertical:""}}),i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-light-blue-14",attrs:{clickable:"",to:"/team"}},[i("q-item-section",[i("q-icon",{attrs:{name:"people_outline",size:"22px"}})],1)],1),i("q-separator",{attrs:{vertical:""}}),i("q-item",{staticClass:"text-grey-5",attrs:{clickable:""},on:{click:function(e){return t.$store.dispatch("auth/LOGOUT")}}},[i("q-item-section",[i("q-icon",{attrs:{name:"exit_to_app",size:"22px"}})],1)],1)],1)],1),i("div",{staticStyle:{"padding-bottom":"50px"}})])],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"q-pa-md"},[i("div",{staticClass:"text-h4 xs-text-h4"},[t._v("\n      Список проектов\n    ")])])}],o=i("bc3a"),r=i.n(o),l={name:"project",data:function(){return{right:!0,filter:{floors:[1,2,3,4]},projects:[{id:134,name:"Проект дома Мокко",square:137,img_min:"https://vevanta.com/wp-content/uploads/2019/02/stroitelstvo_domov_tumen-5.jpg",views:4987},{id:135,name:"Проект дома Орхидея",square:127,img_min:"https://vevanta.com/wp-content/uploads/2019/01/1-25.jpg",views:4347},{id:136,name:"Проект дома Елена с Гаражом",square:147.3,img_min:"https://vevanta.com/wp-content/uploads/2019/02/strotelstvo_domov_tumen_3.jpg",views:3984},{id:137,name:"Проект дома Елисейские поля",square:250,img_min:"https://vevanta.com/wp-content/uploads/2019/02/stroitelstvo_domov_tumen_2-4.jpg",views:90941},{id:138,name:"Проект дома Астрид",square:111.57,img_min:"https://vevanta.com/wp-content/uploads/2019/04/stroitelstvo_domov_tumen_4.1.jpg",views:34794}]}},created:function(){r.a.get("https://b24-tzsclk.bitrix24.ru/oauth/token/?grant_type=authorization_code&client_id=YQm25UdWRWkMJONr6s0T1ouL3gHmdwmiJO7iifnFDnC5uNXn5q&client_secret=local.5e8467fa7c9a52.78490269&code=a87c845e0045fc7a0045fc7400000001201c03cb0f758fd4648a40a66223778016543").then((function(t){console.log(t)})).catch((function(t){console.log(t)}))},methods:{}},c=l,n=(i("9aad"),i("2877")),m=i("eebe"),p=i.n(m),u=i("1c1c"),d=i("66e5"),v=i("4074"),f=i("068f"),b=i("0170"),_=i("0016"),q=i("9404"),x=i("8f8e"),g=i("eb85"),h=i("714f"),w=Object(n["a"])(c,a,s,!1,null,null,null);e["default"]=w.exports;p()(w,"components",{QList:u["a"],QItem:d["a"],QItemSection:v["a"],QImg:f["a"],QItemLabel:b["a"],QIcon:_["a"],QDrawer:q["a"],QCheckbox:x["a"],QSeparator:g["a"]}),p()(w,"directives",{Ripple:h["a"]})}}]);