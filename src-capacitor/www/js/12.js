(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{4980:function(t,e,i){"use strict";var s=i("b7e0"),a=i.n(s);a.a},b7e0:function(t,e,i){},b819:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"calculatequiz"}},[i("q-btn",{attrs:{flat:"",icon:"keyboard_backspace"},on:{click:function(e){return t.$router.push("/collection")}}}),i("div",{staticClass:"q-pa-md bg-white",staticStyle:{"max-width":"1016px",width:"100%",margin:"0 auto"}},[i("div",{staticClass:"quiz-vevanta",staticStyle:{"max-width":"1016px"}},[i("q-toolbar",{staticClass:"text-primary"},[i("q-icon",{attrs:{name:"list_alt",size:"20px"}}),i("q-toolbar-title",{staticClass:"quiz-title"},[t._v(t._s(t.title))])],1),i("q-separator"),i("q-tab-panels",{ref:"quiz",attrs:{animated:""},model:{value:t.panel,callback:function(e){t.panel=e},expression:"panel"}},[t._l(t.questions,(function(e,s){return i("q-tab-panel",{key:s,attrs:{name:s}},["radiogallery"===e.questions.type?i("radiogallery",{attrs:{indexquestion:s,data:e},on:{next:t.next,setStepButtons:t.setStepButtons,saveCheckedInput:t.saveCheckedInput,setStatusNext:t.setStatusNext,addSlideHistoryPrev:t.addSlideHistoryPrev,delSlideHistoryPrev:t.delSlideHistoryPrev}}):"radioitems"===e.questions.type?i("radioitems",{attrs:{indexquestion:s,data:e},on:{next:t.next,setStepButtons:t.setStepButtons,saveCheckedInput:t.saveCheckedInput,setStatusNext:t.setStatusNext,addSlideHistoryPrev:t.addSlideHistoryPrev,delSlideHistoryPrev:t.delSlideHistoryPrev}}):"checkboxitems"===e.questions.type?i("checkboxitems",{attrs:{indexquestion:s,data:e},on:{next:t.next,setStepButtons:t.setStepButtons,saveCheckedInput:t.saveCheckedInput,setStatusNext:t.setStatusNext,addSlideHistoryPrev:t.addSlideHistoryPrev,delSlideHistoryPrev:t.delSlideHistoryPrev}}):t._e()],1)})),i("q-tab-panel",{attrs:{name:"end"}},[i("endquiz",{attrs:{questions:t.questions},on:{setStepButtons:t.setStepButtons,addSlideHistoryPrev:t.addSlideHistoryPrev,delSlideHistoryPrev:t.delSlideHistoryPrev}})],1)],2),i("q-separator",{staticClass:"q-mb-lg"}),i("q-toolbar",[i("q-toolbar-title",{staticClass:"text-caption"},[t._v("Веванта")]),i("q-btn",{staticClass:"q-mr-md",staticStyle:{"border-color":"#e6e6e6"},attrs:{size:"12px",outline:"",round:"",color:"grey-5",icon:"keyboard_arrow_left",disable:"slide-0"===t.panel},on:{click:function(e){t.panel=t.historyPrev[t.historyPrev.length-1]}}}),i("q-btn",{directives:[{name:"show",rawName:"v-show",value:"end"!==t.panel,expression:"panel !== 'end'"}],staticClass:"next-btn",attrs:{rounded:"",color:"primary",label:"Далее","icon-right":"arrow_forward",disable:t.nextDisable},on:{click:function(e){t.panel=t.nextSlide}}})],1)],1)])],1)},a=[],n={"slide-0":{title:"Сколько будет этажей у Вашего дома?",checked:!1,next:"slide-1",questions:{type:"radiogallery",items:[{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_420,h_420,q_100,c_fill/y281vsnhxmxbkfpdkvay.jpg",title:"Одноэтажный дом"},{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_420,h_420,q_100,c_fill/oh6j2qi3i7odh8s4867o.jpg",title:"Дом с мансардой"},{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_420,h_420,q_100,c_fill/rq2aoe9x2eceiokzza78.jpg",title:"Двухэтажный дом"}]}},"slide-1":{title:"Какая квадратура дома?",checked:!1,next:"slide-2",questions:{type:"radioitems",items:[{title:"До 100 кв.м"},{title:"От 100 кв.м до 150 кв.м"},{title:"От 150 кв.м до 250 кв.м"},{title:"От 250 кв.м до 500 кв.м"},{title:"От 500 кв.м"}]}},"slide-2":{title:"У Вас есть земельный участок?",checked:!1,next:"slide-3",questions:{type:"radioitems",items:[{title:"Да"},{title:"На стадии оформления"},{title:"Нет",next:"slide-2-3"}]}},"slide-2-3":{title:"Нужна ли Вам помощь с подбором участка?",type:"radioitems",next:"slide-3",checked:!1,questions:{type:"radioitems",items:[{title:"Да"},{title:"Нет"}]}},"slide-3":{title:"Когда планируете строиться?",checked:!1,next:"slide-4",questions:{type:"radioitems",items:[{title:"В этом сезоне"},{title:"В течение года"},{title:"Через год и более"}]}},"slide-4":{title:"Какой материал несущих стен?",checked:!1,next:"slide-5",questions:{type:"radiogallery",items:[{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/ekxlp2rqip8u8sjznvk9.jpg",title:"Кирпич"},{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/n5caqgkcfrsigja8f5ci.jpg",title:"Керамические блоки"},{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/lbwdtmc1mhlo01ahreqt.jpg",title:"Керамзитоблок"},{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/u8n7nd5fm6ykhsyf2ng6.jpg",title:"Газоблок"},{img:"https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/lat5i2mtahaa80nxdb0o.jpg",title:"Не могу определиться с выбором"}]}},"slide-5":{title:"Какие виды строительных работ включить в смету?",checked:[],next:"end",questions:{type:"checkboxitems",items:[{title:"Установка окон и дверей"},{title:"Инженерные сети"},{title:"Облицовка фасада кирпичом"},{title:'Облицовка "Мокрый Фасад"'},{title:"Внутренняя отделка"}]}}},l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"radiogallery"}},[i("div",{staticClass:"q-mb-md"},[i("div",{staticClass:"question-title"},[t._v("\n     "+t._s(t.data.title)+"\n    ")])]),i("carousel",{ref:"carousel",staticClass:"text-center",attrs:{"per-page":t.column,"mouse-drag":!0,paginationActiveColor:"#d34085",paginationSize:13}},t._l(t.data.questions.items,(function(e,s){return i("slide",{key:s,attrs:{"data-name":"Слайд "+s}},[i("q-radio",{staticClass:"tpl-1",attrs:{val:s},on:{input:function(i){return t.next(e,i)}},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[i("div",{staticClass:"item-question",class:{"radio-active":t.checked===s}},[i("q-img",{staticClass:"col radius-top",attrs:{ratio:1,src:e.img}}),i("q-item-label",{staticClass:"q-mt-md q-pr-md q-pl-md title-item"},[t._v(t._s(e.title))])],1)])],1)})),1)],1)},o=[],r=i("0a63"),c={name:"radiogallery",props:["indexquestion","data"],components:{Carousel:r["Carousel"],Slide:r["Slide"]},data:function(){return{checked:!1,slide:0,column:3,slides:[]}},created:function(){var t=this;this.getColumn(),this.$watch("$q.screen.width",(function(){t.getColumn()})),this.$emit("setStepButtons",this.data.prev,this.data.next),this.checked=this.data.checked,this.$emit("setStatusNext",!1===this.checked),this.$emit("delSlideHistoryPrev",this.indexquestion)},computed:{thumbStyle:function(){return{right:"2px",borderRadius:"5px",backgroundColor:"rgb(212, 48, 125)",width:"5px",opacity:.75}}},methods:{next:function(t){var e=this;this.$emit("addSlideHistoryPrev",this.indexquestion),this.$emit("saveCheckedInput",this.indexquestion,this.checked),this.$emit("setStepButtons",t.next||this.data.next),setTimeout((function(){e.$emit("next",t.next||e.data.next)}),400)},getColumn:function(){var t=this.$q.screen.width;t<960&&(this.column=2),t>960&&(this.column=3)}}},d=c,u=(i("ed33"),i("2877")),h=i("eebe"),m=i.n(h),p=i("3786"),v=i("068f"),x=i("0170"),q=Object(u["a"])(d,l,o,!1,null,null,null),f=q.exports;m()(q,"components",{QRadio:p["a"],QImg:v["a"],QItemLabel:x["a"]});var _=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"radioitems"}},[i("div",[i("div",{staticClass:"q-mb-md"},[i("div",{staticClass:"question-title"},[t._v("\n        "+t._s(t.data.title)+"\n      ")])]),i("div",{staticClass:"row q-mt-lg"},t._l(t.data.questions.items,(function(e,s){return i("q-radio",{key:s,staticClass:"q-mr-lg q-mb-md item-question col-xs-12 col-sm-12 col-md-4",class:{"radio-active":t.checked===s},attrs:{val:s},on:{input:function(i){return t.next(e,i)}},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[i("q-item-label",{staticClass:"title-item"},[t._v(t._s(e.title))])],1)})),1)])])},k=[],g={name:"radioitems",props:["indexquestion","data"],data:function(){return{checked:!1}},created:function(){this.$emit("setStepButtons",this.data.next),this.checked=this.data.checked,this.$emit("setStatusNext",!1===this.checked),this.$emit("delSlideHistoryPrev",this.indexquestion)},methods:{next:function(t){var e=this;this.$emit("addSlideHistoryPrev",this.indexquestion),this.$emit("saveCheckedInput",this.indexquestion,this.checked),this.$emit("setStepButtons",t.next||this.data.next),setTimeout((function(){e.$emit("next",t.next||e.data.next)}),400)}}},y=g,b=Object(u["a"])(y,_,k,!1,null,null,null),S=b.exports;m()(b,"components",{QRadio:p["a"],QItemLabel:x["a"]});var C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"checkboxitems"}},[i("div",{staticClass:"q-mb-md"},[i("div",{staticClass:"question-title"},[t._v("\n     "+t._s(t.data.title)+"\n    ")])]),i("div",{staticClass:"row q-mt-lg"},t._l(t.data.questions.items,(function(e,s){return i("q-checkbox",{key:s,staticClass:"q-mr-lg q-mb-md q-pr-md item-question col-xs-12 col-sm-12 col-md-4",attrs:{val:s},on:{input:function(i){return t.next(e)}},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[i("q-item-label",{staticClass:"title-item"},[t._v(t._s(e.title))])],1)})),1)])},w=[],$={name:"checkboxitems",props:["indexquestion","data"],data:function(){return{checked:[]}},created:function(){this.$emit("setStepButtons",this.data.next),this.checked=this.data.checked,this.$emit("setStatusNext",this.$_.isEmpty(this.checked)),this.$emit("delSlideHistoryPrev",this.indexquestion)},methods:{next:function(t){this.$emit("addSlideHistoryPrev",this.indexquestion),this.$emit("setStatusNext",this.$_.isEmpty(this.checked)),this.$emit("saveCheckedInput",this.indexquestion,this.checked)}}},P=$,H=i("8f8e"),I=Object(u["a"])(P,C,w,!1,null,null,null),Q=I.exports;m()(I,"components",{QCheckbox:H["a"],QItemLabel:x["a"]});var z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"endquiz"}},[t._m(0),i("div",{staticClass:"row flex-center"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.status,expression:"!status"}]},[i("div",[i("q-knob",{staticClass:"text-primary q-ma-md",attrs:{disable:"","show-value":"",size:"150px",thickness:.22,color:"primary","track-color":"grey-3"},model:{value:t.progress,callback:function(e){t.progress=e},expression:"progress"}})],1),i("div",{staticClass:"fit text-center"},[t._v("\n        "+t._s(t.msg)+"\n      ")])]),i("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:1===t.status,expression:"status === 1"}],staticClass:"fit text-center"},[i("div",{staticClass:"col q-mt-md"},[i("q-btn",{staticStyle:{width:"100%",background:"#1074b9"},attrs:{unelevated:"",size:"17px","text-color":"white",label:"Получить результат",type:"submit"},on:{click:t.send}})],1)])]),i("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:2===t.status,expression:"status === 2"}],staticClass:"fit text-center"},[i("div",{staticClass:"text-h5"},[t._v("\n       Спасибо за заявку! В ближайшее время мы свяжемся с Вами!\n    ")])])])],1)])},j=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"q-mb-md"},[i("div",{staticClass:"question-title"})])}],B=(i("7f7f"),{name:"endquiz",props:["questions"],data:function(){return{progress:10,msg:"Подготовка расчёта",resultCalculateMsg:"",status:0,phone:"",name:"",politika:!0}},created:function(){this.$_startProgress(),this.$_createMsg()},methods:{$_startProgress:function(){var t=this;(this.progress+=4)<100?setTimeout((function(){t.$_startProgress()}),100):(this.msg="Расчёт готов",setTimeout((function(){t.status=1}),600))},$_createMsg:function(){var t=this,e=function(e){e=t.questions[e];var s=e.questions.items;if(t.$_.isArray(e.checked))t.resultCalculateMsg+="\n            Вопрос: ".concat(e.title,"\n            Ответ:\n          "),e.checked.forEach((function(e){t.resultCalculateMsg+="\n            ".concat(s[e].title)}));else{var a=s[e.checked].title;t.resultCalculateMsg+="\n            Вопрос: ".concat(e.title,"\n            Ответ: ").concat(a,"\n          ")}i=e};for(var i in this.questions)e(i)},send:function(){this.$axios.post("https://rest.vevanta.com/calc/send/calc_crm",{msg:this.resultCalculateMsg,phone:this.$store.state.auth.user.phone,name:this.$store.state.auth.user.name}),this.status=2}}}),N=B,E=i("3845"),T=i("9c40"),M=Object(u["a"])(N,z,j,!1,null,null,null),O=M.exports;m()(M,"components",{QKnob:E["a"],QBtn:T["a"]});var R={name:"calculatequiz",components:{radiogallery:f,radioitems:S,checkboxitems:Q,endquiz:O},data:function(){return{title:"Расчёт стоимости дома",panel:"slide-0",historyPrev:[],nextSlide:"",backSlide:"",nextDisable:!0,questions:n}},methods:{addSlideHistoryPrev:function(t){this.historyPrev.push(t)},delSlideHistoryPrev:function(t){this.historyPrev=this.historyPrev.filter((function(e){return e!==t}))},setStatusNext:function(t){this.nextDisable=t},saveCheckedInput:function(t,e){this.questions[t].checked=e},setStepButtons:function(t){this.nextSlide=t},next:function(t,e){this.panel=t}}},D=R,L=(i("4980"),i("65c6")),A=i("0016"),J=i("6ac5"),K=i("eb85"),F=i("adad"),G=i("823b"),U=i("66e5"),V=Object(u["a"])(D,s,a,!1,null,null,null);e["default"]=V.exports;m()(V,"components",{QBtn:T["a"],QToolbar:L["a"],QIcon:A["a"],QToolbarTitle:J["a"],QSeparator:K["a"],QTabPanels:F["a"],QTabPanel:G["a"],QRadio:p["a"],QItem:U["a"]})},e85a:function(t,e,i){},ed33:function(t,e,i){"use strict";var s=i("e85a"),a=i.n(s);a.a}}]);