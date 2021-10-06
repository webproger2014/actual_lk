<template lang="html">
  <div id="auth">
    <transition
      appear
      enter-active-class="animated fadeIn"
    >
      <div class="q-pa-md row absolute-center" style="width: 100%; max-width: 560px" v-show="!stateReset">
        <div style="width: 100%">
          <form @submit.prevent="auth" class="q-gutter-md">
            <div class="text-center">
              <img src="/statics/logo400x100-2.png" alt="" style="max-width: 100%;">
            </div>
            <div class="text-h5 text-center">Авторизация</div>
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
            <div class="col">
              <q-btn unelevated color="secondary" size="17px" label="Войти" type="submit" style="width: 100%;"></q-btn>
            </div>
            <div class="col text-center">
              <q-chip @click="$router.push('/register')" clickable color="info" text-color="white" icon="person_add">
                Создать
              </q-chip>
              <q-chip clickable icon="lock_open" @click="stateReset = 1">
                Восстановить
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

    <transition
      appear
      enter-active-class="animated fadeIn"
    >
    <div class="q-pa-md row fixed-center" style="width: 100%; max-width: 560px" v-show="stateReset === 1">
      <div style="width: 100%">
        <form @submit.prevent="resetAccount" class="q-gutter-md">
          <div class="text-center">
            <img src="/statics/logo-full.png" alt="" style="max-width: 100%;">
          </div>
          <div class="text-h5 text-center">Восстановить аккаунт</div>
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
          <div class="col">
            <q-btn unelevated color="red-5" size="17px" label="Восстановить" type="submit" style="width: 100%;"></q-btn>
          </div>
          <div class="col text-center">
            <q-chip clickable color="blue-6" text-color="white" icon="keyboard_backspace" @click="stateReset = 0">
              Назад
            </q-chip>
            <q-chip clickable icon="phone">
               21-59-71
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
      loadRequest: 0,
      stateReset: 0,
      settings: {
        login: '',
        psw: '',
        showPsw: true
      }
    }
  },

  methods: {
    auth () {
      if (this.settings.login && this.settings.psw) {
        if (this.settings.login.length !== 10) {
          this.$MSG_ERROR('Некорректный номер телефона')
          return
        }

        this.loadRequest = 1

        this.$store.dispatch('auth/LOGIN', {
          login: this.settings.login,
          password: this.settings.psw
        })
          .catch(rs => {
            this.loadRequest = 0
          })
      } else {
        this.$MSG_ERROR('Заполните все поля')
      }
    },

    resetAccount () {
      if (this.settings.login) {
        if (this.settings.login.length !== 10) {
          this.$MSG_ERROR('Некорректный номер телефона')
          return
        }

        this.$store.dispatch('auth/RESET_PASSWORD', {
          login: this.settings.login
        })
      } else {
        this.$MSG_ERROR('Заполните все поля')
      }
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
