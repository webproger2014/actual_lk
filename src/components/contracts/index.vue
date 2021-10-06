<template lang="html">
  <div id="contracts">
    <div v-if="!$store.state.user.contractStatus" class="q-pa-md">
      <q-icon size="22px" name="warning" color="orange"/> <span class="text-caption q-ml-sm">Договоров нет</span>
    </div>
    <q-item tag="label" clickable v-ripple v-for="(contract, index) in $store.state.user.contract" :key="index" class="q-pl-xs">
       <q-radio v-model="activeContract" :val="index" color="orange" @input="updateDataByContract"></q-radio>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon name="file_copy"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ contract.contract_name }} {{ contract.id }}</q-item-label>
          <q-item-label caption>№ {{ contract.contract_number }} {{ contract.contract_date | dateString2 }}</q-item-label>
        </q-item-section>
     </q-item>
  </div>
</template>

<script>

export default {
  name: 'contracts',
  data () {
    return {
      activeContract: 0
    }
  },

  created () {
    this.activeContract = this.$store.state.user.contractActiveIndex

    if (this.$_.isEmpty(this.$store.state.user.contract)) {
      this.$store.dispatch('user/GET_DOC_CONTRACT')
    }

    if (!this.$_.isEmpty(this.$store.state.user.activeContract) && this.$_.isEmpty(this.$store.state.user.contractDocs)) {
      this.$store.dispatch('user/GET_DOC_CONTRACT')
    }

    this.$watch('$store.state.user.activeContract', (newV) => {
      this.$store.dispatch('user/GET_DOC_CONTRACT')
    })

    this.$watch('$store.state.user.contractActiveIndex', () => {
      this.activeContract = this.$store.state.user.contractActiveIndex
    })
  },

  methods: {
    updateDataByContract () {
      this.$store.dispatch('user/UPDATE_ACTIVE_CONTRACT', this.activeContract)
      this.$MSG_SUCCESS('Вы перешли на договор: ' + this.$store.state.user.activeContract.contract_name)
    }
  }
}
</script>

<style media="screen">

</style>
