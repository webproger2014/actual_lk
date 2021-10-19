<template lang="html">
  <div id="collection">
    <form @submit.prevent="$_getHouses">
      <div class="row">
        <div class="col-12 col-sm-6 col-md q-pa-md">
          <q-input filled v-model="filterTools.rooms" label="Кол-во спален" />
        </div>
        <div class="col-12 col-sm-6 col-md q-pa-md">
          <q-select
            filled
            v-model="filterTools.materials"
            :options="materials"
            hide-selected
            label="Материал"
            multiple
            emit-value
            map-options
          >
            <template
              v-slot:option="{
                itemProps,
                itemEvents,
                opt,
                selected,
                toggleOption
              }"
            >
              <q-item v-bind="itemProps" v-on="itemEvents">
                <q-item-section>
                  <q-item-label v-html="opt.label"></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle :value="selected" @input="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-sm-6 col-md q-pa-md">
          <q-select
            filled
            v-model="filterTools.floors"
            :options="floors"
            label="Этажность"
            emit-value
            map-options
          >
            <template
              v-slot:option="{
                itemProps,
                itemEvents,
                opt,
                selected,
                toggleOption
              }"
            >
              <q-item v-bind="itemProps" v-on="itemEvents">
                <q-item-section>
                  <q-item-label v-html="opt.label"></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle :value="selected" @input="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-sm-6 col-md q-pa-md">
          <q-select
            filled
            v-model="filterTools.garage_type"
            :options="garage_type"
            label="Тип гаража"
            emit-value
            map-options
          >
            <template
              v-slot:option="{
                itemProps,
                itemEvents,
                opt,
                selected,
                toggleOption
              }"
            >
              <q-item v-bind="itemProps" v-on="itemEvents">
                <q-item-section>
                  <q-item-label v-html="opt.label"></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle :value="selected" @input="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-sm-6 col-md q-pa-md">
          <div class="row q-gutter-x-xs">
            <div class="col">
              <q-input
                filled
                v-model="filterTools.square[0]"
                label="Площадь от"
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="filterTools.square[1]"
                label="Площадь до"
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md q-pa-md">
          <q-btn
            class="full-width"
            style="height: 55px"
            type="submit"
            color="primary"
            label="Найти проект"
          />
        </div>
      </div>
    </form>

    <div>
      <div class="row justify-center">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md"
          v-for="(house, i) in houses"
          :key="i"
        >
          <a class="linkCard" href="/collection#object" @click='showObject=true, objectId=house'>
            <q-card class="my-card">
              <q-img :src="`https://cdn.vevanta.ru/${house.images[0].url}`">
              </q-img>
              <div class="row">
                <div class="col-10 q-pa-md" align="left">
                  <div class="text-bold fs18 fs20@m" style="color:black">
                    {{ house.name }}{{ house.id }}
                  </div>
                  <div style="color:black" class="fs16">
                    <q-icon
                      color="secondary"
                      name="aspect_ratio"
                      style="font-size: 2rem;"
                    />
                    {{ house.square }} м
                    <sup>2</sup>
                  </div>
                  <div style="color:black" class="fs16">
                    Размерность x: {{ house.width }}, y: {{ house.length }}
                  </div>
                  <div class="q-mt-md">
                    <q-btn color="primary" label="Смотреть проект" />
                  </div>
                </div>
                <!-- <div class="col-2">
                  <q-card-actions align="right">
                    <q-btn flat round color="red" icon="favorite" />
                    <q-btn flat round color="teal" icon="bookmark" />
                    <q-btn flat round color="primary" icon="share" />
                  </q-card-actions>
                </div> -->
              </div>
            </q-card>
          </a>
        </div>
      </div>
      <div></div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          :max="pages"
          :direction-links="true"
          :max-pages="10"
          @input="$_getHouses"
        >
        </q-pagination>
      </div>
    </div>
    <div id="object" v-show="showObject">
      {{objectId}}
    </div>

    <printdoc ref="doc"></printdoc>
  </div>
</template>

<script>
import printdoc from 'components/printdoc/index.vue'

export default {
  name: 'collection',
  components: { printdoc },
  data () {
    return {
      objectId: [],
      showObject: false,
      current: 1,
      pages: 0,
      filterTools: {
        count: 12,
        bathrooms: 0,
        garage_type: '',
        basement: 0,
        roof_type: 0,
        mansard: 0,
        dimension: [],
        sort: 'popular',
        word: '',
        materials: [1, 2, 3, 4, 5, 6, 7],
        floors: 0,
        rooms: 3,
        square: [150, 0]
      },
      rooms: ['1', '2', '3', '4', '5'],
      materials: [
        {
          label: 'Кирпич',
          value: 1
        },
        {
          label: 'Газоблок',
          value: 2
        },
        {
          label: 'Керамический блок',
          value: 3
        },
        {
          label: 'Керамзитоблок',
          value: 4
        },
        {
          label: 'Пеноблок',
          value: 5
        },
        {
          label: 'Клееный брус',
          value: 6
        },
        {
          label: 'Бревно',
          value: 7
        }
      ],
      floors: [
        {
          label: 'Все',
          value: 0
        },
        {
          label: '1 этаж',
          value: 1
        },
        {
          label: '2 этажа',
          value: 2
        },
        {
          label: '3 этажа',
          value: 3
        }
      ],
      garage_type: [
        {
          label: 'Любой',
          value: ''
        },
        {
          label: 'Гараж в доме',
          value: '2'
        },
        {
          label: 'Без гаража',
          value: 'not'
        },
        {
          label: 'Отдельный гараж',
          value: '5'
        }
      ],
      houses: []
    }
  },

  created () {
    this.$_getHouses()
  },

  methods: {
    $_getHouses () {
      this.$axios
        .post(`https://api.vevanta.ru/v1/projects`, {
          settings: {
            page: this.current
          },
          filter: this.filterTools
        })
        .then(rs => {
          this.pages = rs.data.pages
          this.houses = rs.data.projects
        })
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="css" scoped>
.pl0 {
  padding-left: 0;
}
.linkCard {
  text-decoration: none;
}
</style>
