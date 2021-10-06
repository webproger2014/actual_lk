import axios from 'axios'
let form = {

  data () {
    return {
      api: {
        url: 'https://vevanta.ru/api/mail/vevanta'
      },
      city: '',
      cityId: '',
      formName: '',
      msg: '',
      inputs: {
        phone: '',
        email: '',
        name: ''
      },
      dataRequest: {}
    }
  },
  methods: {
    sendForm () {
      if (this.inputs.phone || this.inputs.email) {
        let msg = this.msg
        this.msg = `Форма: ${this.formName} <br>Комментарий: ${msg}`
        this.dataTime = Date()
        let data = this.dataTime
        this.$store
          .dispatch('user/GET_USER', this.city)

          .then(rs => {
            this.cityId = rs.data.city_id
            if ((this.cityId === 1) || (data.includes('GMT+0300'))) {
              this.api.url = 'https://vevanta.ru/api/mail/vevanta_sk'
            }
            let dataRequest = {
              ...this.inputs,
              ...this.dataRequest,
              name: this.inputs.name,
              form: this.formName,
              msg: this.msg,
              phone: this.inputs.phone,
              email: this.inputs.email,
              url: location.href,
              staffId: 1320
            }

            axios.post(this.api.url, dataRequest)
              .then(() => {
                this.$q.notify({
                  type: 'positive',
                  icon: 'announcement',
                  progress: true,
                  message: 'Заявка отправленна',
                  color: 'secondary'
                })
                this.account.phone = ''
                this.inputs.phone = ''
                this.inputs.email = ''
                this.inputs.name = ''
                this.msg = ''
              })
          })
      }
    }
  }
}

export default form
