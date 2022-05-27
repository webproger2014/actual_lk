<template>
  <div id="graphpayment-c">
    <div class="q-pa-md">
      <q-table
        title="Платежи"
        :loading="$store.state.user.graphpaymentLoading"
        :data="$store.state.user.graphpayment"
        :columns="columns"
        row-key="id"
        rows-per-page-label="Платежей"
        :rows-per-page-options="[15, 25, 50]"
        no-data-label="Нету не одного платежа"
        loading-label="Загрузка"
        :pagination-label="paginationLabel"
        :pagination.sync="pagination"
      >
        <template v-slot:body="props" hide-bottom="false" pagesNumber="15">
          <q-tr :props="props" class="bg-color-red" :class="checkDatePayment(props.row.date_payment, props.row.status)" v-if="props.row.type != 2">
            <q-td key="title" :props="props" class="text-bold">
              {{ props.row.title }}
            </q-td>
            <q-td key="summ" :props="props">
                {{ props.row.summ | currency }}
            </q-td>
            <q-td key="date_payment" :props="props">
                {{ props.row.date_payment | dateN }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge v-if="props.row.status" color="teal" >
                оплачено
              </q-badge>
              <q-badge v-else-if="checkSuccessDatePayment(props.row.date_payment)" color="orange">
                ждет оплаты
              </q-badge>
              <q-badge v-else color="red" >
                просрочено
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>

  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'graphpayment',
  data () {
    return {
      summa: 0,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Название',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: false
        },
        { name: 'summ', label: 'Стоимость этапа', field: 'summ' },
        { name: 'date_payment', label: 'Дата платежа', field: 'date_payment' },
        { name: 'status', label: 'Статус', field: 'status' }
      ],
      data: []
    }
  },

  created () {
    if (this.$_.isEmpty(this.$store.state.user.graphpayment)) {
      this.$store.dispatch('user/GET_GRAPHPAYMENT')
    }

    this.$watch('$store.state.user.activeContract', () => {
      this.$store.dispatch('user/GET_GRAPHPAYMENT')
    })
  },

  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },

  methods: {
    paginationLabel (firstRowIndex, endRowIndex, totalRowsNumber) {
      return firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber
    },

    checkDatePayment (datePayment, status) {
      datePayment = new Date(date.formatDate(datePayment, 'YYYY-MM-DD') + ' 23:59:59').getTime()
      let classTd = ''
      if (status) {
        classTd = 'td-green'
      } else if (Date.now() <= datePayment) {
        classTd = 'td-orange'
      } else {
        classTd = 'td-red'
      }
      return classTd
    },

    checkSuccessDatePayment (datePayment) {
      datePayment = new Date(date.formatDate(datePayment, 'YYYY-MM-DD') + ' 23:59:59').getTime()
      let state = false
      if (Date.now() <= datePayment) {
        state = true
      }
      return state
    }
  }
}
</script>

<style lang="css" scoped>
  .td-green {
    background-color: #b3ffb9;
  }

  .td-red {
    background-color: #ffb3b3;
  }

  .td-orange {
    background-color: rgba(241, 255, 32, 0.13);
  }
</style>
