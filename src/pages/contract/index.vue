<template>
  <div id="contract">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Договора
      </div>
    </div>

    <contracts/>

    <div class="q-pa-md">
      <div class="text-h5">
        Документы договора {{ $store.state.user.activeContract.contract_number }}
      </div>
    </div>

    <div v-if="!$store.state.user.contractDocs.length" class="q-pa-md">
      <q-icon size="22px" name="warning" color="orange"/> <span class="text-caption q-ml-sm">Документы отсутствуют</span>
    </div>
    <q-item clickable v-ripple v-for="(doc, index) in $store.state.user.contractDocs" :key="index" @click="$refs.doc.open($event, $store.state.constant.CDN_DOMAIN + doc.url)">
    <!-- <q-item clickable v-ripple v-for="(doc, index) in $store.state.user.contractDocs" :key="index" @click="getDocs(doc.url)"> -->
    <!-- <q-item clickable v-ripple v-for="(doc, index) in $store.state.user.contractDocs" :key="index" @click="$refs.doc.open($event, doc.url)"> -->
       <q-item-section avatar>
         <q-avatar color="primary" text-color="white">
           <q-icon name="file_copy"></q-icon>
         </q-avatar>
       </q-item-section>
       <q-item-section>
         <q-item-label>{{ doc.name }}</q-item-label>
         <q-item-label caption lines="1">{{ doc.id }}</q-item-label>
       </q-item-section>
       <q-item-section side>
        <q-icon name="visibility" color="grey"></q-icon>
       </q-item-section>
     </q-item>
     <!-- <q-btn label="ЖМИ СЮДА" @click="getDocs('/contracts/7/6ad31a221febbc090b161a2ab60100f1.pdf')" /> -->

    <printdoc ref="doc"></printdoc>
  </div>
</template>

<script>
import contracts from 'components/contracts/index.vue'
import printdoc from 'components/printdoc/index.vue'
// import { openURL } from 'quasar'

export default {
  name: 'contract',
  components: { contracts, printdoc },
  methods: {
    // getDocs (url) {
    //   const token = this.$axios.defaults.headers.common['token']

    //   this.$axios.get('getfile/get_file/' + token + '?url=' + encodeURIComponent(url))
    //     .then(rs => {
    //       openURL(rs.config.url)
    //     })
    // }
  }
}
</script>
