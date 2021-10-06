<template lang="html">
  <div id="radioitems">

    <div>
      <div class="q-mb-md">
        <div class="question-title">
          {{ data.title }}
        </div>
      </div>

      <div class="row q-mt-lg">
        <q-radio
          v-model="checked"
          :val="key" v-for="(item, key) in data.questions.items"
          :key="key" class="q-mr-lg q-mb-md item-question col-xs-12 col-sm-12 col-md-4"
          :class="{'radio-active': checked === key}"
          @input="next(item, $event)"
          >
          <q-item-label class="title-item">{{ item.title  }}</q-item-label>
        </q-radio>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'radioitems',
  props: ['indexquestion', 'data'],
  data () {
    return {
      checked: false
    }
  },

  created () {
    this.$emit('setStepButtons', this.data.next)
    this.checked = this.data.checked
    this.$emit('setStatusNext', this.checked === false)
    this.$emit('delSlideHistoryPrev', this.indexquestion)
  },

  methods: {
    next (elem) {
      this.$emit('addSlideHistoryPrev', this.indexquestion)
      this.$emit('saveCheckedInput', this.indexquestion, this.checked)
      this.$emit('setStepButtons', elem.next || this.data.next)
      setTimeout(() => {
        this.$emit('next', elem.next || this.data.next)
      }, 400)
    }
  }

}
</script>
