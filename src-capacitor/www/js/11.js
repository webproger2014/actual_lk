(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"6d35":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"q-pa-md q-gutter-sm"},[a("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:t.fullscreen,callback:function(s){t.fullscreen=s},expression:"fullscreen"}},[a("q-card",{staticClass:"bg-primary"},[a("q-carousel",{staticClass:"fullscreen",attrs:{swipeable:"",animated:"",arrows:t.arrows,dark:"",infinite:""},on:{input:function(s){return t.bgAd()}},scopedSlots:t._u([{key:"control",fn:function(){return[a("q-carousel-control",{attrs:{position:"top-right",offset:[18,18]}},[a("q-btn",{attrs:{push:"",round:"",dense:"",color:"white","text-color":"primary",icon:"close"},on:{click:function(s){t.fullscreen=!t.fullscreen}}})],1)]},proxy:!0}]),model:{value:t.slide,callback:function(s){t.slide=s},expression:"slide"}},t._l(t.slideItems,(function(s,e){return a("q-carousel-slide",{key:e,class:[t.bgSizeAuto?"auto":""],attrs:{name:e,"img-src":t.$store.state.constant.CDN_DOMAIN+s.url}})})),1)],1)],1)],1)},i=[],o={name:"fullimg",data:function(){return{slide:1,imgW:"",arrows:!0,slideItems:[],bgSizeAuto:!1,fullscreen:!1,statusDisplayDialog:!1}},created:function(){var t=this;this.$watch("$q.screen.width",(function(){t.bgAd()}))},methods:{zoom:function(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];1===s.length?this.arrows=!1:this.arrows=!0,this.slide=t,this.slideItems=s,this.fullscreen=!0,this.bgAd()},bgAd:function(){var t=this;if(!this.fullscreen)return!1;var s=new Image;s.onload=function(){s.width<window.innerWidth?t.bgSizeAuto=!0:t.bgSizeAuto=!1},s.src=this.$store.state.constant.CDN_DOMAIN+this.slideItems[this.slide].url}}},n=o,r=(a("c6e4"),a("2877")),c=a("eebe"),l=a.n(c),d=a("24e8"),u=a("f09f"),m=a("880c"),f=a("62cd"),v=a("32a7"),p=a("9c40"),_=Object(r["a"])(n,e,i,!1,null,"376411ba",null);s["a"]=_.exports;l()(_,"components",{QDialog:d["a"],QCard:u["a"],QCarousel:m["a"],QCarouselSlide:f["a"],QCarouselControl:v["a"],QBtn:p["a"]})},"98c8":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-xs-12 col-sm-6 col-md-4",attrs:{id:"videoplay"}},[a("div",{staticClass:"item-img relative-position"},[a("video",{staticClass:"position-absolute fit",attrs:{controls:"",src:t.srcvideo}})])])},i=[],o={name:"videoplay",props:["srcvideo","srcimg"],data:function(){return{play:!1}}},n=o,r=a("2877"),c=Object(r["a"])(n,e,i,!1,null,"4ac34982",null);s["a"]=c.exports},acab:function(t,s,a){},c6e4:function(t,s,a){"use strict";var e=a("acab"),i=a.n(e);i.a},c7c7:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"taskitem"}},[a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"col q-pa-md cont-task"},[a("q-btn",{attrs:{flat:"",icon:"keyboard_backspace"},on:{click:t.back}}),a("q-skeleton",{directives:[{name:"show",rawName:"v-show",value:0===t.statusTask,expression:"statusTask === 0"}],attrs:{type:"rect"}}),1===t.statusTask?a("q-chip",{attrs:{color:t.$_checkStatusTask(t.task.status_id),"text-color":"white"}},[t._v("\n        "+t._s(t.task.status_name)+"\n      ")]):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:2===t.statusTask,expression:"statusTask === 2"}],staticClass:"q-pa-md text-center"},[a("q-icon",{attrs:{size:"22px",name:"warning",color:"orange"}}),a("span",{staticClass:"text-caption q-ml-sm"},[t._v("Отсутствуют данные по задаче")])],1),a("q-separator",{staticClass:"q-mt-md"}),1===t.statusTask?a("div",[a("div",{staticClass:"q-mt-md"},[a("div",{staticClass:"col text-h6"},[t._v(t._s(t.task.title))])]),a("div",{staticClass:"q-mt-md"},[a("div",{staticClass:"col",staticStyle:{color:"#848484"}},[t._v(t._s(t.task.description))])]),a("itemphotos",{attrs:{taskPhotos:t.taskPhotos}}),a("itemvideo",{attrs:{taskVideo:t.taskVideo}}),a("div",{staticClass:"persons q-mt-md row"},[t.task.staff_photo?a("div",{staticClass:"col"},[a("div",{staticClass:"text-subtitle2 text-bold"},[t._v("Ответственный")]),a("div",{staticClass:"q-pt-sm"},[a("q-avatar",{staticClass:"q-mr-xs",attrs:{round:"",flat:"",size:"36px"}},[a("q-img",{attrs:{src:t.$store.state.constant.CDN_DOMAIN+t.task.staff_photo}}),a("q-tooltip",{attrs:{"content-class":"bg-blue-6","content-style":"font-size: 13px",offset:[10,10]}},[t._v("\n                  "+t._s(t.task.staff_role)+": "+t._s(t.task.staff_name)+"\n                ")])],1)],1)]):t._e(),t.task.creator_photo?a("div",{staticClass:"col"},[a("div",{staticClass:"text-subtitle2 text-bold"},[t._v("Поручитель")]),a("div",{staticClass:"q-pt-sm"},[a("q-avatar",{staticClass:"q-mr-xs",attrs:{round:"",flat:"",size:"36px"}},[a("q-img",{attrs:{src:t.$store.state.constant.CDN_DOMAIN+t.task.creator_photo}}),a("q-tooltip",{attrs:{"content-class":"bg-blue-6","content-style":"font-size: 13px",offset:[10,10]}},[t._v("\n                  "+t._s(t.task.creator_role)+": "+t._s(t.task.creator_name)+"\n                ")])],1)],1)]):t._e()]),a("div",{staticClass:"dates q-mt-lg"},[a("div",{staticClass:"text-subtitle2 text-bold"},[t._v("\n            Сроки\n            "),a("q-badge",{attrs:{align:"top",color:"orange",outline:""}},[t._v("\n              "+t._s(t.task.date_diff_create)+" дн\n            ")])],1),a("div",{staticClass:"text-caption date-item"},[t._v("Создано: "+t._s(t._f("dateString2")(t.task.date_create)))]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.task.date_accept,expression:"task.date_accept"}],staticClass:"text-caption date-item"},[t._v("Принято: "+t._s(t._f("dateString2")(t.task.date_accept)))]),a("div",{staticClass:"text-caption date-item"},[t._v("Выполним: "+t._s(t._f("dateString2")(t.task.date_plan)))]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.task.date_finish,expression:"task.date_finish"}],staticClass:"text-caption date-item"},[t._v("Выполнено: "+t._s(t._f("dateString2")(t.task.date_finish)))])])],1):t._e()],1)])])},i=[],o=a("967e"),n=a.n(o),r=(a("7f7f"),a("f751"),a("96cf"),a("fa84")),c=a.n(r),l=a("bd4c"),d=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"item-photos"}},[t.$_.isEmpty(t.taskPhotos)?t._e():a("div",{staticClass:"q-mt-md"},[a("div",{staticClass:"text-subtitle2 text-bold"},[t._v("Фото")]),a("div",{staticClass:"q-col-gutter-md row q-mt-xs item-start"},t._l(t.taskPhotos,(function(s,e){return a("div",{key:e,staticClass:"col-xs-12 col-sm-6 col-md-3"},[a("q-img",{staticClass:"cursor-pointer",attrs:{ratio:16/9,src:t.$store.state.constant.CDN_DOMAIN+s.url300},on:{click:function(s){return t.$refs.fullimg.zoom(e,t.taskPhotos)}}})],1)})),0)]),a("fullimg",{ref:"fullimg"})],1)},u=[],m=a("6d35"),f={name:"itemphotos",components:{fullimg:m["a"]},props:["taskPhotos"]},v=f,p=a("2877"),_=a("eebe"),k=a.n(_),h=a("068f"),g=Object(p["a"])(v,d,u,!1,null,null,null),b=g.exports;k()(g,"components",{QImg:h["a"]});var C=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"item-video"}},[t.$_.isEmpty(t.taskVideo)?t._e():a("div",{staticClass:"q-mt-md"},[a("div",{staticClass:"text-subtitle2 text-bold"},[t._v("Видео")]),a("div",{staticClass:"q-col-gutter-md row q-mt-xs item-start"},t._l(t.taskVideo,(function(s,e){return a("div",{key:e,staticClass:"col-xs-12 col-sm-6 col-md-4 video"},[a("videoplay",{attrs:{srcvideo:t.$store.state.constant.CDN_DOMAIN+s.url}})],1)})),0)])])},w=[],x=a("98c8"),q={name:"itemvideo",components:{videoplay:x["a"]},props:["taskVideo"]},$=q,y=Object(p["a"])($,C,w,!1,null,null,null),T=y.exports,D={name:"tasks",components:{itemphotos:b,itemvideo:T},data:function(){return{statusTask:0,task:[],taskPhotos:[],taskVideo:[]}},created:function(){this.$_getTask()},methods:{$_getTask:function(){var t=this;if(this.$route.params.id){this.task=[],this.taskPhotos=[],this.taskVideo=[];var s=this.$axios.get("task/get/".concat(this.$route.params.id));s.then((function(s){if(t.$_.isEmpty(s.data))t.statusTask=2;else{var a=s.data,e=new Date(a.task.date_create),i=new Date(a.task.date_plan),o=Math.abs(l["a"].getDateDiff(e,i));a.task.date_diff_create=o,t.task=a.task,t.taskPhotos=a.photos,t.taskVideo=a.video,t.statusTask=1,t.$_getUsersTask()}}))}},$_getUsersTask:function(){var t=this;return c()(n.a.mark((function s(){var a,e;return n.a.wrap((function(s){while(1)switch(s.prev=s.next){case 0:a=t.$store.dispatch("user/GET_USER",t.task.creator_id),a.then((function(s){if(s.data){var a=s.data;t.task=Object.assign({},t.task,{creator_photo:a.photo,creator_name:a.name,creator_role:a.role_name})}})),e=t.$store.dispatch("user/GET_USER",t.task.staff_id),e.then((function(s){if(s.data){var a=s.data;t.task=Object.assign({},t.task,{staff_photo:a.photo})}}));case 4:case"end":return s.stop()}}),s)})))()},$_checkStatusTask:function(t){var s="light-blue-6";switch(t){case 1:s="grey-6";break;case 2:s="light-blue-6";break;case 3:s="green-6";break}return s},back:function(){this.statusTask=0,this.$router.push("/task")}},watch:{$route:function(t,s){this.$_getTask()}}},S=D,N=(a("ee54"),a("9c40")),Q=a("293e"),A=a("b047"),I=a("0016"),O=a("eb85"),E=a("cb32"),z=a("05c0"),P=a("58a8"),V=Object(p["a"])(S,e,i,!1,null,null,null);s["default"]=V.exports;k()(V,"components",{QBtn:N["a"],QSkeleton:Q["a"],QChip:A["a"],QIcon:I["a"],QSeparator:O["a"],QAvatar:E["a"],QImg:h["a"],QTooltip:z["a"],QBadge:P["a"]})},e4e9:function(t,s,a){},ee54:function(t,s,a){"use strict";var e=a("e4e9"),i=a.n(e);i.a}}]);