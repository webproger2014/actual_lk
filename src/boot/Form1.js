
let form = {
  data() {
    return {
      api: {
        url: 'mail'
      },
      formName: '',
      msg: '',
      inputs: {
        phone: '',
        email: '',
        name: '',
      },
      dataRequest: {}
    }
  },

  methods: {
    sendForm() {
      if (this.inputs.phone || this.inputs.email) {
        let msg = this.msg
        this.msg = `Форма: ${this.formName} <br>Имя: ${this.inputs.name} <br>Телефон: ${this.formatPhone || this.inputs.phone} <br>E-mail: ${this.inputs.email} <br>Источник: ${location.href} <br>Комментарий: ${msg}`


        let dataRequest = {
          ...this.inputs,
          ...this.dataRequest,
          form: this.formName,
          msg: this.msg,
          url: location.href,
        }
        
        this.$axios.post(this.api.url, dataRequest)
        .then(() => {
          this.inputs.phone = '';
          this.inputs.email = '';
          this.inputs.name  = '';
          this.msg = '';
        })
      }
    },
  }
}

export default form
