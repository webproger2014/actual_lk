<template>
  <div id="services">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Услуги
      </div>
    </div>
    <q-tabs
       v-model="tab"
       dense
       class="text-grey"
       active-color="primary"
       indicator-color="primary"
       align="justify"
       narrow-indicator
     >
       <q-tab name="0" label="Все"></q-tab>
       <q-tab name="1" label="Мои"></q-tab>
       <q-tab v-show="checkedServices.length"
          name="2"
          :label="'Выбранные (' + checkedServices.length + ')'"></q-tab>
      </q-tabs>

       <q-separator ></q-separator>

       <q-tab-panels
        v-model="tab"
        animated
        swipeable
        infinite
        @before-transition="beforeTransition"
        >
         <q-tab-panel name="0">
           <q-list>
              <q-item color="purple"
                tag="label"
                v-for="(service, index) in services"
                :key="index"
                clickable
                v-ripple
                class="lt-xs-pl0"
                >
         <q-checkbox v-model="checkedServices" :val="index"></q-checkbox>
                  <q-item-section thumbnail>
                    <q-img :src="service.img" class="img-def lt-xs-img1" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-body1">{{ service.name }}</q-item-label>
                    <q-item-label caption class="text-body2">
                      {{ service.desc }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section center side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn class="gt-xs" size="12px" flat dense round icon="help"></q-btn>
                    </div>
                 </q-item-section>
                </q-item>
            </q-list>
         </q-tab-panel>

         <q-tab-panel name="1">
           <q-list>
              <q-item v-for="(service, index) in myServices" :key="index">
                <q-item-section thumbnail>
                  <q-img :src="service.img" class="img-def lt-xs-img1" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1">{{ service.name }}</q-item-label>
                  <q-item-label caption class="text-body2">
                    {{ service.desc }}
                  </q-item-label>
                </q-item-section>
                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="12px" flat dense round icon="help"></q-btn>
                  </div>
               </q-item-section>
              </q-item>
            </q-list>
         </q-tab-panel>

         <q-tab-panel name="2" v-show="checkedServices.length">
           <q-list>
              <q-item class="lt-xs-pl0"
                v-for="(service, index) in checkedServices"
                :key="index"
                clickable
                v-ripple
                tag="label"
                >
               <q-checkbox v-model="deleteServices" :val="service" @input="setTabService('0')">
               </q-checkbox>
                <q-item-section thumbnail>
                  <q-img :src="$store.state.user.services[service].img" class="img-def lt-xs-img1" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1" class="text-body1">{{ $store.state.user.services[service].name }}</q-item-label>
                  <q-item-label caption lines="2" class="text-body2">
                    {{ $store.state.user.services[service].desc }}
                  </q-item-label>
                </q-item-section>
                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="12px" flat dense round icon="help"></q-btn>
                  </div>
               </q-item-section>
              </q-item>
              <q-item>
                <q-btn class="q-ml-sm" color="light-blue-6" label="Заказать"  @click="buy"></q-btn>
              </q-item>
            </q-list>
         </q-tab-panel>

       </q-tab-panels>

    <transition
     appear
     enter-active-class="animated slideInUp"
     leave-active-class="animated fadeOut"
    >
     <q-footer v-if="checkedServices.length && tab !== '2'">
       <q-toolbar class="shadow-1 bg-grey-1 text-black row">
         <div class="text-light-blue-8 text-uppercase cursor-pointer hower-show07" @click="tab = '2'">
           Выбрано <span class="text-bold">({{ checkedServices.length }})</span>
         </div>
         <q-btn round flat @click="checkedServices = []" text-color="yellow-8">
           <q-icon name="delete"/>
         </q-btn>
       </q-toolbar>
     </q-footer>
     <q-footer v-if="deleteServices.length && tab === '2'">
       <q-toolbar class="shadow-1 bg-grey-1 text-black row">
         <div class="text-light-blue-8 text-uppercase q-hoverable">
           Выбрано <span class="text-bold">({{ deleteServices.length }})</span>
         </div>
         <q-btn round flat @click="delSelectServices" text-color="yellow-8">
           <q-icon name="delete"/>
         </q-btn>
       </q-toolbar>
     </q-footer>
   </transition>
  </div>
</template>

<script>
export default {
  name: 'services',
  data () {
    return {
      tab: '0',
      ripple: false,
      checkedServices: [],
      deleteServices: [],
      myServices: [],
      services: [
        {
          'id': 1,
          'name': 'Обработка участка',
          'img': 'https://vevanta.com/wp-content/uploads/2019/04/tjumenka.jpg',
          'desc': 'Обработка участка происходит на территории Тюмени и Тюменской области'
        },
        {
          'id ': 1,
          'name': 'Ленточный фундамент',
          'img': 'https://vevanta.com/wp-content/uploads/2019/04/stroitelstvo_domov-tjumenka-2.jpg',
          'desc': 'Данный фундамент исопльзуется не на мягком грунте'
        },
        {
          'id': 1,
          'name': 'Возведение стен',
          'img': 'https://vevanta.com/wp-content/uploads/2019/10/stroitelstvo_domov5.jpg',
          'desc': 'Строительство стен производится из кирпича, блока, керамического блока, бруса, брева и т.д'
        },
        {
          'id': 1,
          'name': 'Строительство дома под ключ',
          'img': 'https://vevanta.com/wp-content/uploads/2019/10/1.jpg',
          'desc': 'Данная услуга подразумевает что компания берёт на себя все основные задачи, от проектирования до кровли включая отопления и септики'
        },
        {
          'id': 1,
          'name': 'Тёплый пол',
          'img': 'https://vevanta.com/wp-content/uploads/2019/09/stroitelstvo_domov3-2.jpg',
          'desc': 'Мы гарантируем тепло в Вашем доме'
        },
        {
          'id': 1,
          'name': 'Отопление в доме',
          'img': 'https://vevanta.com/wp-content/uploads/2019/09/stroitelstvo_domov32.jpg',
          'desc': 'Собственное газовый котёл экономнее чем отапливаться от электричества'
        },
        {
          'id': 1,
          'name': 'Внутрення отделка',
          'img': 'https://vevanta.com/wp-content/uploads/2019/01/siren-8.jpg',
          'desc': 'Гарантируем качества'
        },
        {
          'id': 1,
          'name': 'Дизайн интерьера',
          'img': 'https://vevanta.com/wp-content/uploads/2019/11/100_5_post_30.09.jpg',
          'desc': 'Необходимо тому кто хочет доверить дизайн своего дома профессионалам. Позволяет визуализировать в 3D что даёт полную картину вашей задумке'
        }
      ]
    }
  },

  created () {
    this.myServices = [
      {
        id: 1,
        name: 'Строительство дома под ключ',
        img: 'https://vevanta.com/wp-content/uploads/2019/10/1.jpg',
        desc: 'Данная услуга подразумевает что компания берёт на себя все основные задачи, от проектирования до кровли включая отопления и септики'
      },
      {
        id: 1,
        name: 'Внутрення отделка',
        img: 'https://vevanta.com/wp-content/uploads/2019/01/siren-8.jpg',
        desc: 'Гарантируем качества'
      },
      {
        id: 1,
        name: 'Дизайн интерьера',
        img: 'https://vevanta.com/wp-content/uploads/2019/11/100_5_post_30.09.jpg',
        desc: 'Необходимо тому кто хочет доверить дизайн своего дома профессионалам. Позволяет визуализировать в 3D что даёт полную картину вашей задумке'
      }
    ]
    this.$store.dispatch('user/GET_SERVICES')
  },

  methods: {
    buy () {
      let phone = this.$store.state.auth.user.phone || this.$store.state.auth.user.login
      this.$axios.post('service/new', {
        name: '',
        phone: phone.toString()
      })
        .then(rs => {
          this.$MSG_SUCCESS('Заявка отправлена')
          this.checkedServices = []
          this.tab = '0'
        })
    },

    goToTabService (tabName, step) {
      this.tab = tabName
    },

    setTabService (tabName) {
      if (!this.checkedServices.length) {
        this.tab = tabName
      }
    },

    beforeTransition (newV, oldV) {
      if (newV === '2' && !this.checkedServices.length) {
        this.tab = '0'
      }
    },

    delSelectServices () {
      this.deleteServices.forEach((indexService, index) => {
        this.checkedServices.forEach((item, index2) => {
          if (item === indexService) {
            this.checkedServices.splice(index2, 1)
          }
        })
      })

      this.deleteServices = []

      if (!this.checkedServices.length) {
        this.tab = '0'
      }
    }
  }
}
</script>

<style>
.img-def {
  width: 162px;
  height: 90px;
}

@media screen and (max-width: 599px) {
  .lt-xs-img1 {
    width: 58px;
    height: 53px;
  }

  .text-body1 {
    font-size: 0.875rem;
  }
}
</style>
