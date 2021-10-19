<template lang="html">
  <div id="endquiz">
    <div class="q-mb-md">
      <div class="question-title">
      </div>
    </div>

    <div class="row flex-center">
      <div v-show="!status">
        <div>
          <q-knob
            disable
            v-model="progress"
            show-value
            size="150px"
            :thickness="0.22"
            color="primary"
            track-color="grey-3"
            class="text-primary q-ma-md"
          ></q-knob>
        </div>
        <div class="fit text-center">
          {{ msg }}
        </div>
      </div>
      <transition
          appear
          enter-active-class="animated fadeIn"
        >
      <div class="fit text-center" v-show="status === 1">
        <div class="col q-mt-md">
          <q-btn
            unelevated
            size="17px"
            text-color="white"
            label="Получить результат"
            type="submit"
            style="width: 100%; background: #1074b9;"
            @click="send"
            ></q-btn>
        </div>
      </div>
    </transition>

    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
    <div class="fit text-center" v-show="status === 2">
      <div class="text-h5">
         Спасибо за заявку! В ближайшее время мы свяжемся с Вами!
      </div>
    </div>
  </transition>

    </div>

  </div>
</template>

<script>
export default {
  name: 'endquiz',
  props: ['questions'],
  data () {
    return {
      progress: 10,
      msg: 'Подготовка расчёта',
      resultCalculateMsg: '',
      status: 0,
      phone: '',
      name: '',
      politika: true
    }
  },

  created () {
    this.$_startProgress()
    this.$_createMsg()
  },

  methods: {
    $_startProgress () {
      if ((this.progress += 4) < 100) {
        setTimeout(() => {
          this.$_startProgress()
        }, 100)
      } else {
        this.msg = 'Расчёт готов'
        setTimeout(() => {
          this.status = 1
        }, 600)
      }
    },

    $_createMsg () {
      for (let question in this.questions) {
        question = this.questions[question]
        let items = question.questions.items
        if (this.$_.isArray(question.checked)) {
          this.resultCalculateMsg += `
            Вопрос: ${question.title}
            Ответ:
          `
          question.checked.forEach((item) => {
            this.resultCalculateMsg += `
            ${items[item].title}`
          })
        } else {
          let title = items[question.checked].title
          this.resultCalculateMsg += `
            Вопрос: ${question.title}
            Ответ: ${title}
          `
        }
      }
    },

    send () {
      this.$axios.post('https://rest.vevanta.com/calc/send/calc_crm', {
        msg: this.resultCalculateMsg,
        phone: this.$store.state.auth.user.phone,
        name: this.$store.state.auth.user.name
      })
      this.status = 2
    }

  }

}
</script>
