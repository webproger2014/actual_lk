<template lang="html">
  <div id="helpdefault">
    <div class="q-pa-md">

      <div class="v-slider" ref="vSlider">
        <div class="wrapper">

          <div class="v-slide">
            <img src="/statics/slider/1.jpg">
          </div>

          <div class="v-slide">
            <img src="/statics/slider/2.jpg">
          </div>

          <div class="v-slide">
            <img src="/statics/slider/3.jpg">
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'slider',
  data: () => {
    return {
      apiUrl: 'https://api.telegram.org/bot944532677:AAHEFxyPbGkPh0GqDqkevUB4jAYWe9yTSTA'
    }
  },

  created () {
    this.$_start()

    /*  let rq = this.$axios.post(`${this.apiUrl}/sendMessage`, {
      chat_id: '@channelusername',
      text: 'front-end'
    })

    rq.then(rs => {
      console.log('then', rs)
    })
      .catch(rs => {
        console.log('error', rs)
      }) */

  /*  let chat = this.$axios.get(`${this.apiUrl}/getChat?chat_id=@mychannelname`)

    chat.then(rs => {
      console.log('chat', rs)
    })
      .catch(rs => {
        console.log(rs)
      }) */
  },

  methods: {
    $_start () {
      this.$nextTick(() => {
        /*    let slider = this.$refs.vSlider
        let wrapper = slider.querySelector('.wrapper')
        let slides = slider.querySelectorAll('.v-slide')

        slider.style.width = `${slides[0].clientWidth}px`

        let widthWrapper = 0

        slides.forEach((item, i) => {
          widthWrapper += item.clientWidth
        })

        wrapper.style.width = `${widthWrapper}px` */
      })
    }
  }
}
</script>

<style lang="sass">
.v-slider

.v-slider > .wrapper
  display: flex

.v-slide

</style>
