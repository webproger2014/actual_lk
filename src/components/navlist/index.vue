<template lang="html">
  <div id="navlist">
    <q-item clickable v-ripple to="/contract">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="inbox"></q-icon>
      </q-item-section>
      <q-item-section>
       Договор
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/garanty">
      <q-item-section avatar class="text-grey-5">
        <q-icon name="chat"></q-icon>
      </q-item-section>
      <q-item-section>
       Гарантийное обслуживание
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/project">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="rounded_corner"></q-icon>
      </q-item-section>
      <q-item-section>
       Проект
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/collection">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="library_add_check"></q-icon>
      </q-item-section>
      <q-item-section>
       Коллекция проектов
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/stages">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="list_alt"></q-icon>
      </q-item-section>
      <q-item-section>
       Этапы
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/graphpayment">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="payment"></q-icon>
      </q-item-section>
      <q-item-section>
       График платежей
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="video">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="ondemand_video"></q-icon>
      </q-item-section>
      <q-item-section>
       Видеонаблюдение
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/offers" v-if="false">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="list_alt"></q-icon>
      </q-item-section>
      <q-item-section>
       Расчёты стоимости
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/calculate">
      <q-item-section avatar class="text-grey-5">
        <q-icon name="bubble_chart"></q-icon>
      </q-item-section>
      <q-item-section>
       Рассчитать стоимость
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/team">
      <q-item-section avatar class="text-grey-5">
        <q-icon name="people_outline"></q-icon>
      </q-item-section>
      <q-item-section>
      Моя команда
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/task">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="format_list_bulleted"></q-icon>
      </q-item-section>
      <q-item-section>
       Задачи
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple @click="$refs.doc.open($event, '/statics/about-company.pdf')">
      <q-item-section avatar class="text-grey-6">
        <q-icon name="info"></q-icon>
      </q-item-section>
      <q-item-section>
       О компании
      </q-item-section>
    </q-item>

    <printdoc ref="doc"></printdoc>
  </div>
</template>

<script>
import printdoc from 'components/printdoc/index.vue'

export default {
  name: 'navlist',
  components: {
    printdoc
  }

}
</script>

<style lang="css" scoped>
  .q-router-link--active {
    transition: 0.2s;
    background-color: #1074b9;
    color: #FFF
  }

  .q-router-link--active .q-icon {
    color: #FFF;
  }
</style>
