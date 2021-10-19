<template>
  <div id="pdfdoc">
  </div>
</template>

<script>
export default {
  name: 'pdfdoc',
  props: ['page', 'scale'],
  created () {
    let viewport = this.page.getViewport({ scale: this.scale })

    let canvas = document.createElement('canvas')
    let canvasContext = canvas.getContext('2d')

    canvas.height = viewport.height
    canvas.width = viewport.width

    this.page.render({ canvasContext, viewport })

    this.$nextTick(() => {
      document.getElementById('pdfdoc').appendChild(canvas)
    })
  }
}
</script>
