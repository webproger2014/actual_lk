<template lang="html">
  <div id="radiogallery">
    <div class="q-mb-md">
      <div class="question-title">
       {{ data.title }}
      </div>
    </div>

    <carousel
      :per-page="column"
      :mouse-drag="true"
      ref="carousel"
      paginationActiveColor="#d34085"
      :paginationSize="13"
      class="text-center"
      >

      <slide
        v-for="(item, index) in data.questions.items"
        :key="index"
        :data-name="'Слайд ' + index"
        >
        <q-radio v-model="checked"
          :val="index"
          class="tpl-1"
          @input="next(item, $event)"
          >
          <div class="item-question" :class="{'radio-active': checked === index }">
            <q-img :ratio="1" :src="item.img" class="col radius-top"/>
            <q-item-label class="q-mt-md q-pr-md q-pl-md title-item">{{ item.title }}</q-item-label>
          </div>
        </q-radio>
      </slide>
     </carousel>

  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'radiogallery',
  props: ['indexquestion', 'data'],
  components: {
    Carousel,
    Slide
  },
  data: function () {
    return {
      checked: false,
      slide: 0,
      column: 3,
      slides: []
    }
  },

  created () {
    this.getColumn()
    this.$watch('$q.screen.width', () => {
      this.getColumn()
    })

    this.$emit('setStepButtons',
      this.data.prev,
      this.data.next
    )

    this.checked = this.data.checked
    this.$emit('setStatusNext', this.checked === false)
    this.$emit('delSlideHistoryPrev', this.indexquestion)
  },

  computed: {
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'rgb(212, 48, 125)',
        width: '5px',
        opacity: 0.75
      }
    }
  },

  methods: {

    next (elem) {
      this.$emit('addSlideHistoryPrev', this.indexquestion)
      this.$emit('saveCheckedInput', this.indexquestion, this.checked)
      this.$emit('setStepButtons', elem.next || this.data.next)

      setTimeout(() => {
        this.$emit('next',
          elem.next || this.data.next
        )
      }, 400)
    },

    getColumn () {
      let v = this.$q.screen.width

      if (v < 960) {
        this.column = 2
      }

      if (v > 960) {
        this.column = 3
      }
    }
  }
}
</script>
<style>
  .route-arrow {
    z-index: 2;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  .route-back {
    left: 29px;
  }

  .route-next {
    right: -16px;
  }
</style>
