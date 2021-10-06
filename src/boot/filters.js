import Vue from 'vue'
import { date } from 'quasar'

const MONTHS_RUS = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
  'Октябрь', 'Ноябрь', 'Декабрь'
]

const MONTH_SHORT_RUS = [
  'Янв', 'Фев', 'Мар', 'Апр',
  'Май', 'Июн', 'Июл', 'Авг', 'Сент',
  'Окт', 'Ноя', 'Дек'
]

Vue.filter('dateString', (v) => {
  return date.formatDate(v, 'MMMM DD, YYYY HH:mm', {
    months: MONTHS_RUS,
    monthsShort: MONTH_SHORT_RUS
  })
})

Vue.filter('dateT', (v) => {
  return date.formatDate(v * 1000, 'MMMM DD, YYYY HH:mm', {
    months: MONTHS_RUS,
    monthsShort: MONTH_SHORT_RUS
  })
})

Vue.filter('dateString2', (v) => {
  return date.formatDate(v, 'MMMM DD, YYYY', {
    months: MONTHS_RUS,
    monthsShort: MONTH_SHORT_RUS
  })
})

Vue.filter('dateN', (v) => date.formatDate(v, 'DD.MM.YYYY'))

Vue.filter('currency', (v) => {
  v = (v / 1).toFixed(2).replace('.', ',')
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
})

Vue.filter('number', (v) => {
  v = v.toString().replace('.', ',')
  console.log(v)
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
})

Vue.filter('phone', (v) => {
  return v ? v.toString().replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '7 ($1) $2-$3-$4') : v
})
