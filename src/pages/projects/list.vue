<template lang="html">
  <div id="project">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Список проектов
      </div>
    </div>

    <div class="q-pa-md">
      <q-list>
         <q-item color="purple"
          v-for="(project, index) in projects"
          :key="index"
           clickable
           v-ripple
           class="lt-xs-pl0"
           >
             <q-item-section thumbnail>
               <q-img :src="project.img_min" class="img-def lt-xs-img1" style="max-width: 300px;"></q-img>
             </q-item-section>

             <q-item-section>
               <q-item-label class="text-body1">{{ project.name }}</q-item-label>
             </q-item-section>
             <q-item-section center side>
               <div class="text-grey-8 q-gutter-xs text-center">
                 <q-icon name="visibility" size="20px"></q-icon>
                 <div>{{ project.views | number }}</div>
               </div>
            </q-item-section>
            <q-item-section center side>
              <div class="text-grey-8 q-gutter-xs text-center">
                <q-icon name="rounded_cornery" size="20px"></q-icon>
                <div>{{ project.square | currency }} м<sup>2</sup></div>
              </div>
           </q-item-section>
           </q-item>
       </q-list>
    </div>

    <q-drawer show-if-above v-model="right" side="right" elevated>
      <div class="q-pa-md">
        Этажи:
        <q-checkbox v-model="filter.floors[0]" label="1" color="blue"></q-checkbox>
        <q-checkbox v-model="filter.floors[1]" label="2" color="blue"></q-checkbox>
        <q-checkbox v-model="filter.floors[2]" label="3" color="blue"></q-checkbox>
        <q-checkbox v-model="filter.floors[3]" label="4" color="blue"></q-checkbox>
      </div>
      <div class="fixed-bottom bg-white">
        <q-separator></q-separator>
        <div class="row">
          <q-item class="text-light-blue-14" clickable v-ripple to="/profile">
            <q-item-section>
              <q-icon name="perm_identity" size="22px"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator vertical></q-separator>
          <q-item class="text-light-blue-14" clickable v-ripple to="/team">
            <q-item-section>
              <q-icon name="people_outline" size="22px"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator vertical></q-separator>
          <q-item class="text-grey-5" clickable @click="$store.dispatch('auth/LOGOUT')">
            <q-item-section>
              <q-icon name="exit_to_app" size="22px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <div style="padding-bottom: 50px;"></div>
    </q-drawer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'project',
  data () {
    return {
      right: true,
      filter: {
        floors: [1, 2, 3, 4]
      },
      projects: [
        {
          id: 134,
          name: 'Проект дома Мокко',
          square: 137,
          img_min: 'https://vevanta.com/wp-content/uploads/2019/02/stroitelstvo_domov_tumen-5.jpg',
          views: 4987
        },
        {
          id: 135,
          name: 'Проект дома Орхидея',
          square: 127,
          img_min: 'https://vevanta.com/wp-content/uploads/2019/01/1-25.jpg',
          views: 4347
        },
        {
          id: 136,
          name: 'Проект дома Елена с Гаражом',
          square: 147.3,
          img_min: 'https://vevanta.com/wp-content/uploads/2019/02/strotelstvo_domov_tumen_3.jpg',
          views: 3984
        },
        {
          id: 137,
          name: 'Проект дома Елисейские поля',
          square: 250,
          img_min: 'https://vevanta.com/wp-content/uploads/2019/02/stroitelstvo_domov_tumen_2-4.jpg',
          views: 90941
        },
        {
          id: 138,
          name: 'Проект дома Астрид',
          square: 111.57,
          img_min: 'https://vevanta.com/wp-content/uploads/2019/04/stroitelstvo_domov_tumen_4.1.jpg',
          views: 34794
        }
      ]
    }
  },

  created () {
    axios.get('https://b24-tzsclk.bitrix24.ru/oauth/token/?grant_type=authorization_code&client_id=YQm25UdWRWkMJONr6s0T1ouL3gHmdwmiJO7iifnFDnC5uNXn5q&client_secret=local.5e8467fa7c9a52.78490269&code=a87c845e0045fc7a0045fc7400000001201c03cb0f758fd4648a40a66223778016543')
      .then(rs => {
        console.log(rs)
      })
      .catch(rs => {
        console.log(rs)
      })
  },

  methods: {
  }

}
</script>

<style>
.img-def {
  width: 162px;
  height: 90px;
}
</style>
