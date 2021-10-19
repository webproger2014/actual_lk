<template lang="html">
  <div id="item-video">

    <div class="q-mt-md" v-if="!$_.isEmpty(taskVideo)">
      <div class="text-subtitle2 text-bold">Видео</div>
      <div class="q-col-gutter-md row q-mt-xs item-start">
        <div class="col-xs-12 col-sm-6 col-md-4 video"
          v-for="(video, index) in taskVideo"
          :key="index">
          <videoplay :srcvideo="$store.state.constant.CDN_DOMAIN + video.url"></videoplay>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import videoplay from 'components/videoplay/index.vue'

export default {
  name: 'itemvideo',
  components: { videoplay },
  props: ['taskVideo']
}
</script>
