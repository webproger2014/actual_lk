<template lang="html">
  <div id="item-photos">

    <div class="q-mt-md" v-if="!$_.isEmpty(taskPhotos)">
      <div class="text-subtitle2 text-bold">Фото</div>
      <div class="q-col-gutter-md row q-mt-xs item-start">
        <div class="col-xs-12 col-sm-6 col-md-3" v-for="(img, index) in taskPhotos" :key="index">
            <q-img :ratio="16/9" :src="$store.state.constant.CDN_DOMAIN + img.url300" @click="$refs.fullimg.zoom(index, taskPhotos)" class="cursor-pointer"></q-img>
        </div>
      </div>
    </div>

    <fullimg ref="fullimg"></fullimg>
  </div>
</template>

<script>
import fullimg from 'components/fullimg/index.vue'

export default {
  name: 'itemphotos',
  components: { fullimg },
  props: ['taskPhotos']
}
</script>
