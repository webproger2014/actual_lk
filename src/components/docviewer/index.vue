<template>
  <div id="docviewer">
      <pdfdoc
        v-for="(page, index) in pages"
        :page="page"
        :scale="1.4"
        :key="index"
      ></pdfdoc>
  </div>
</template>

<script>
import pdfjs from 'pdfjs-dist'
import pdfdoc from 'components/docviewer/document.vue'

export default {
  name: 'docviewer',
  props: ['url', 'scale'],
  components: { pdfdoc },
  data () {
    return {
      pdf: null,
      pages: []
    }
  },

  created () {
    this.fetchPDF()
  },

  methods: {
    fetchPDF () {
      pdfjs.getDocument(this.url).promise
        .then(pdf => {
          this.pdf = pdf
          this.pages = []

          const promises = this.$_.range(1, 3).map(number => pdf.getPage(number))

          return Promise.all(promises)
        })
        .then(pages => {
          this.pages = pages
        })
    }
  }
}
</script>
