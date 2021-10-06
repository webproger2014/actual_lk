<template lang="html">
  <div id="home">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Гарантийное обслуживание
      </div>

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
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      activeDateGaranty: '',
      activeStatusGaranty: 0,
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
    startWatchGaranty () {
      if (this.$store.state.user.activeContract.id) {
        this.newItem.contract_id = this.$store.state.user.activeContract.id
      }

      this.$watch('$store.state.user.activeContract', () => {
        this.newItem.contract_id = this.$store.state.user.activeContract.id
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
