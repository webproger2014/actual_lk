<template lang="html">
  <div id="chat" ref="chat">
    <div class="q-pa-md">
      <q-infinite-scroll :disable="disableInfiniteScroll" reverse @load="loadHistoryMessages" v-scroll="scrolled" ref="infiniteScroll">
        <template slot="loading">
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" ></q-spinner>
          </div>
        </template>

          <div class="row justify-center" v-if="$_.isEmpty($store.state.chat.messages)">
            <div style="max-width: 1024px; width: 100%">
              <div class="text-center absolute-center">
                <q-badge align="middle" color="orange"><q-icon size="22px" name="warning"/> </q-badge> У Вас нет сообщений, либо не заключён договор.
              </div>
            </div>
          </div>

          <div class="row justify-center" v-for="(item, index) in $store.state.chat.messages" :key="index">
            <div style="max-width: 1024px; width: 100%">
                  <div v-if="item.user_id === $store.state.auth.user.id">

                  <q-chat-message v-if="item.type === 'image'"
                    :name="item.name"
                    sent
                    :avatar="getPhoto(item.photo)"
                    :stamp="item.timestamp | dateT"
                  >

                  <div role="img" class="q-img overflow-hidden cursor-pointer"
                    @click="$refs.fullimgchat.zoom(item.img_url)"
                  >
                    <div style="padding-bottom: 56.25%;"></div>
                    <div
                      class="q-img_image absolute-full bckg"
                      :style="`background-image: url(${$store.state.constant.CDN_DOMAIN}/${item.img_url_thumb}); background-position: 50% 50%;`"
                    ></div>
                    <div class="q-img__content absolute-full"></div>
                  </div>
                </q-chat-message>
                  <q-chat-message v-else
                    :name="item.name"
                    sent
                    :avatar="getPhoto(item.photo)"
                    :text="[item.message]"
                    :stamp="item.timestamp | dateT"
                  >
                  </q-chat-message>
                </div>

                <div v-else>
                  <q-chat-message v-if="item.type === 'image'"
                    :name="item.name"
                    :avatar="getPhoto(item.photo)"
                    :stamp="item.timestamp | dateT"
                    :bg-color="item.status ? 'blue-1' : 'yellow-2'"
                  >
                  <div role="img" class="q-img overflow-hidden cursor-pointer"
                    @click="$refs.fullimgchat.zoom(item.img_url)"
                  >
                    <div style="padding-bottom: 56.25%;"></div>
                    <div
                      class="q-img_image absolute-full bckg"
                      :style="`background-image: url(${$store.state.constant.CDN_DOMAIN}/${item.img_url_thumb}); background-position: 50% 50%;`"
                    ></div>
                    <div class="q-img__content absolute-full"></div>
                  </div>
                </q-chat-message>

                  <q-chat-message v-else
                    :name="item.name"
                    :avatar="getPhoto(item.photo)"
                    :text="[item.message]"
                    :stamp="item.timestamp | dateT"
                    :bg-color="item.status ? 'blue-1' : 'yellow-2'"
                  >
                  </q-chat-message>
                  {{ item }}
              </div>
            </div>
          </div>
        </q-infinite-scroll>
    </div>

    <q-footer ref="footer">
      <transition
      appear
      enter-active-class="animated slideInUp"
      v-if="!disablePushMsg"
      >
      <q-toolbar class="shadow-1 bg-yellow-1 text-black text-center" v-show="statusNewMsg">
        <div class="full-width">
          <q-btn class="text-bold" outline rounded color="primary" label="Новые сообщения" @click="showNewMessages" size="13px"></q-btn>
        </div>
        <q-icon class="cursor-pointer absolute ar15" name="close" size="22px" @click="disablePushMsg = true"/>
      </q-toolbar>
      </transition>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-avatar class="q-mr-sm">
          <img :src="AVATAR">
        </q-avatar>
        <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model.trim="message" placeholder="Сообщение" @keyup.enter="sendMessage"/>
        <q-btn flat round dense>
            <q-icon name="attach_file" @click="prevImgLoad"></q-icon>
        </q-btn>
        <q-btn round flat icon="send" v-show="statusSendingMessage === 0" @click="sendMessage"/>
        <q-circular-progress
          indeterminate
          size="15px"
          color="blue-4"
          class="q-ma-md"
          v-show="statusSendingMessage === 1"
        />
        <q-btn v-show="statusSendingMessage === 2" round flat color="red" size="15px"  icon="update" @click="sendMessage"/>
      </q-toolbar>
    </q-footer>

    <q-dialog
      v-model="dialog.upload"
      @before-show="savePositionScroll"
      @hide="closeDialogUploader"
      @before-hide="closeDialogUploader"
    >

      <q-card class="full-width">
        <q-uploader
          url=""
          label="Custom header"
          accept="image/*"
          class="full-width"
          multiple
          @added="setFilesOnUpload"
          @removed="removedFiles"
          :filter="filterFiles"
          ref="uplodaer"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                <q-tooltip>Удалить все</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                <q-tooltip>Удалить изображение</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" ></q-spinner>
              <div class="col">
                <div class="q-uploader__title">Выберите изображение (макс 7 МБ) не более 5 штук</div>
                <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
              </div>
              <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                <q-uploader-add-trigger id="prevImgLoad"></q-uploader-add-trigger>
                <q-tooltip>Добавить изображение</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="addMessesageImg" round dense flat>
                <q-tooltip>Загрузить</q-tooltip>
              </q-btn>

              <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                <q-tooltip>Abort Upload</q-tooltip>
              </q-btn>
            </div>
          </template>
          <template v-slot:list="scope">
            <q-list separator>
                <q-item v-for="file in scope.files" :key="file.name">
                  <q-item-section>
                    <q-item-label class="full-width ellipsis">
                      {{ file.name }}
                    </q-item-label>

                    <q-item-label caption>
                      Статус: {{ file.__status }}
                    </q-item-label>

                    <q-item-label caption>
                      {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    v-if="file.__img"
                    thumbnail
                    class="gt-xs"
                  >
                    <img :src="file.__img.src">
                  </q-item-section>

                  <q-item-section top side>
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="scope.removeFile(file)"
                    ></q-btn>
                  </q-item-section>
                </q-item>

              </q-list>
          </template>
        </q-uploader>
      </q-card>
    </q-dialog>
    <fullimgchat ref="fullimgchat"></fullimgchat>
    <audio src="/statics/chat/msg.mp3" ref="msgaduio"></audio>
    <audio src="/statics/chat/add_msg.mp3" ref="addmsg_audio"></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { scroll } from 'quasar'
import fullimgchat from 'components/fullimgchat/index.vue'
const { getScrollHeight, setScrollPosition, getScrollPosition } = scroll

export default {
  components: { fullimgchat },
  data () {
    return {
      socket: null,
      view: false,
      pageChatIndex: 1,
      scrollPositon: 0,
      scrollHeight: 0,
      files: [],
      disableInfiniteScroll: true, // Идентификатор для отслеживания первой итерации сообщений
      statusScroll: false, // Отслеживаем для position fixed or bottom
      message: '',
      infiniteScroll: {
        done: false,
        disable: false
      },
      room: {},
      pushMsgDocument: {
        timer: null
      },
      scrollMoreForm: false,
      statusNewMsg: false,
      disablePushMsg: false,
      statusSendingMessage: 0, // 0 send, 1 === load , 2 === error(update)
      dialog: {
        upload: false
      },
      imagesLoad: {
        triggerSelect: false
      }
    }
  },

  computed: {
    ...mapGetters({
      'NICKNAME': 'user/GET_NICKNAME',
      'AVATAR': 'user/GET_AVATAR'
    })
  },

  created () {
    this.socketMessage()
    this.scrollBottomChat()
    this.watching()
  },

  deactivated () {
    this.view = false
    this.socket.close()
  },

  activated () {
    this.view = true
    this.$nextTick(() => {
      this.scrollBottomChat()
    })
  },

  methods: {
    watching () {
      this.$watch('$store.state.chat.activeChat', (v, old) => {
        this.statusScroll = false
        this.socketMessage()
      })

      this.$watch('$store.state.chat.messages', (v, old) => {
        if (!this.view) {
          this.titlePush()
          this.$refs.msgaduio.play()
        }
      })

      window.onblur = () => {
        this.view = false
      }

      window.onfocus = () => {
        this.view = true
        this.destroyTitlePush()
      }
    },

    socketSend (data) {
      this.socket.send(JSON.stringify(data))
    },

    async socketMessage () {
      return new Promise((resolve, reject) => {
        if (this.socket) this.socket.close()
        if (this.$_.isEmpty(this.$store.state.user.activeContract)) {
          this.resetChat()
          setTimeout(() => {
            reject()
          }, 1)
        }

        this.socket = new WebSocket(`wss://socket.vevanta.ru:8081/?token=${this.$store.state.auth.token}`)

        this.socket.onopen = e => {
          this.socketSend({
            event: 'get_chat_rooms',
            contract_id: this.$store.state.user.activeContract.id
          })
        }

        this.socket.onmessage = e => {
          if (e.data) {
            let data = JSON.parse(e.data)
            let result = data.result
            switch (data.type) {
              case 'get_chat_rooms':
                this.setEventGetRoomUsers(result[0])
                this.setEventGetLastMessage(result)
                break
              case 'get_room_users':
                this.setRoomUsers(result)
                break
              case 'get_last_message':
                this.addLastMessages(result)
                break
              case 'msg':
                this.setMsg(result)
                break
              case 'get_more_message':
                this.addMessagesHistory(result)
                break
            }
          }
        }

        resolve()
      })
    },

    setEventGetRoomUsers (data) {
      if (this.$_.isEmpty(data)) {
        this.resetChat()
        return
      }

      this.room = data
      this.socketSend({
        event: 'get_room_users',
        chat_room: this.room.id,
        contract_id: this.$store.state.user.activeContract.id
      })
    },

    setEventGetLastMessage (data) {
      this.socketSend({
        event: 'get_last_message',
        chat_room: this.room.id,
        contract_id: this.$store.state.user.activeContract.id
      })
    },

    setRoomUsers (data) {
      this.$store.commit('chat/SET_USERS', data)
    },

    setMsg (data) {
      this.$store.commit('chat/ADD_MSG', data)
      if (data.user_id === this.$store.state.auth.user.id) {
        this.statusScroll = true
        this.$nextTick(() => {
          this.$refs.addmsg_audio.play()
          this.scrollBottomChat()
        })
      } else {
        this.statusScroll = false
        if (this.scrollMoreForm) {
          this.statusNewMsg = true
        } else {
          this.$nextTick(() => {
            this.scrollBottomChat()
          })
        }
      }
    },

    async addLastMessages (messages) {
      this.$store.commit('chat/SET_MESSAGES', messages)
      await this.$nextTick(() => {
        this.scrollBottomChat()
      })
      this.disableInfiniteScroll = false
    },

    addMessagesHistory (m) {
      if (this.$_.isEmpty(m)) {
        this.$refs.infiniteScroll.stop()
        return
      }
      this.scrollPositon = getScrollPosition(window)
      this.scrollHeight = getScrollHeight(window)

      this.$store.commit('chat/ADD_MSG_HISTORY', m)
      this.infiniteScroll.done()
    },

    sendMessage () {
      if (this.message && !this.statusSendingMessage) {
        this.socketSend({
          event: 'msg',
          'chat_room': this.room.id,
          'contract_id': this.$store.state.user.activeContract.id,
          'msg': {
            type: 'text',
            text: this.message
          }
        })
        this.message = ''
      }
    },

    loadHistoryMessages (index, done) {
      this.infiniteScroll.done = done
      // Можно ли загружать данные
      if (this.checkBodyFixed()) {
        done()
        return false
      }
      // Когда не получена активная комната
      if (this.$_.isEmpty(this.room)) {
        done()

        return false
      }

      // Load last messages
      if (!this.socket) {
        this.socketMessage()
          .then(() => {
            this.loadMessages()
          })
      } else {
        this.loadMessages()
      }

      this.pageChatIndex++
      this.infiniteScroll.done()
    },

    loadMessages () {
      this.socketSend({
        event: 'get_more_message',
        chat_room: this.room.id,
        contract_id: this.$store.state.user.activeContract.id,
        load_index: this.pageChatIndex
      })
    },

    resetChat () {
      this.$store.commit('chat/SET_MESSAGES')
      this.$store.commit('chat/SET_USERS')
      this.room = {}
    },

    addMessesageImg (info) {
      if (this.room.id && !this.$_.isEmpty(this.$store.state.user.activeContract)) {
        this.files.forEach((file) => {
          this.socketSend({
            event: 'msg',
            'chat_room': this.room.id,
            'contract_id': this.$store.state.user.activeContract.id,
            'msg': {
              type: 'image',
              file: file.__img.src
            }
          })
        })

        this.dialog.upload = false
      }
    },

    removedFiles (files) {
      this.files = this.files.filter(file => file.lastModified !== files[0].lastModified)
    },

    filterFiles (files) {
      if (this.files.length >= 5) {
        this.$MSG_ERROR('Не более 5-ти изображений')
        return []
      }

      if (this.files.length + files.length > 5) {
        files = files.slice(0, 5 - this.files.length)
        this.$MSG_WARNING('Не более 5-ти изображений')
      }

      return files.filter((file) => {
        let rs = file.size <= 7e+6
        if (!rs) {
          this.$MSG_ERROR('Большой размер файла')
        }
        return rs
      })
    },

    scrollBottomChat () {
      document.body.style.top = '-' + (getScrollHeight(window) - this.$q.screen.height) + 'px'
      setScrollPosition(window, getScrollHeight(window), 2)
    },

    closeDialogContracts () {
      if (this.statusScroll) {
        setScrollPosition(window, this.scrollPositon, 2)
      } else {
        this.scrollBottomChat()
      }

      this.disableInfiniteScroll = false
    },

    openDialogContracts () {
      this.scrollPositon = getScrollPosition(window)

      if (this.scrollMoreForm) {
        this.statusScroll = true
      } else {
        this.statusScroll = false
      }

      this.disableInfiniteScroll = true
    },

    closeDialogUploader () {
      if (this.statusScroll) {
        this.scrollBottomChat()
      }
    },

    showNewMessages () {
      this.statusNewMsg = false
      this.scrollBottomChat()
    },

    scrollFixedChat () {
      setScrollPosition(window, (getScrollHeight(window) - this.scrollHeight) + this.scrollPositon, 2)
    },

    checkBodyFixed () {
      return this.hassClass('.q-body--fullscreen-mixin') || this.hassClass('q-body--prevent-scroll')
    },

    scrolled () {
      if ((getScrollHeight(window) - getScrollPosition(window)) <= (this.$q.screen.height + 50)) {
        this.scrollMoreForm = false
      } else {
        this.scrollMoreForm = true
      }
    },

    hassClass (cl, el = document.body) {
      return el.className.indexOf(cl) + 1
    },

    prevImgLoad () {
      this.dialog.upload = true
      this.imagesLoad.triggerSelect = true
      this.$nextTick(() => {
        document.getElementById('prevImgLoad').click()
      })
    },

    setFilesOnUpload (files) {
      files.forEach(item => this.files.push(item))
    },

    titlePush () {
      let statePush = 0
      let timer = () => {
        this.pushMsgDocument.timer = setTimeout(() => {
          if (statePush) {
            document.title = 'Веванта: Новые сообщение'
            statePush = 0
          } else {
            document.title = 'Веванта: Чат с командой'
            statePush = 1
          }
          timer()
        }, 800)
      }
      timer()
    },

    destroyTitlePush () {
      document.title = 'Веванта: Чат с командой'
      clearTimeout(this.pushMsgDocument.timer)
    },

    savePositionScroll () {
      this.scrollPositon = getScrollPosition(window)
      this.scrollHeight = getScrollHeight(window)
    }
  }

}
</script>

<style lang="css">
  .ar15 {
    right: 15px;
    top: 15px;
  }
  .bckg {
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
