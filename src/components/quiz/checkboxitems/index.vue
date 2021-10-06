<template lang="html">
  <div id="checkboxitems">
    <div class="q-mb-md">
      <div class="question-title">
       {{ data.title }}
      </div>
    </div>

    <div class="row q-mt-lg">
      <q-checkbox
        v-model="checked"
        :val="key" v-for="(item, key) in data.questions.items"
        :key="key" class="q-mr-lg q-mb-md q-pr-md item-question col-xs-12 col-sm-12 col-md-4"
        @input="next(item)"
        >
        <q-item-label class="title-item">{{ item.title  }}</q-item-label>
      </q-checkbox>
    </div>

  </div>
</template>

<script>
export default {
  name: 'checkboxitems',
  props: ['indexquestion', 'data'],
  data: function () {
    return {
      checked: []
    }
  },

  created () {
    this.$emit('setStepButtons', this.data.next)
    this.checked = this.data.checked
    this.$emit('setStatusNext', this.$_.isEmpty(this.checked))
    this.$emit('delSlideHistoryPrev', this.indexquestion)
  },

  methods: {
    next (elem) {
      this.$emit('addSlideHistoryPrev', this.indexquestion)
      this.$emit('setStatusNext', this.$_.isEmpty(this.checked))
      this.$emit('saveCheckedInput', this.indexquestion, this.checked)
    }
  }

}
</script>
