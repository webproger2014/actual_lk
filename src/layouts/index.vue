<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <q-item v-show="$store.state.user.activeContract.id" style="padding-left: 0">
            <q-item-section>
              <div>
                № {{ $store.state.user.activeContract.contract_number }}
                <q-badge align="top" color="orange" v-if="$store.state.user.activeContract.id === 7">Демо договор</q-badge>
              </div>
            </q-item-section>
          </q-item>
          <img v-show="!$store.state.user.contractStatus" src="/statics/logo.png" style="max-width: 105px; margin-top: 6px;">
        </q-toolbar-title>
        <q-item class="lt-xs-pr0">

          <q-item-section avatar>
            <q-btn round flat to="/profile">
              <q-avatar class="no-border">
                <img :src="AVATAR">
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section class="gt-xs">{{ NICKNAME }}</q-item-section>
        </q-item>
        <q-btn flat round dense @click="dialogContracts = true">
            <q-icon name="file_copy"></q-icon>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-item class="bg-grey-3 item-">
        <q-item-section avatar top>
          <q-avatar class="no-border">
            <img :src="AVATAR">
          </q-avatar>
        </q-item-section>
        <q-item-section>
           <q-item-label lines="1">{{ NICKNAME }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense to="/settings">
              <q-icon name="settings" size="22px"></q-icon>
          </q-btn>
        </q-item-section>
      </q-item>

      <navlist></navlist>

      <div class="fixed-bottom bg-white">
        <q-separator></q-separator>
        <div class="row">
          <q-item class="text-light-blue-14" clickable v-ripple to="/profile">
            <q-item-section>
              <q-icon name="perm_identity" size="22px">
              </q-icon>
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

    <q-dialog v-model="dialogContracts">
      <q-card>
        <q-card-section>
          <div class="text-h6">Перейти на договор</div>
        </q-card-section>

        <q-separator ></q-separator>

        <q-card-section style="max-height: 50vh" class="scroll">
          <contracts/>
        </q-card-section>

      </q-card>
    </q-dialog>

    <keep-alive>
      <q-page-container>
        <router-view />
      </q-page-container>
    </keep-alive>

  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import navlist from 'components/navlist/index.vue'
import contracts from 'components/contracts/index.vue'
import { LocalStorage } from 'quasar'

export default {
  data () {
    return {
      dialogContracts: false,
      chatDialog: true,
      left: false
    }
  },

  components: { navlist, contracts },

  created () {
    this.$_checkOneVisit()
    if (this.$route.path !== '/profile') {
      if (!this.$_.isEmpty(this.$store.state.auth.user)) {
        this.$_checkDataprofile()
      } else {
        this.$watch('$store.state.auth.user', () => {
          this.$_checkDataprofile()
        })
      }
    }
  },

  computed: {
    ...mapGetters({
      'NICKNAME': 'user/GET_NICKNAME',
      'AVATAR': 'user/GET_AVATAR'
    })
  },

  methods: {
    $_checkOneVisit () {
      if (!LocalStorage.getItem('oneVisit')) {
        this.left = true
        LocalStorage.set('oneVisit', true)
      }
    },

    $_checkDataprofile () {
      if (!this.$store.state.auth.user.name) {
        this.$_showMsgOnEditProfile()
        return
      }

      if (!this.$store.state.auth.user.surname) {
        this.$_showMsgOnEditProfile()
        return
      }

      if (!this.$store.state.auth.user.lastname) {
        this.$_showMsgOnEditProfile()
        return
      }

      if (!this.$store.state.auth.user.mail) {
        this.$_showMsgOnEditProfile()
        return
      }

      if (!this.$store.state.auth.user.city_id) {
        this.$_showMsgOnEditProfile()
      }
    },

    $_showMsgOnEditProfile () {
      this.$q.notify({
        message: 'Заполните пожалуйста',
        icon: 'perm_identity',
        color: 'yellow-9',
        position: 'top-right',
        timeout: 150000,
        actions: [
          { label: 'Профиль', color: 'white', handler: () => { this.$router.push('/profile') } }
        ]
      })
    }
  }

}
</script>
