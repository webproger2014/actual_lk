<template>
  <div id="videoplay" class="col-xs-12 col-sm-6 col-md-4">
    <div class="item-img relative-position">
        <video class="position-absolute fit" controls :src="srcvideo"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'videoplay',
  props: ['srcvideo', 'srcimg'],
  data () {
    return {
      play: false
    }
  }
}
</script>

<style lang="css" scoped>

</style>
