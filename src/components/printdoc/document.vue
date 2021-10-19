<template lang="html">
  <div ref="wrapperiframe" class="canvas-container text-center">
    <q-circular-progress
      indeterminate
      size="40px"
      color="light-blue-6"
      class="q-ma-md absolute-center"
      v-show="!pages.length"
    ></q-circular-progress>
    <div v-for="(page, index) in pages" :key="index">
      <page v-bind="{page, scale}"></page>
    </div>

  </div>
</template>

<script>
import pdfjs from 'pdfjs-dist'
import page from 'components/printdoc/page.vue'

export default {
  props: ['data', 'scale'],
  components: { page },
  data () {
    return {
      pdf: undefined,
      pages: []
    }
  },
  created () {
    this.fetchPDF()
  },
  methods: {
    fetchPDF () {
      if (this.data) {
        let docData = {
          withCredentials: false
        }

        if (this.data.includes('.pdf')) {
          docData['url'] = this.data
        } else {
          docData['data'] = atob(this.data)
        }

        pdfjs.getDocument(docData).promise.then(pdf => {
          this.pdf = pdf
        })
      }
    }
  },

  watch: {
    data () {
      this.fetchPDF()
    },
    pdf (pdf) {
      this.pages = []
      this.$emit('countpages', pdf.numPages)
      const promises = this.$_.range(1, pdf.numPages + 1)
        .map(number => pdf.getPage(number))

      Promise.all(promises)
        .then(pages => (this.pages = pages))
    }
  }
}
</script>

<style lang="css" scoped>
</style>
