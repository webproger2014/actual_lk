// import something here

// "async" is optional
export default ({ /* app, router, Vue, ... */ }) => {
  let form = {
    data() {
      return {
        api: {
          url: 'vevanta.ru/api/mail/vevanta'
        },
        form: '',
        name: '',
        email: '',
        msg: '',
        phone: '',
        url:'',
        // inputs: {
        //   phone: '',
        //   email: '',
        //   name: '',
        // },
        dataRequest: {}
      }
    },
    methods: {
      sendForm() {
        if (this.phone || this.email) {
          let msg = this.msg
          this.msg = `<br>Комментарий: ${msg}`


          let dataRequest = {
            ...this.dataRequest,
            form: this.form,
            name: this.name,
            email:this.email,
            phone:this.phone,
            comment: this.msg,
            url: location.href,
          }
          
          this.$axios.post(this.api.url, dataRequest)
          .then(() => {
            this.phone = '';
            this.email = '';
            this.name  = '';
            this.msg = '';
          })
        }
      },
    }
  }
}