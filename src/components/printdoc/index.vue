<template>
  <div id="printdoc" ref="container" @keyup.esc="ts">
      <iframe src="" ref="filePrint" style="display: none;"></iframe>
      <q-dialog
         v-model="dialog"
         :maximized="true"
         transition-show="slide-up"
         transition-hide="slide-down"
       >
        <q-card class="full-width" style="overflow: hidden">
          <q-toolbar class="bg-primary text-white">
            <q-btn dense flat round icon="keyboard_arrow_left" @click="closeDialog" />
            Вернуться

            <div class="text-center toolbar-center">
              <q-btn flat color="white" icon="zoom_out" size="13px" @click="scale -= 0.1"></q-btn>
              {{ (scale - 1.5).toFixed(1) }}
              <q-btn flat color="white" icon="zoom_in" size="13px" @click="scale += 0.1"></q-btn>

              стр {{ numPages }}
            </div>

          </q-toolbar>
          <div class="pdf-container">
            <document v-on:countpages="countPages" v-bind="{data, scale}"></document>
          </div>
        </q-card>
       </q-dialog>
  </div>
</template>

<script>
import document from 'components/printdoc/document.vue'

export default {
  name: 'printdoc',
  components: { document },
  data () {
    return {
      dialog: false,
      numPages: undefined,
      srcPdf: '',
      percentLoad: '',
      indexLoad: 1,
      scale: 3,
      data: ''
    }
  },

  methods: {
    print (docSrc) {
      let file = this.$refs.filePrint
      this.srcPdf = encodeURIComponent(docSrc)
      file.contentWindow.focus()
      file.onload = () => {
        file.contentWindow.print()
      }
    },

    closeDialog () {
      this.dialog = false
      this.data = null
      this.numPages = undefined
      this.scale = 3
    },

    open (e, docSrc) {
      if (e.target.getAttribute('nopen') === null) {
        this.srcPdf = encodeURIComponent(docSrc)
        this.dialog = true

        this.$nextTick(() => {
          setTimeout(() => {
            this.$_loadPdf(docSrc)
          }, 500)
        })
      }
    },

    async $_loadPdf (docSrc) {
      // if (docSrc.includes('contracts')) {
      // const token = this.$axios.defaults.headers.common['token']
      // this.$axios.get(`getfile/get_file/${token}?url=${docSrc}`)
      if (docSrc.includes('http')) {
        this.$axios.post('parse/file/pdf', {
          src: docSrc
        })
          .then(rs => {
            this.data = rs.data
          })
      } else {
        this.data = docSrc
      }
    },

    countPages (counts) {
      this.numPages = counts
    }
  }
}
</script>

<style scoped>
  .fixPdf {
    height: calc(100% - 49px)
  }

  canvas {
    max-width: 1024px;
  }

  .pdf-container {
    padding-bottom: 50px;
    height: 100%;
  }

  .preload-pdf {
    position: relative;
    height: 30px;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
  }

  .preload-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #e6e4e4;
    transition: 0.4s;
  }

  .canvas-container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    overflow: auto;
  }

  .toolbar-center {
    margin: 0 auto;
  }

</style>
