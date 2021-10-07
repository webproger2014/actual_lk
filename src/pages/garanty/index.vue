<template lang="html">
  <div id="home">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Гарантийное обслуживание
      </div>
    </div>

    <div class="q-pa-md">

      <q-tabs
         v-model="tab"
         dense
         class="text-grey"
         active-color="primary"
         indicator-color="primary"
         align="justify"
         narrow-indicator
       >
         <q-tab name="0" label="Создать заявку"></q-tab>
         <q-tab name="1" label="Список заявок"></q-tab>
        </q-tabs>

        <q-tab-panels
         v-model="tab"
         animated
         swipeable
         infinite
         >
          <q-tab-panel name="0">
            <div class="q-pa-md">
              Срок обслуживания:
              <span v-show="activeStatusGaranty === 0">"Выберите категорию"</span>
              <q-badge transparent align="middle" color="green" v-show="activeStatusGaranty" v-if="activeStatusGaranty === 1">
                до {{ activeDateGaranty }}
              </q-badge>
              <q-badge transparent align="middle" color="red" v-show="activeStatusGaranty" v-if="activeStatusGaranty === 2">
                до {{ activeDateGaranty }}
              </q-badge>
            </div>

            <q-card v-if="newItem.problem_found">
               <q-card-section>Заполните заявку</q-card-section>
               <q-card-section >
                 <q-form class="col q-gutter-md" @submit="addClaim" name="claim" enctype="multipart/form-data">
                   <q-select dense outlined :options="claimTypes" label="Категория" v-model="newItem.type_id" required map-options emit-value />
                   <q-input dense outlined label="Способ связи" hint="Номер телефона, почта или мессенджер" v-model="newItem.contact" required/>
                   <q-input dense outlined type="date" label="Дата обнаружения проблемы" hint="дд.мм.гггг" v-model="newItem.problem_found" stack-label required/>
                   <q-input type="textarea" dense outlined label="Описание проблемы" v-model="newItem.comment" required/>
                   <q-file dense outlined label="Фотографии" v-model="photos" multiple append use-chips accept=".jpeg, .jpg" hint="Изображения в формате .jpg, .jpeg" ref="files">
                     <template v-slot:prepend>
                       <q-icon name="attach_file"/>
                     </template>
                   </q-file>
                   <q-btn label="Отправить" type="submit" :disabled="activeStatusGaranty != 1"/>
                 </q-form>
               </q-card-section>
              </q-card>
          </q-tab-panel>

          <q-tab-panel name="1">
            <div v-for="(item, index) in listApplication" :key="index">
              <q-timeline :color="getStatusApplication(item) > 0 ? ( getStatusApplication(item) === 1 ? 'orange' : 'secondary') : 'grey-5'">
                <q-chip v-if="!item.in_progress && !item.closed_at">
                  Рассматривается
                </q-chip>
                <q-chip color="orange" text-color="white" v-else-if="item.in_progress && !item.closed_at">
                  Выполняется
                </q-chip>
                <q-chip color="green" text-color="white" v-else-if="!item.in_progress && item.closed_at">
                 Завершено
                </q-chip>
                <q-timeline-entry
                  :title="item.type_id === 1 ? 'Строительно-монтажные работы' : 'Инженерные системы'"
                  :subtitle="item.created_at | dateString3"
                  :icon="getStatusApplication(item) > 0 ? ( getStatusApplication(item) === 1 ? 'done' : 'done_all') : 'schedule'"
                >
                <div>
                  <p>
                    <strong>Описание проблемы: </strong>{{ item.comment }}
                  </p>

                  <template v-if="item.urls_400.length">
                    <span class="text-body1">Мои изображения:</span>
                    <div class="q-col-gutter-md row items-start">
                      <div class="col-xs-12 col-sm-6 col-md-4" v-for="(img, index) in item.urls_400" :key="index" style="max-width: 300px;">
                        <q-img :ratio="16/9" :src="$store.state.constant.CDN_DOMAIN + img" @click="$refs.fullimg.zoom(index, item.urls)" class="cursor-pointer"></q-img>
                      </div>
                    </div>
                  </template>

                  <template v-if="item.urls2_400.length">
                    <span class="text-body1">Фотоотчет:</span>
                    <div class="q-col-gutter-md row items-start">
                      <div class="col-xs-12 col-sm-6 col-md-4" v-for="(img, index) in item.urls2_400" :key="index" style="max-width: 300px;">
                        <q-img :ratio="16/9" :src="$store.state.constant.CDN_DOMAIN + img" @click="$refs.fullimg.zoom(index, itm.urls2)" class="cursor-pointer"></q-img>
                      </div>
                    </div>
                  </template>

                </div>
                </q-timeline-entry>

            </q-timeline>
            <hr/>
          </div>
          </q-tab-panel>

        </q-tab-panels>

    </div>
    <fullimg ref="fullimg"></fullimg>
  </div>
</template>

<script>
import fullimg from 'components/fullimg/index.vue'

export default {
  name: 'home',
  components: { fullimg },
  data () {
    return {
      tab: '0',
      activeDateGaranty: '',
      activeStatusGaranty: 0,
      listApplication: [],

      claimTypes: [{ value: 1, label: 'Строительно-монтажные работы' }, { value: 2, label: 'Инженерные системы' }],
      newItem: {
        contract_id: '',
        contact: '',
        type_id: ''
      },
      photos: []
    }
  },

  created () {
    this.setDefaultInfo()
    this.startWatchGaranty()
  },

  methods: {
    getStatusApplication (application) {
      if (!application.in_progress && !application.closed_at) {
        return 0
      } else if (application.in_progress && !application.closed_at) {
        return 1
      } else if (!application.in_progress && application.closed_at) {
        return 2
      }
    },
    _getListApplication () {
      this.$axios.post('warranty/read_all', {
        id: this.$store.state.user.activeContract.id,
        type_id: [1, 2]
      })
        .then(rs => {
          this.listApplication = rs.data
        })
    },
    startWatchGaranty () {
      if (this.$store.state.user.activeContract.id) {
        this.newItem.contract_id = this.$store.state.user.activeContract.id
        this._getListApplication()
      }

      this.$watch('$store.state.user.activeContract', () => {
        this.newItem.contract_id = this.$store.state.user.activeContract.id
        this._getListApplication()
      })

      this.$watch('$store.state.auth.user', () => {
        this.newItem.contact = this.$store.state.auth.user.phone
      })

      this.$watch('newItem.type_id', () => {
        let garantyYear = 5

        if (this.newItem.type_id === 2) {
          garantyYear = 1
        }

        let dateContract = new Date(this.$store.state.user.activeContract.contract_date)
        let dateContractEnd = new Date(dateContract.getFullYear() + garantyYear, dateContract.getMonth(), dateContract.getDate())

        let m = dateContract.getMonth()
        let d = dateContract.getDate()

        if (m.toString().length === 1) {
          m = `0${m}`
        }

        if (d.toString().length === 1) {
          d = `0${d}`
        }

        this.activeDateGaranty = m + '.' + d + '.' + (dateContract.getFullYear() + garantyYear)
        if (Date.now() <= dateContractEnd.getTime()) {
          this.activeStatusGaranty = 1
        } else {
          this.activeStatusGaranty = 2
          this.$MSG_ERROR('Истек срок гарантийного обслуживания')
        }
      })
    },
    setDefaultInfo () {
      let today = new Date()
      this.newItem = {
        contract_id: '',
        contact: '',
        type_id: '',
        problem_found: today.toISOString().substring(0, 10)
      }

      if (this.$store.state.auth.user.phone) {
        this.newItem.contact = this.$store.state.auth.user.phone
      }
    },

    addClaim () {
      if (this.activeStatusGaranty) {
        let formData = new FormData()
        for (let key in this.newItem) {
          formData.append(key, this.newItem[key])
        }

        for (var i = 0; i < this.photos.length; i++) {
          let file = this.photos[i]
          formData.append('photos[' + i + ']', file)
        }

        this.$axios.post('warranty/create', formData)
          .then(res => {
            this.setDefaultInfo()
            this.$MSG_SUCCESS('Ваша заявка успешно создана')
          })
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
