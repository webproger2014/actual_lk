<template lang="html">
  <div id="project">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Проект дома
      </div>
      <div v-show="statusProject === 2" class="q-pa-md">
        <q-icon size="22px" name="warning" color="orange" />
        <span class="text-caption q-ml-sm">У Вас нет проекта</span>
      </div>
    </div>

    <div>
      <div v-if="urlArStatus === 1">
        <q-item
          v-for="(url, index) in urlAr"
          :key="index"
          clickable
          v-ripple
          @click="
            $refs.doc.open(
              $event,
              $store.state.constant.CDN_DOMAIN + url
            )
          "
        >
          <q-item-section avatar>
            <img class="cur" src="/statics/icons/pdf_min.png" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Архитектурный раздел</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="visibility" color="grey"></q-icon>
          </q-item-section>
        </q-item>
      </div>
      <div v-else-if="urlArStatus === 2">
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <img class="cur" src="/statics/icons/pdf_min.png" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" text-color="red"><span class="text-amber-10">Архитектурный раздел не загружен</span></q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div v-if="urlCrStatus === 1">
        <q-item
        v-for="(url, index) in urlCr"
        :key="index"
          clickable
          v-ripple
          @click="
            $refs.doc.open(
              $event,
              $store.state.constant.CDN_DOMAIN + url
            )
          "
        >
          <q-item-section avatar>
            <img class="cur" src="/statics/icons/pdf_min.png" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Конструктивный раздел</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="visibility" color="grey"></q-icon>
          </q-item-section>
        </q-item>
      </div>
      <div v-else-if="urlCrStatus === 2">
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <img class="cur" src="/statics/icons/pdf_min.png" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" text-color="red"><span class="text-amber-10">Конструктивный раздел не загружен</span></q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div v-if="urlIsStatus === 1">
        <q-item
        v-for="(url, index) in urlIs"
        :key="index"
          clickable
          v-ripple
          @click="
            $refs.doc.open(
              $event,
              $store.state.constant.CDN_DOMAIN + url
            )
          "
        >
          <q-item-section avatar>
            <img class="cur" src="/statics/icons/pdf_min.png" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Инженерные сети</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="visibility" color="grey"></q-icon>
          </q-item-section>
        </q-item>
      </div>
      <div v-else-if="urlIsStatus === 2">
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <img class="cur" src="/statics/icons/pdf_min.png" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" text-color="red"><span class="text-amber-10">Инженерный раздел не загружен</span></q-item-label>
          </q-item-section>
        </q-item>
      </div>

    </div>

    <printdoc ref="doc"></printdoc>
  </div>
</template>

<script>
import printdoc from 'components/printdoc/index.vue'

export default {
  name: 'project',
  components: { printdoc },
  data () {
    return {
      statusProject: 0,
      urlAr: [],
      urlArStatus: 0,
      urlCr: [],
      urlCrStatus: '',
      urlIs: [],
      urlIsStatus: 0

    }
  },

  created () {
    this.$_getProject()
    this.$_watching()
  },

  methods: {
    $_watching () {
      this.$watch('$store.state.user.activeContract', () => {
        this.$_getProject()
      })
    },

    $_getProject () {
      if (!this.$_.isEmpty(this.$store.state.user.activeContract)) {
        this.$axios.post(`docs/get_ar/${this.$store.state.user.activeContract.id}`).then(rs => {
          if (!this.$_.isEmpty(rs.data)) {
            this.urlAr = rs.data.urls
            this.urlArStatus = 1
          } else {
            this.urlArStatus = 2
          }
        })

        this.$axios.post(`docs/get_cr/${this.$store.state.user.activeContract.id}`).then(rs => {
          if (!this.$_.isEmpty(rs.data)) {
            this.urlCr = rs.data.urls
            this.urlCrStatus = 1
          } else {
            this.urlCrStatus = 2
          }
        })

        this.$axios.post(`docs/get_is/${this.$store.state.user.activeContract.id}`).then(rs => {
          if (!this.$_.isEmpty(rs.data)) {
            this.urlIs = rs.data.urls
            this.urlIsStatus = 1
          } else {
            this.urlIsStatus = 2
          }
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.pl0 {
  padding-left: 0;
}

</style>
