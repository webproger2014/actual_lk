<template lang="html">
  <div id="home">
    <div class="q-pa-md absolute-center full-width text-center">

        <div v-if="$store.state.auth.user.name" class="text-h4">Добро пожаловать, {{ $store.state.auth.user.name }}!</div>
        <div v-else class="text-h4">Добро пожаловать! </div>
        <div class="text-body1 q-mt-md flex-center">
          <div style="max-width: 650px; margin: 0 auto;">
            Это Ваш личный кабинет, который позволяет отслеживать информацию
            о ходе выполнение работ, проектирования, строительства, и других этапов
            заложенных в договор.
            <br/><br/>
            Вы можете наблюдать за ходом строительства дома в реальном времени!
          </div>
        </div>
    </div>
    <q-footer v-if="statusCity === 2">
          <q-toolbar class="shadow-1 bg-yellow-1 row text-black text-left justify-left">
            <div class="col-auto q-pa-md">Выберете ваш город:</div>
            <q-select
                class="col-auto text-center"
                style="width:200px;"
                use-input
                v-model="selectCity"
                :options="cityes"
                behavior="menu"
                >
              </q-select>
            <q-btn
              class="col-auto"
              unelevated rounded
              label="Сохранить"
              style="background:#9169af; color:#FFF;margin-left:10px;"
              @click="onPushcityes"
            ></q-btn>
          </q-toolbar>
        </q-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      dialog: true,
      cityOn: false,
      statusCity: 0,
      file: '',
      selectCity: { value: 2229, label: 'Тюмень', sublabel: 'Тюменская обл.' },
      cityes: [
        { value: 1, label: 'Москва', sublabel: 'Москва и Московская обл.' },
        { value: 2229, label: 'Тюмень', sublabel: 'Тюменская обл.' },
        { value: 2228, label: 'Тобольск', sublabel: 'Тюменская обл.' },
        { value: 1888, label: 'Екатеринбург', sublabel: 'Свердловская обл.' }
      ]
    }
  },
  created () {
    this.$_profileWatch()
    this.$_getCity()
  },
  computed: {
    ...mapGetters({
      'NICKNAME': 'user/GET_NICKNAME' // 45.133.16.111
    })

  },
  methods: {
    onPushcityes () {
      this.$store.dispatch('user/UPDATE_DATA_PROFILE', {
        city_id: this.selectCity.value || this.account.city_id
      })
        .then(() => {
          this.$store.commit('user/SET_CITY', this.selectCity)
        })
    },

    $_profileWatch () {
      this.$watch('$store.state.auth.user', () => {
        if (this.$_.isEmpty(this.$store.state.user.city)) {
          this.$store.dispatch('user/GET_CITY_BY_ID')
        }
      })
    },
    $_getCity () {
      this.selectCity = { ...this.$store.state.user.city }

      if (!this.$_.isEmpty(this.$store.state.auth.user)) {
        this.$store.dispatch('user/GET_CITY_BY_ID')
      }

      this.$watch('$store.state.user.city', () => {
        if (!this.$_.isEmpty(this.$store.state.user.city)) {
          this.statusCity = 1
        } else {
          this.statusCity = 2
        }

        this.selectCity = { ...this.$store.state.user.city }
      })

      this.$watch('selectCity', (city) => {
        if (!this.$_.isEmpty(city)) {
          let hasCity = false

          this.cityes.forEach((city, i) => {
            if (city.value === this.selectCity.value) {
              hasCity = true
            }
          })

          if (!hasCity) {
            this.cityes.unshift(this.selectCity)
          }
        }
      })
    }

  }
}
</script>

<style lang="css" scoped>
</style>
