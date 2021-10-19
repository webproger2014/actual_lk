<template lang="html">
  <div id="settings">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Настройки
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row">
        <q-list style="width: 100%; max-width: 500px; margin: auto;">
          <form @submit.prevent="updatePsw">
            <div class="q-pa-md q-gutter-md">
              <q-input v-model="settings.psw" filled :type="settings.showPsw ? 'password' : 'text'" hint="Пароль">
                <template v-slot:append>
                  <q-icon
                    :name="settings.showPsw ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="settings.showPsw= !settings.showPsw"
                  ></q-icon>
                </template>
              </q-input>
              <q-input v-model="settings.psw2" filled type="password" hint="Повторите пароль">
              </q-input>
              <q-btn color="light-blue-6" label="Изменить" type="submit"></q-btn>
            </div>
          </form>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'settings',
  data () {
    return {
      settings: {
        psw: '',
        psw2: '',
        showPsw: true
      }
    }
  },

  methods: {
    updatePsw () {
      if (!this.settings.psw && !this.settings.psw2) {
        this.$MSG_ERROR('Заполните все поля')
        return
      }

      if (this.settings.psw !== this.settings.psw2) {
        this.$MSG_ERROR('Пароли не совпадают')
        return
      }

      if (this.settings.psw.length < 7) {
        this.$MSG_ERROR('Минимум 7 символов')
        return
      }

      this.$store.dispatch('auth/REPASSWORD', this.settings.psw)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
