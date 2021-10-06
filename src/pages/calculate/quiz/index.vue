<template>
  <div id="calculatequiz">
    <q-btn flat icon="keyboard_backspace" @click='$router.push(`/collection`)'></q-btn>
      <div class="q-pa-md bg-white" style="max-width: 1016px; width: 100%; margin: 0 auto;">
        <div class="quiz-vevanta" style="max-width: 1016px">
          <q-toolbar class="text-primary">
            <q-icon name="list_alt" size="20px"/>
            <q-toolbar-title class="quiz-title">{{ title }}</q-toolbar-title>
          </q-toolbar>
          <q-separator/>
          <q-tab-panels
            v-model="panel"
            animated
            ref="quiz"
            >

            <q-tab-panel :name="index" v-for="(item, index) in questions" :key="index">
              <radiogallery
                  v-if="item.questions.type === 'radiogallery'"
                  :indexquestion="index"
                  :data="item"
                  @next="next"
                  @setStepButtons="setStepButtons"
                  @saveCheckedInput="saveCheckedInput"
                  @setStatusNext="setStatusNext"
                  @addSlideHistoryPrev="addSlideHistoryPrev"
                  @delSlideHistoryPrev="delSlideHistoryPrev"
              >
              </radiogallery>
              <radioitems
                v-else-if="item.questions.type === 'radioitems'"
                  :indexquestion="index"
                  :data="item"
                  @next="next"
                  @setStepButtons="setStepButtons"
                  @saveCheckedInput="saveCheckedInput"
                  @setStatusNext="setStatusNext"
                  @addSlideHistoryPrev="addSlideHistoryPrev"
                  @delSlideHistoryPrev="delSlideHistoryPrev"
                >
              </radioitems>
              <checkboxitems
                  v-else-if="item.questions.type === 'checkboxitems'"
                  :indexquestion="index"
                  :data="item"
                  @next="next"
                  @setStepButtons="setStepButtons"
                  @saveCheckedInput="saveCheckedInput"
                  @setStatusNext="setStatusNext"
                  @addSlideHistoryPrev="addSlideHistoryPrev"
                  @delSlideHistoryPrev="delSlideHistoryPrev"
                >
              </checkboxitems>
            </q-tab-panel>

            <q-tab-panel name="end">
              <endquiz
                :questions="questions"
                @setStepButtons="setStepButtons"
                @addSlideHistoryPrev="addSlideHistoryPrev"
                @delSlideHistoryPrev="delSlideHistoryPrev"
              ></endquiz>
            </q-tab-panel>

          </q-tab-panels>

          <q-separator class="q-mb-lg" />

          <q-toolbar>
            <q-toolbar-title class="text-caption">Веванта</q-toolbar-title>
            <q-btn
              class="q-mr-md"
              size="12px"
              style="border-color: #e6e6e6"
              outline round
              color="grey-5"
              icon="keyboard_arrow_left"
              :disable="panel === 'slide-0'"
              @click="panel = historyPrev[historyPrev.length - 1]"
              ></q-btn>
            <q-btn

              class="next-btn"
              rounded
              color="primary"
              label="Далее"
              icon-right="arrow_forward"
              :disable="nextDisable"
              @click="panel = nextSlide"
              v-show="panel !== 'end'"
              ></q-btn>
          </q-toolbar>
        </div>
      </div>

  </div>
</template>

<script>
import data from 'pages/calculate/quiz/data.js'
import radiogallery from 'components/quiz/radiogallery'
import radioitems from 'components/quiz/radioitems'
import checkboxitems from 'components/quiz/checkboxitems'
import endquiz from 'components/quiz/endquiz'

export default {
  name: 'calculatequiz',

  components: {
    radiogallery,
    radioitems,
    checkboxitems,
    endquiz
  },

  data () {
    return {
      title: 'Расчёт стоимости дома',
      panel: 'slide-0',
      historyPrev: [],
      nextSlide: '',
      backSlide: '',
      nextDisable: true,
      questions: data
    }
  },

  methods: {

    addSlideHistoryPrev (slide) {
      this.historyPrev.push(slide)
    },

    delSlideHistoryPrev (slide) {
      this.historyPrev = this.historyPrev.filter((history) => history !== slide)
    },

    setStatusNext (status) {
      this.nextDisable = status
    },

    saveCheckedInput (key, checked) {
      this.questions[key].checked = checked
    },
    setStepButtons (nextSlide) {
      this.nextSlide = nextSlide
    },

    next (slide, backSlide) {
      this.panel = slide
    }
  }

}
</script>

  <style lang="sass">
    #calculatequiz
      .quiz-title
        font-size: 16px
        color: rgba(54, 54, 54, 0.7)

      .question-title
        font-size: 28px
        color: #363636

      .next-btn
        -webkit-box-shadow: 0 3px 10px 0 211, 64, 133, 0.5
        box-shadow: 0 3px 10px 0 211, 64, 133, 0.5
        will-change: box-shadow
        -webkit-transition: -webkit-box-shadow .2s ease-in
        transition: -webkit-box-shadow .2s ease-in
        transition: box-shadow .2s ease-in
        transition: box-shadow .2s ease-in,-webkit-box-shadow .2s ease-in
        text-transform: none

      .title-item
        color: rgba(54, 54, 54, 0.7)
        height: 50px
        display: flex
        align-items: center

      .item-question
        border-radius: 4px
        border: 1px solid #e6e6e6

      .radius-top
        border-top-left-radius: 4px
        border-top-right-radius: 4px

      .radio-active
        border-color: rgba(211, 64, 133, 0.5)

      .q-anchor--skip
        width: 100%

      .q-radio.tpl-1
        width: 100%
        max-width: 240px
        position: relative

        .q-radio__inner
          position: absolute
          right: 15px
          top: 15px
          z-index: 2

      .q-item
        width: 100%
        max-width: 240px

      @media screen and (max-width: 599px)
        .text-h5,
        .question-title
          font-size: 15px

        .quiz-title
          font-size: 14px

        .q-radio.tpl-1
          max-width: 120px

        .q-radio__label
          padding-left: 0

        .q-radio.tpl-1 .q-radio__inner
          right: 25px
          top: 7px
  </style>
