<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="bg-primary text-white" ref="header" id="header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <div class="bg-white row inline border-radius rd" v-if="$_.isEmpty($store.state.chat.users)">
            <q-skeleton type="QAvatar" size="36px"></q-skeleton>
          </div>

          <div class="carousel" ref="carousel" @touchstart="touchSlides" :style="carousel.style">
            <q-btn class="slide" color="cyan-4" outline flat round v-for="(user, index) in $store.state.chat.users" :key="index">
              <transition
                appear
                enter-active-class="animated fadeIn"
              >
              <div class="">
                <q-avatar>
                  <img :src="getPhoto(user.photo)">
                </q-avatar>

                  <q-tooltip content-class="bg-blue-6" content-style="font-size: 13px" :offset="[10, 10]">
                    {{ user.name }}: {{ user.user_role }}
                  </q-tooltip>
              </div>
              </transition>
            </q-btn>
          </div>
        </q-toolbar-title>

        <q-item class="gt-xs">
          <q-item-section avatar>
            <q-btn round flat to="/profile">
              <q-avatar class="no-border">
                <img :src="AVATAR">
              </q-avatar>
            </q-btn>
          </q-item-section>
          <q-item-section>{{ NICKNAME }}</q-item-section>
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
          <q-item class="text-grey-5" clickable v-ripple @click="$store.dispatch('auth/LOGOUT')">
            <q-item-section>
              <q-icon name="exit_to_app" size="22px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <div style="padding-bottom: 50px;"></div>
    </q-drawer>

    <keep-alive>
      <q-page-container>
        <router-view ref="chat"/>
      </q-page-container>
    </keep-alive>

    <q-dialog v-model="dialogContracts"  @before-show="$refs.chat.openDialogContracts()" @hide="$refs.chat.closeDialogContracts()" @before-hide="$refs.chat.closeDialogContracts()">
      <q-card>
        <q-card-section>
          <div class="text-h6">Перейти на договор</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 50vh" class="scroll">
          <contracts ref="contracts"/>
        </q-card-section>

      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import navlist from 'components/navlist/index.vue'
import contracts from 'components/contracts/index.vue'

export default {
  data () {
    return {
      dialogContracts: false,
      chatDialog: true,
      left: false,
      carousel: {
        transformX: 0,
        style: {
          transform: ''
        }
      }
    }
  },
  components: { navlist, contracts },
  computed: {
    ...mapGetters({
      'NICKNAME': 'user/GET_NICKNAME',
      'AVATAR': 'user/GET_AVATAR'
    })
  },

  methods: {
    touchSlides (e) {
      let container = this.$refs.carousel
      let slides = container.querySelectorAll('.slide')
      let prevX = e.changedTouches[0].clientX - this.carousel.transformX

      // Default Drag'n Drop
      //    document.ondragstart = () => false

      // Отжали кнопку
      document.ontouchend = (e) => {
        let slidesW = 0

        slides.forEach((item) => {
          slidesW += item.offsetWidth
        })

        let w = slidesW - Math.abs(this.carousel.transformX)
        if (this.carousel.transformX > container.offsetWidth) {
          this.carousel.transformX -= slides[0].offsetWidth
        } else if (w < 0) {
          this.carousel.transformX += slides[0].offsetWidth
        }

        document.ontouchmove = null
      }

      // Передвижение курсора
      document.ontouchmove = e => {
        this.carousel.transformX = e.changedTouches[0].clientX - prevX
      }

      this.$watch('carousel.transformX', (transform) => {
        this.carousel.style.transform = `translateX(${transform}px)`
      })
    }

  }
}
</script>

<style>
</style>
