(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{2440:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"auth"}},[s("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.stateReset,expression:"!stateReset"}],staticClass:"q-pa-md row absolute-center",staticStyle:{width:"100%","max-width":"560px"}},[s("div",{staticStyle:{width:"100%"}},[s("form",{staticClass:"q-gutter-md",on:{submit:function(e){return e.preventDefault(),t.createAccount(e)}}},[s("div",{staticClass:"text-center"},[s("img",{staticStyle:{"max-width":"100%"},attrs:{src:"/statics/logo400x100-2.png",alt:""}})]),s("div",{staticClass:"text-h5 text-center"},[t._v("\n          Регистрация\n        ")]),s("q-input",{attrs:{prefix:"7",mask:"(###) ###-##-##",square:"",filled:"",label:"Логин",name:"phone","unmasked-value":"",hint:"7 (XXX) XXX-XX-XX"},on:{keydown:function(e){t.settings.login=t.fixPhone(t.settings.login)},keyup:function(e){t.settings.login=t.fixPhone(t.settings.login)}},model:{value:t.settings.login,callback:function(e){t.$set(t.settings,"login",e)},expression:"settings.login"}}),s("q-input",{attrs:{filled:"",type:t.settings.showPsw?"password":"text",label:"Пароль",name:"password"},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.settings.showPsw?"visibility_off":"visibility"},on:{click:function(e){t.settings.showPsw=!t.settings.showPsw}}})]},proxy:!0}]),model:{value:t.settings.psw,callback:function(e){t.$set(t.settings,"psw","string"===typeof e?e.trim():e)},expression:"settings.psw"}}),s("q-select",{attrs:{filled:"","use-input":"",options:t.cityes,label:"Ваш город",behavior:"menu"},on:{filter:t.getCity},scopedSlots:t._u([{key:"no-option",fn:function(){return[s("q-item",[s("q-item-section",{staticClass:"text-grey"},[t._v("\n                  Ничего не найдено\n                ")])],1)]},proxy:!0}]),model:{value:t.selectCity,callback:function(e){t.selectCity=e},expression:"selectCity"}}),s("div",{staticClass:"col"},[s("q-btn",{staticStyle:{width:"100%"},attrs:{unelevated:"",color:"secondary",size:"17px",label:"Создать аккаунт",type:"submit"}})],1),s("div",{staticClass:"col text-center"},[s("q-chip",{attrs:{clickable:"",color:"info","text-color":"white",icon:"lock_open"},on:{click:function(e){return t.$router.push("/auth")}}},[t._v("\n            Войти\n          ")])],1)],1)]),t.loadRequest?s("div",{staticClass:"absolute-top full-height full-width",staticStyle:{"background-color":"rgba(255, 255, 255, 0.86)"}},[s("q-circular-progress",{staticClass:"q-ma-md absolute-center",attrs:{indeterminate:"",size:"40px",color:"light-blue-6"}})],1):t._e()])])],1)},a=[],n=(s("6762"),s("2fdb"),{name:"auth",data:function(){return{stateReset:0,loadRequest:0,settings:{login:"",psw:"",showPsw:!0},selectCity:{},cityes:[{value:1,label:"Москва",sublabel:"Москва и Московская обл."},{value:2229,label:"Тюмень",sublabel:"Тюменская обл."},{value:2228,label:"Тобольск",sublabel:"Тюменская обл."},{value:1888,label:"Екатеринбург",sublabel:"Свердловская обл."}]}},created:function(){this.getCityFromData()},methods:{getCityFromData:function(){this.dataCity=Date(),console.log(this.dataCity);var t=this.dataCity;t.includes("GMT+0500")?this.dataCity="Тюмень":t.includes("GMT+0300")?this.dataCity="Москва":this.dataCity="Тюмень","Тюмень"===this.dataCity?this.selectCity={value:2229,label:"Тюмень",sublabel:"Тюменская обл."}:"Москва"===this.dataCity?this.selectCity={value:1,label:"Москва",sublabel:"Москва и Московская обл."}:this.selectCity={value:2229,label:"Тюмень",sublabel:"Тюменская обл."}},getCity:function(t,e,s){var i=this;if(t||e(),t){var a=this.$axios.post("v1/city/search",{s:t});a.then((function(t){i.$_.isEmpty(t)?s():(e(),console.log(t),i.cityes=t.data)})).catch((function(t){s()}))}},createAccount:function(){var t=this;if(this.settings.login)if(10===this.settings.login.length)if(this.settings.psw)if(this.selectCity){this.loadRequest=1;var e={login:this.settings.login,password:this.settings.psw,city_id:this.selectCity};this.$store.dispatch("auth/REGISTER",e).then((function(s){t.$store.dispatch("auth/LOGIN",e).then((function(e){t.setPhoneProfile()})).catch((function(e){t.loadRequest=0}))})).catch((function(e){t.loadRequest=0}))}else this.$MSG_ERROR("Выберете город");else this.$MSG_ERROR("Введите пароль");else this.$MSG_ERROR("Некорректный номер телефона");else this.$MSG_ERROR("Введите логин")},setPhoneProfile:function(){var t=this;this.$store.dispatch("auth/GET_CATALOG").then((function(e){t.$store.dispatch("user/UPDATE_DATA_PROFILE",{phone:t.settings.login,city_id:t.selectCity.value,id:e.data.user.id})}))},fixPhone:function(t){return"7"===t[0]||"8"===t[0]?parseInt(t.slice(1,t.length))||null:t}}}),l=n,o=s("2877"),c=s("eebe"),r=s.n(c),u=s("27f9"),h=s("0016"),d=s("ddd8"),p=s("66e5"),f=s("4074"),g=s("9c40"),b=s("b047"),y=s("58ea"),v=Object(o["a"])(l,i,a,!1,null,"630ce3e0",null);e["default"]=v.exports;r()(v,"components",{QInput:u["a"],QIcon:h["a"],QSelect:d["a"],QItem:p["a"],QItemSection:f["a"],QBtn:g["a"],QChip:b["a"],QCircularProgress:y["a"]})}}]);