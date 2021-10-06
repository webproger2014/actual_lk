<template>
  <div id="q-app">
    <div class="q-px-lg q-pa-md">
      <div class="text-h4 xs-text-h4">
          Этапы строительства
      </div>

      <div v-if="$_.isEmpty($store.state.user.stages)" class="q-pa-md">
        <q-icon size="22px" name="warning" color="orange"/> <span class="text-caption q-ml-sm">Этапы строительства отсутствуют</span>
      </div>

        <q-timeline color="secondary" >
          <q-timeline-entry
            v-for="(item, index) in $store.state.user.stages"
            :key="index"
            :title="'Этап ' + (index + 1)"
            :subtitle="item.stage.date_create | dateString2"
            icon="done_all"
          >
            <div>
              <p>{{ item.stage.description }}</p>

              <div class="q-col-gutter-md row items-start" v-if="!$_.isEmpty(item.photo)">
                <div class="col-xs-12 col-sm-6 col-md-4" v-for="(img, index) in item.photo" :key="index" style="max-width: 300px;">
                    <q-img :ratio="16/9" :src="$store.state.constant.CDN_DOMAIN + img.url300" @click="$refs.fullimg.zoom(index, item.photo)" class="cursor-pointer"></q-img>
                </div>
              </div>

              <q-separator v-if="!$_.isEmpty(item.video)" class="q-mt-lg q-mb-lg"></q-separator>

              <div v-if="!$_.isEmpty(item.video)" class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-4 video"
                  v-for="(video, index) in item.video"
                  :key="index">
                  <videoplay :srcvideo="$store.state.constant.CDN_DOMAIN + video.url"></videoplay>
                </div>
              </div>

              <div class="q-mt-lg" style="display: none">
                <div class="xs">
                  <q-btn color="light-blue-8" icon-right="send" label="Задать вопрос" @click="openDialogMessage(stage.title)"></q-btn>
                </div>
                <div class="gt-xs">
                  <q-btn color="light-blue-8" icon="mail" icon-right="send" label="Задать вопрос" @click="openDialogMessage(stage.title)"></q-btn>
                </div>
              </div>

            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
      <div class="q-pa-md q-gutter-sm">
          <q-dialog v-model="dialog.message.state" position="bottom">
              <q-card class="q-pa-sm fit" style="max-width: 700px">
                  <div class="q-pa-sm">
                    <div class="text-h6">Этап: {{ dialog.message.title }}</div>
                  </div>
                  <q-input filled autogrow bottom-slots v-model="message.value" label="Вопрос" counter maxlength="720" :dense="false" autofocus>
                    <template v-slot:before>
                      <q-avatar>
                        <img :src="AVATAR">
                      </q-avatar>
                    </template>

                    <template v-slot:append>
                      <q-icon v-if="message.value !== ''" name="close" @click="message.value = ''" class="cursor-pointer" ></q-icon>
                    </template>

                    <template v-slot:hint>
                      {{ errorMessage.title }}
                    </template>

                    <template v-slot:after>
                      <q-btn round dense flat icon="send" @click="sendMessage()" v-show="!createMsg"></q-btn>
                      <q-circular-progress
                        indeterminate
                        size="30px"
                        color="lime"
                        class="q-ma-md"
                        v-show="createMsg"
                      ></q-circular-progress>
                    </template>
                  </q-input>
              </q-card>
          </q-dialog>
        </div>
      <fullimg ref="fullimg"></fullimg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import fullimg from 'components/fullimg/index.vue'
import videoplay from 'components/videoplay/index.vue'

export default {
  name: 'stages',
  components: { fullimg, videoplay },
  data () {
    return {
      createMsg: false,
      dialog: {
        message: {
          state: false,
          title: ''
        }
      },
      errorMessage: {
        title: 'Введите сообщение',
        state: false
      },
      message: {
        value: '',
        state: false
      }
    }
  },

  created () {
    if (this.$_.isEmpty(this.$store.state.user.stages)) {
      this.$store.dispatch('user/GET_STAGES')
    }

    this.$watch('$store.state.user.activeContract', () => {
      this.$store.dispatch('user/GET_STAGES')
    })
  },

  computed: {
    ...mapGetters({
      'AVATAR': 'user/GET_AVATAR'
    })
  },

  methods: {
    openDialogMessage (stage) {
      this.dialog.message.title = stage
      this.dialog.message.state = true
    },

    sendMessage () {
      if (this.message.value) {
        this.createMsg = true
        //  setTimeout(() => {
        this.successMessage()
      ///  }, 2000)
      } else {
        this.errorMessage.title = 'Поле не может быть пустым'
      }
    },

    successMessage () {
      this.resMessage()
      this.$q.notify({
        position: 'top-right',
        icon: 'thumb_up',
        timeout: 15000,
        message: 'Сообщение отправлено',
        actions: [
          {
            label: 'Открыть чат',
            color: 'green',
            handler: () => {
              this.$router.push('/chat')
            }
          },
          {
            icon: 'close',
            color: 'red'
          }
        ]
      })
    },

    resMessage () {
      this.createMsg = false
      this.message.value = ''
      this.dialog.message.title = ''
      this.dialog.message.state = false
    }
  }
}
</script>

<style>

</style>
