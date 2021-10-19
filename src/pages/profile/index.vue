<template lang="html">
  <div id="profile">
   <div class="row">
     <q-list style="width: 100%; max-width: 320px">
         <q-item>
           <q-item-section top side>
            <q-avatar size="120px" class="cursor-pointer">
              <q-img :src="AVATAR" @click="prevImgLoad">
                <div class="fit hover-show radius">
                  <q-btn round flat class="absolute-center">
                    <q-icon name="photo_camera" size="32px" color="white"/>
                  </q-btn>
                </div>
              </q-img>
            </q-avatar>
          </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="text-body1">{{ $store.state.auth.user.login | phone }}</q-item-label>
              <q-item-label caption  class="text-body2" v-if="$store.state.auth.user.name">
                {{ $store.state.auth.user.name }}
              </q-item-label>
              <q-item-label caption  class="text-body2" v-else>
                ФИО отсутствует
              </q-item-label>
              <q-item-label caption class="text-body2" v-if="!$_.isEmpty($store.state.user.city)">
                г. {{ $store.state.user.city.label }}
              </q-item-label>
            </q-item-section>
        </q-item>
      </q-list>

      <div style="width: 100%; max-width: 700px;">
        <form @submit.prevent="updateProfileTh">
          <div class="q-pa-md q-gutter-md">
            <q-input filled v-model="account.name" label="Имя" ref="name"></q-input>
            <q-input filled v-model="account.surname" label="Фамилия"></q-input>
            <q-input filled v-model="account.lastname" label="Отчество"></q-input>
            <q-input
              @keydown="account.phone = fixPhone(account.phone)"
              @keyup="account.phone = fixPhone(account.phone)"
              v-model="account.phone"
              prefix="7"
              mask="(###) ###-##-##"
              filled
              label="Телефон"
              name="phone"
              unmasked-value
              hint="7 (XXX) XXX-XX-XX">
            </q-input>
            <q-input
              filled
              v-model="account.mail"
              label="E-mail"
              ></q-input>
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
            <q-btn color="light-blue-6" label="Обновить" type="submit"></q-btn>
          </div>
        </form>
      </div>
   </div>

   <q-dialog v-model="dialog.upload">

     <q-card class="full-width">
       <q-uploader
         :url="'https://api.vevanta.ru/users/upload/' + $store.state.auth.user.id"
         :headers="[{ name: 'token', value: $store.state.auth.token }]"
         label="Custom header"
         accept="image/*"
         class="full-width"
         @uploaded="finishUpdateAvatar"
         :filter="filterAvatar"
       >
         <template v-slot:header="scope">
           <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
             <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
               <q-tooltip>Удалить изображение</q-tooltip>
             </q-btn>
             <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" ></q-spinner>
             <div class="col">
               <div class="q-uploader__title">Выберите изображение (макс 7 МБ) </div>
               <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
             </div>
             <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
               <q-uploader-add-trigger id="prevImgLoad"></q-uploader-add-trigger>
               <q-tooltip>Добавить изображение</q-tooltip>
             </q-btn>
             <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat>
               <q-tooltip>Загрузить</q-tooltip>
             </q-btn>

             <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat>
               <q-tooltip>Abort Upload</q-tooltip>
             </q-btn>
           </div>
         </template>
       </q-uploader>
     </q-card>
   </q-dialog>

   <q-footer v-if="!$store.state.auth.user.viber_id">
     <q-toolbar class="shadow-1 bg-yellow-1 text-black text-center">
       <q-btn
         unelevated rounded
         label="Получать уведомления в Viber"
         style="background:#9169af; color:#FFF; margin: 0 auto"
         @click="onPushViber"
       ></q-btn>
     </q-toolbar>
   </q-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { openURL } from 'quasar'

export default {
  name: 'profile',
  data () {
    return {
      viberPush: false,
      dialog: {
        upload: false
      },

      selectCity: {},
      cityes: [
        { value: 1, label: 'Москва', sublabel: 'Москва и Московская обл.' },
        { value: 2229, label: 'Тюмень', sublabel: 'Тюменская обл.' },
        { value: 2228, label: 'Тобольск', sublabel: 'Тюменская обл.' },
        { value: 1888, label: 'Екатеринбург', sublabel: 'Свердловская обл.' }
      ],

      imagesLoad: {
        triggerSelect: false
      },

      account: {
        name: '',
        mail: '',
        surname: '',
        lastname: '',
        phone: ''
      },

      request: {
        profileUpdate: 1
      }
    }
  },

  created () {
    this.$_profileWatch()
    this.$_getCity()
    this.updateProfileTh = this.$_.throttle(this.updateProfile, 1000)
  },

  computed: {
    ...mapGetters({
      'NICKNAME': 'user/GET_NICKNAME',
      'AVATAR': 'user/GET_AVATAR'
    })

  },

  methods: {

    prevImgLoad () {
      this.dialog.upload = true
      this.imagesLoad.triggerSelect = true
      this.$nextTick(() => {
        document.getElementById('prevImgLoad').click()
      })
    },

    updateProfile () {
      if (this.request.profileUpdate) {
        if (!this.$_phoneCheck()) return

        this.request.profileUpdate = 0
        this.$store.dispatch('user/UPDATE_DATA_PROFILE', {
          name: this.account.name || '',
          lastname: this.account.lastname || '',
          surname: this.account.surname || '',
          mail: this.account.mail || '',
          phone: this.account.phone || '',
          city_id: this.selectCity.value || this.account.city_id
        })
          .then(() => {
            this.$store.commit('user/SET_CITY', this.selectCity)
            this.request.profileUpdate = 1
          })
          .catch(() => {
            this.request.profileUpdate = 1
          })
      }
    },

    $_phoneCheck () {
      let success = true

      if (this.account.phone.toString().length !== 10) {
        success = false
        this.$MSG_ERROR('Некорректный номер телефона')
      }

      return success
    },

    $_profileWatch () {
      this.account = { ...this.$store.state.auth.user }

      this.$watch('$store.state.auth.user', () => {
        this.account = { ...this.$store.state.auth.user }

        if (this.$_.isEmpty(this.$store.state.user.city)) {
          this.$store.dispatch('user/GET_CITY_BY_ID')
        }

        this.viberPush = this.$store.state.auth.user.viber_id
      })
    },

    finishUpdateAvatar () {
      this.$store.dispatch('user/UPDATE_AVATAR')
      this.dialog.upload = false
    },

    filterAvatar (files) {
      return files.filter((file) => {
        let rs = file.size <= 7e+6
        if (!rs) {
          this.$MSG_ERROR('Большой размер файла')
        }
        return rs
      })
    },

    fixPhone (v) {
      if (v[0] === '7' || v[0] === '8') {
        return parseInt(v.slice(1, v.length)) || null
      }
      return v
    },

    $_getCity () {
      this.selectCity = { ...this.$store.state.user.city }

      if (!this.$_.isEmpty(this.$store.state.auth.user)) {
        this.$store.dispatch('user/GET_CITY_BY_ID')
      }

      this.$watch('$store.state.user.city', () => {
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
    },

    getCity (val, doneFn, abortFn) {
      if (!val) {
        doneFn()
      }

      if (val) {
        let city = this.$axios.post('city/search', {
          s: val
        })

        city.then(rs => {
          if (!this.$_.isEmpty(rs)) {
            doneFn()
            this.cityes = rs.data
          } else {
            abortFn()
          }
        }).catch(rs => {
          abortFn()
        })
      }
    },

    onPushViber () {
      openURL(`viber://pa?chatURI=Vevanta72&text=${this.$store.state.auth.user.phone}`)
    }

  }
}
</script>

<style lang="css" scoped>
</style>
