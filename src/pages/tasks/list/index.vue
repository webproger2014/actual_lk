<template lang="html">
  <div id="list">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Ваши тикеты
      </div>
    </div>
    <div class="q-pa-md">
      <q-item tag="label" clickable v-ripple  class="q-pl-xs">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <img src="https://bitrix2.cdnvideo.ru/b5757951/resize_cache/23796/23365dd92c1f65a6eb81283cfddb6812/main/5d6/5d692e1c89a30b0cf18a8d52e09cc85b/IMG_8193.jpg?h=vevanta.bitrix24.ru">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-bold">Руководитель (1)</span> - Я бы хотел начать строительство зимой
              <q-badge align="top">Открыт</q-badge>
            </q-item-label>
            <q-item-label caption>Здравствуйте! Строительство дома в холодный период будет...</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>Август 29, 2019</q-item-label>
          </q-item-section>
       </q-item>
      <q-separator></q-separator>
      <q-item tag="label" clickable v-ripple  class="q-pl-xs">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <img src="https://bitrix2.cdnvideo.ru/b5757951/resize_cache/29174/23365dd92c1f65a6eb81283cfddb6812/main/045/045828801ec4fcc5685ba4a056113e83/me.png?h=vevanta.bitrix24.ru">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-bold">Менеджер (7)</span> - Можно рассчитать пристройку к дому?
              <q-badge color="orange" align="top">В процессе</q-badge>
            </q-item-label>
            <q-item-label caption>Добрый день! Я перезвоню вам в ближайшее время...</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>Август 29, 2019</q-item-label>
          </q-item-section>
       </q-item>
      <q-separator></q-separator>
      <q-item tag="label" clickable v-ripple  class="q-pl-xs">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <img src="https://bitrix2.cdnvideo.ru/b5757951/resize_cache/29226/23365dd92c1f65a6eb81283cfddb6812/main/3cc/3cc5e4f33ee2667ded558189e1149b29/IMG_8135.png?h=vevanta.bitrix24.ru">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-bold">Арихектор (2)</span> - Возможно ли осуществить перепланировку?
              <q-badge color="grey" align="top">Закрыт</q-badge>
            </q-item-label>
            <q-item-label caption>Возможно учитывая что это может усложнить строительство...</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>Август 29, 2019</q-item-label>
          </q-item-section>
       </q-item>
    </div>

  </div>
</template>

<script>

export default {
  name: 'list'
}
</script>
