
<script>
export default {
  props: ['page', 'scale'],
  render (h) {
    const { canvasAttrs: attrs } = this
    return h('canvas', { attrs })
  },

  created () {
    this.viewport = this.page.getViewport({ scale: this.scale })
  },

  mounted () {
    this.drawPage()
  },

  computed: {
    canvasAttrs () {
      let { width, height } = this.viewport
      const style = this.canvasStyle
      return {
        width,
        height,
        style
      }
    },

    canvasStyle () {
      const { width: actualSizeWidth, height: actualSizeHeight } = this.actualSizeViewport
      const pixelRatio = window.devicePixelRatio || 1
      const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight]
        .map(dim => Math.ceil(dim / pixelRatio))
      return `width: ${pixelWidth}px; height: ${pixelHeight}px;`
    },

    actualSizeViewport () {
      return this.viewport.clone({ scale: this.scale - 1.5 })
    }
  },

  methods: {
    drawPage () {
      const { viewport } = this
      const canvasContext = this.$el.getContext('2d')
      const renderContext = { canvasContext, viewport }

      this.renderTask = this.page.render(renderContext)
    }

  }
}
</script>

<style lang="css" scoped>
</style>
