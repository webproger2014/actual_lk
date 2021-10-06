<template lang="html">
  <div id="auth">
    <transition
      appear
      enter-active-class="animated fadeIn"
    >
    <div class="q-pa-md row absolute-center" style="width: 100%; max-width: 560px" v-show="!stateReset">
      <div style="width: 100%">
        <form @submit.prevent="createAccount" class="q-gutter-md">
          <div class="text-center">
            <img src="/statics/logo400x100-2.png" alt="" style="max-width: 100%">
          </div>
          <div class="text-h5 text-center">
            Регистрация
          </div>
          <q-input
            @keydown="settings.login = fixPhone(settings.login)"
            @keyup="settings.login = fixPhone(settings.login)"
            v-model="settings.login"
            prefix="7"
            mask="(###) ###-##-##"
            square
            filled
            label="Логин"
            name="phone"
            unmasked-value
            hint="7 (XXX) XXX-XX-XX">
          </q-input>

          <q-input v-model.trim="settings.psw" filled :type="settings.showPsw ? 'password' : 'text'" label="Пароль" name="password">
            <template v-slot:append>
              <q-icon
                :name="settings.showPsw ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="settings.showPsw= !settings.showPsw"
              ></q-icon>
            </template>
          </q-input>
          <q-select
                filled
                use-input
                v-model="selectCity"
                :options="cityes"
                label="Ваш город"
                behavior="menu"
                @filter="getCity"
                >
                <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Ничего не найдено
                  </q-item-section>
                </q-item>
              </template>
              </q-select>
          <div class="col">
            <q-btn unelevated color="secondary" size="17px" label="Создать аккаунт" type="submit" style="width: 100%;"></q-btn>
          </div>
          <div class="col text-center">
            <q-chip @click="$router.push('/auth')" clickable color="info" text-color="white" icon="lock_open">
              Войти
            </q-chip>
          </div>
        </form>
      </div>

      <div v-if="loadRequest" class="absolute-top full-height full-width" style="background-color: rgba(255, 255, 255, 0.86);">
        <q-circular-progress
          indeterminate
          size="40px"
          color="light-blue-6"
          class="q-ma-md absolute-center"
        ></q-circular-progress>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>

export default {
  name: 'auth',
  data () {
    return {
      stateReset: 0,
      loadRequest: 0,
      settings: {
        login: '',
        psw: '',
        showPsw: true
      },
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
    this.getCityFromData()
  },
  methods: {
    getCityFromData () {
      let data = Date()
      if (data.includes('GMT+0300')) {
        this.selectCity = { value: 1, label: 'Москва', sublabel: 'Москва и Московская обл.' }
      }
    },
    getCity (val, doneFn, abortFn) {
      if (!val) {
        doneFn()
      }

      if (val) {
        let city = this.$axios.post('v1/city/search', {
          s: val
        })

        city.then(rs => {
          if (!this.$_.isEmpty(rs)) {
            doneFn()
            console.log(rs)
            this.cityes = rs.data
          } else {
            abortFn()
          }
        }).catch(rs => {
          abortFn()
        })
      }
    },
    createAccount () {
      if (!this.settings.login) {
        this.$MSG_ERROR('Введите логин')
        return
      }

      if (this.settings.login.length !== 10) {
        this.$MSG_ERROR('Некорректный номер телефона')
        return
      }

      if (!this.settings.psw) {
        this.$MSG_ERROR('Введите пароль')
        return
      }
      if (!this.selectCity) {
        this.$MSG_ERROR('Выберете город')
        return
      }

      this.loadRequest = 1

      let account = {
        login: this.settings.login,
        password: this.settings.psw,
        city_id: this.selectCity
      }

      this.$store.dispatch('auth/REGISTER', account)
        .then(rs => {
          this.$store.dispatch('auth/LOGIN', account)
            .then(rs => {
              this.setPhoneProfile()
            })
            .catch(rs => {
              this.loadRequest = 0
            })
        })
        .catch(rs => {
          this.loadRequest = 0
        })
    },

    setPhoneProfile () {
      this.$store.dispatch('auth/GET_CATALOG')
        .then(rs => {
          this.$store.dispatch('user/UPDATE_DATA_PROFILE', {
            phone: this.settings.login,
            city_id: this.selectCity.value,
            id: rs.data.user.id
          })
        })
    },

    fixPhone (v) {
      // v[0] === '7' ||
      if (v[0] === '8') {
        return parseInt(v.slice(1, v.length)) || null
      }
      return v
    }
  }

}
</script>

<style lang="css" scoped>
</style>
