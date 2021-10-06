<template>
  <div id="cctv">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Видеонаблюдение
      </div>
    </div>
    <div class="q-pa-md absolute-center full-width text-center">
        <div class="text-h5">Нет соединения</div>
        <div class="text-body1 q-mt-md flex-center">
          <div style="max-width: 650px; margin: 0 auto;">
            <div id="videoplay" class="col-xs-12 col-sm-6 col-md-4">
              <div class="item-img relative-position">
                  <video autoplay loop class="camera position-absolute fit" src="/statics/cctv.mp4" ref="video"></video>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cctv',
  mounted () {
    this.$refs.video.volume = 0.1
  }
}
</script>

<style>
  @media screen and (max-width: 599px) {
    .camera {
      max-width: 180px;
    }
  }
</style>
