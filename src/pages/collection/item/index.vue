<template lang="html">
  <div id="collectionItem">
    <div v-if="houses.length">
      <div class="col q-pa-md text-h5">
        <q-btn flat icon="keyboard_backspace" @click="back"></q-btn>
        Проект дома "{{ houses.name }}"
      </div>
      <div class="row justify-center">
        <div class="col-12 col-lg-10">
          <div class="q-pa-md">
            <q-carousel
              animated
              v-model="slide"
              arrows
              thumbnails
              infinite
              class="myCarousel"
            >
              <q-carousel-slide
                v-for="(item, index) in houses.images"
                :name="index"
                :key="index"
                :img-src="`https://cdn.vevanta.ru/${item.url_1024}`"
              />
              <q-carousel-slide
                v-for="(video, index) in videos"
                :name="`video-${index}`"
                :key="`video-${index}`"
                :img-src="`https://i.ytimg.com/vi/${video}/hqdefault.jpg`"
              >
                <iframe
                  style="width: 100%"
                  class="absolute-full myCarousel"
                  :src="
                    `https://www.youtube.com/embed/${video}?autoplay=1&amp;`
                  "
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </q-carousel-slide>
            </q-carousel>
          </div>
          <div class="row q-pa-md text-center justify-between">
            <div class="col-6 col-sm-3 col-md-2">
              <div class="text-h6 textChar">
                Площадь
              </div>
              <div class="text-h5">{{ houses.square }} м<sup>2</sup></div>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
              <div class="text-h6 textChar">
                Этажность
              </div>
              <div class="text-h5">
                {{ houses.floors_q }}
              </div>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
              <div class="text-h6 textChar">
                Спальня
              </div>
              <div class="text-h5 text-center">
                {{ houses.rooms_q }}
              </div>
            </div>
            <div class="col-6 col-sm-3 col-md-2 q-mb-md">
              <div class="text-h6 textChar">
                Тип гаража
              </div>
              <div class="text-h5">
                {{ houses.garage_type_name }}
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-2 q-mb-md q-pr-sm">
              <div>
                <q-btn
                  class="full-width"
                  color="primary"
                  style="height: 55px"
                  label="Рассчитать стоимость"
                  @click="$router.push(`/calculate`)"
                />
              </div>
            </div>
            <div v-if="houses.url3dtour" class="col-12 col-sm-4 col-md-2">
              <div>
                <q-btn
                  class="full-width"
                  type="a"
                  :href="houses.url3dtour"
                  target="_blank"
                  color="secondary"
                  style="height: 55px;"
                  label="3D ТУР"
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="q-pa-md">
                <div class="text-h6">Характеристики</div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6 q-pa-md">
                  <q-markup-table>
                    <tbody>
                      <tr>
                        <td class="text-left">Цокольный этаж</td>
                        <td v-if="houses.groundfloor == 0" class="text-right">
                          Нет
                        </td>
                        <td v-if="houses.groundfloor == 1" class="text-right">
                          Есть
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Мансардный этаж</td>
                        <td v-if="houses.mansard == 0" class="text-right">
                          Нет
                        </td>
                        <td v-if="houses.mansard == 1" class="text-right">
                          Есть
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Крыша</td>
                        <td class="text-right">{{ houses.roof_type_name }}</td>
                      </tr>
                      <tr>
                        <td class="text-left">Площадь</td>
                        <td class="text-right">
                          {{ houses.square }} м<sup>2</sup>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Габариты</td>
                        <td class="text-right">
                          {{ houses.width }}x{{ houses.length }}
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
                <div class="col-12 col-sm-6 q-pa-md">
                  <q-markup-table>
                    <tbody>
                      <tr>
                        <td class="text-left">Ванная комната</td>
                        <td class="text-right">{{ houses.baths_q }}</td>
                      </tr>
                      <tr>
                        <td class="text-left">Тип гаража</td>
                        <td class="text-right">
                          {{ houses.garage_type_name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Этажность</td>
                        <td class="text-right">{{ houses.floors_q }}</td>
                      </tr>
                      <tr>
                        <td class="text-left">Спальня</td>
                        <td class="text-right">{{ houses.rooms_q }}</td>
                      </tr>

                      <tr>
                        <td class="text-left">Материал</td>
                        <td class="text-right">
                          <div v-if="houses.materials.includes('1')">
                            Кирпич
                          </div>
                          <div v-if="houses.materials.includes('2')">
                            Газоблок
                          </div>
                          <div v-if="houses.materials.includes('3')">
                            Керамический блок
                          </div>
                          <div v-if="houses.materials.includes('4')">
                            Керамзитоблок
                          </div>
                          <div v-if="houses.materials.includes('5')">
                            Пеноблок
                          </div>
                          <div v-if="houses.materials.includes('6')">
                            Клееный брус
                          </div>
                          <div v-if="houses.materials.includes('7')">
                            Бревно
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </div>
            </div>
          </div>
          <div class="q-pa-md">
            <div class="text-h6">
              Планировка
            </div>
            <div>
              <q-img
                v-for="(item, i) in houses.plans"
                :key="i"
                :src="`https://cdn.vevanta.ru/${item.url_1024}`"
              >
              </q-img>
            </div>
          </div>
          <div class="q-pa-md">
            <div class="text-h6">
              Описание
            </div>
            <div class="text-subtitle2">
              {{ houses.description }}
            </div>
          </div>
        </div>
        <form @submit.prevent="send" class="col-12 col-sm-4 col-md-3 col-lg-2">
          <div class="q-pa-md cardManager">
            <q-card flat bordered class="my-card bg-grey-1">
              <q-card-section>
                <div class="text-subtitle2 text-center">
                  {{ title }}
                </div>
              </q-card-section>

              <div class="text-center">
                <q-avatar size="180px">
                  <img :src="imgAgent" />
                </q-avatar>
              </div>

              <div class="text-center text-subtitle2">
                {{ nameAgent }}
              </div>
              <div class="q-pa-sm text-center text-subtitle2">
                <a v-if="numberOn" :href="telNumber" class="phoneNumber">
                  {{ phoneAgent | phone }}
                </a>
              </div>
              <div class="q-pa-sm text-center">
                <q-btn
                  v-if="!numberOn"
                  @click="numberOn = !numberOn"
                  class="full-width"
                  color="primary"
                  label="Показать номер"
                />
              </div>
              <div class="q-pa-sm text-center text-subtitle2">
                <q-input
                  @keydown="account.phone = fixPhone(account.phone)"
                  @keyup="account.phone = fixPhone(account.phone)"
                  v-model="account.phone"
                  prefix="7"
                  mask="(###) ###-##-##"
                  filled
                  label="Ваш номер:"
                  name="phone"
                  unmasked-value
                >
                </q-input>
              </div>
              <div class="q-pa-sm text-center">
                <q-btn
                  class="full-width"
                  color="primary"
                  label="Заказать звонок"
                  type="submit"
                />
              </div>
              <div class="q-pa-sm text-center checkboxForm">
                <label>
                  <input
                    class="uk-checkbox"
                    type="checkbox"
                    checked
                    v-model="checkPersoanalData"
                  />
                  Отправляя форму, вы соглашаетесь с обработкой
                  <a :href="politika" target="_blank">персональных данных</a>
                </label>
              </div>
            </q-card>
          </div>
        </form>
      </div>
    </div>
    <printdoc ref="doc"></printdoc>
  </div>
</template>

<script>
import printdoc from 'components/printdoc/index.vue'
import form from '../../../mixin/form'

export default {
  mixins: [form],
  components: { printdoc },
  props: {
    politika: {
      type: String,
      default: 'https://vevanta.com/politika-konfidencialnosti'
    },
    staffId: {
      type: Number
    },
    managerId: {
      type: Number
    },
    classId: {
      type: Number
    },
    sourceId: {
      type: Number
    }
  },
  data () {
    return {
      videos: [],
      title: 'Узнайте с чего начать строительство дома',
      checkPersoanalData: true,
      numberOn: false,
      slide: 0,
      nameAgent: '',
      phoneAgent: '',
      imgAgent: '',
      telNumber: '',
      city: '',
      cityId: '',
      selectCity: '',
      dataTime: '',
      idAgent: '',
      houses: [],
      account: {
        name: '',
        mail: '',
        surname: '',
        lastname: '',
        phone: ''
      },
      inputs: {
        phone: ''
      }
    }
  },

  created () {
    this.$_getHouse()
    this.getUsersStaff()
  },

  deactivated () {
    this.slide = 0
    this.videos = ''
    this.numberOn = false
    this.getUsersStaff()
    this.$_getHouse()
  },

  methods: {
    send () {
      this.formName = this.title
      this.inputs.phone = this.account.phone
      this.sendForm()
    },
    getUsersStaff () {
      this.dataTime = Date()
      let data = this.dataTime
      this.$store
        .dispatch('user/GET_USER', this.city)

        .then(rs => {
          this.cityId = rs.data.city_id
          if ((this.cityId === 1) || (data.includes('GMT+0300'))) {
            this.idAgent = ['92', '70', '294', '161']
          } else {
            this.idAgent = ['92', '70', '294', '161']
          }
          this.$axios
            .post('users/get_user', {
              user_id: this.idAgent[Math.floor(Math.random() * this.idAgent.length)]
            })
            .then(rs => {
              this.nameAgent = `${rs.data.name} ${rs.data.surname}`
              this.phoneAgent = `+ ${rs.data.phone}`
              this.telNumber = `tel:+7${rs.data.phone}`
              this.imgAgent = `https://cdn.vevanta.ru/${rs.data.photo}`
            })
        })
    },
    back () {
      this.$router.push('/collection')
    },
    $_getHouse () {
      this.$axios
        .post(`https://api.vevanta.ru/v1/projects/get_project_by_id`, {
          project_id: this.$route.params.id
        })
        .then(rs => {
          this.houses = rs.data[0]
          if (rs.data[0].videos) {
            this.videos = rs.data[0].videos.split(',')
          }
        })
    },
    fixPhone (v) {
      if (v[0] === '7' || v[0] === '8') {
        return parseInt(v.slice(1, v.length)) || null
      }
      return v
    }
  },
  watch: {
    $route (fo, from) {
      this.$_getHouse()
    }
  }
}
</script>

<style lang="css" scoped>
.phoneNumber {
  color: #042439;
  text-decoration: none;
  cursor: pointer;
}
.checkboxForm a {
  color: #00bab6;
  font-family: Gilroy-Semibold;
  text-decoration: none;
  cursor: pointer;
}
.textChar {
  color: #a7a7a7;
}
.pl0 {
  padding-left: 0;
}
.linkCard {
  text-decoration: none;
}
.myCarousel {
  height: 650px;
}
.cardManager {
  position: sticky;
  top: 45px;
}
@media screen and (max-width: 1440px) {
  .myCarousel {
    height: 650px;
  }
}
@media screen and (max-width: 1024px) {
  .myCarousel {
    height: 450px;
  }
}
@media screen and (max-width: 768px) {
  .myCarousel {
    height: 350px;
  }
}
@media screen and (max-width: 425px) {
  .myCarousel {
    height: 200px;
  }
}
</style>
