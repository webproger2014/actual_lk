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

    <div v-show="statusProject === 1">
      <div v-if="project.url_ar">
        <q-item
          clickable
          v-ripple
          @click="
            $refs.doc.open(
              $event,
              $store.state.constant.CDN_DOMAIN + project.url_ar
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

      <div v-if="project.url_cr">
        <q-item
          clickable
          v-ripple
          @click="
            $refs.doc.open(
              $event,
              $store.state.constant.CDN_DOMAIN + project.url_cr
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
      project: {
        id: null,
        user_id: null,
        contract_number: null,
        contract_date: null,
        name: null,
        url_ar: '',
        url_cr: ''
      }
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
        let project = this.$axios.get(
          `contract/get_contract/${this.$store.state.user.activeContract.id}`
        )
        project
          .then(rs => {
            if (!this.$_.isEmpty(rs.data)) {
              this.project = rs.data
              this.statusProject = 1
            } else {
              this.statusProject = 2
            }
          })
          .catch(rs => {
            this.statusProject = 2
          })
      } else {
        this.project = []
        this.statusProject = 2
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
