<template lang="html">
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="fullscreen"
      transition-show="slide-up"
      transition-hide="slide-down"
    >

      <q-card class="bg-primary">
        <q-carousel
          swipeable
          animated
          :arrows="false"
          dark
          v-model="slide"
          class="fullscreen"
          @input="bgAd()"
          infinite
        >
          <q-carousel-slide
          :name="0"
          :img-src="$store.state.constant.CDN_DOMAIN + img"
          :class="[bgSizeAuto ? 'auto' : '']"
          ></q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control
              position="top-right"
              :offset="[18, 18]"
            >
              <q-btn
                push round dense color="white" text-color="primary"
                icon="close"
                @click="fullscreen = !fullscreen"
              ></q-btn>
            </q-carousel-control>
          </template>
        </q-carousel>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'fullimgchat',
  data () {
    return {
      img: '',
      slide: 0,
      bgSizeAuto: false,
      fullscreen: false,
      statusDisplayDialog: false
    }
  },

  created () {
    this.$watch('$q.screen.width', () => {
      this.bgAd()
    })
  },

  methods: {
    zoom (img) {
      this.img = img
      this.fullscreen = true
      this.bgAd()
    },

    bgAd () {
      if (!this.fullscreen) {
        return false
      }

      let image = new Image()
      image.onload = () => {
        if (image.width < window.innerWidth) {
          this.bgSizeAuto = true
        } else {
          this.bgSizeAuto = false
        }
      }
      image.src = this.$store.state.constant.CDN_DOMAIN + this.img
    }
  }
}
</script>

<style lang="css" scoped>
  .q-carousel__slide {
    background-size: contain;
    background-repeat: no-repeat;
  }
  .q-carousel__slide.auto {
    background-size: auto;
  }
</style>
