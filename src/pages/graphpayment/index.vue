<template lang="html">
  <div id="graphpayment-p">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        График платежей
      </div>
    </div>
    <graphpayment/>
  </div>
</template>

<script>
import graphpayment from 'components/graphpayment/index.vue'
export default {
  name: 'graphpaymentp',
  components: { graphpayment }
}
</script>
