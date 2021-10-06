<template lang="html">
  <div id="taskitem">
    <div class="q-pa-md">
      <div class="col q-pa-md cont-task">
        <q-btn flat icon="keyboard_backspace" @click="back">
        </q-btn>
        <q-skeleton type="rect" v-show="statusTask === 0"></q-skeleton>
        <q-chip :color="$_checkStatusTask(task.status_id)" text-color="white" v-if="statusTask === 1">
          {{ task.status_name }}
        </q-chip>
        <div v-show="statusTask === 2" class="q-pa-md text-center">
          <q-icon size="22px" name="warning" color="orange"/> <span class="text-caption q-ml-sm">Отсутствуют данные по задаче</span>
        </div>
        <q-separator class="q-mt-md"></q-separator>

        <div v-if="statusTask === 1">
          <div class="q-mt-md">
            <div class="col text-h6">{{ task.title }}</div>
          </div>
          <div class="q-mt-md">
            <div class="col" style="color: #848484;">{{ task.description }}</div>
          </div>

          <itemphotos :taskPhotos="taskPhotos"></itemphotos>
          <itemvideo :taskVideo="taskVideo"></itemvideo>

          <div class="persons q-mt-md row">
            <div class="col" v-if="task.staff_photo">
              <div class="text-subtitle2 text-bold">Ответственный</div>
              <div class="q-pt-sm">
                <q-avatar round flat size="36px" class="q-mr-xs" >
                  <q-img :src="$store.state.constant.CDN_DOMAIN + task.staff_photo"></q-img>
                  <q-tooltip
                    content-class="bg-blue-6"
                    content-style="font-size: 13px"
                    :offset="[10, 10]">
                    {{ task.staff_role }}: {{ task.staff_name }}
                  </q-tooltip>
                </q-avatar>
              </div>
            </div>
            <div class="col" v-if="task.creator_photo">
              <div class="text-subtitle2 text-bold">Поручитель</div>
              <div class="q-pt-sm">
                <q-avatar round flat size="36px" class="q-mr-xs">
                  <q-img :src="$store.state.constant.CDN_DOMAIN + task.creator_photo"></q-img>
                  <q-tooltip
                    content-class="bg-blue-6"
                    content-style="font-size: 13px"
                    :offset="[10, 10]">
                    {{ task.creator_role }}: {{ task.creator_name }}
                  </q-tooltip>
                </q-avatar>
              </div>
            </div>
          </div>

          <div class="dates q-mt-lg">
            <div class="text-subtitle2 text-bold">
              Сроки
              <q-badge
                align="top"
                color="orange"
                outline
              >
                {{ task.date_diff_create }} дн
              </q-badge>
            </div>
            <div class="text-caption date-item">Создано: {{ task.date_create | dateString2 }}</div>
            <div class="text-caption date-item" v-show="task.date_accept">Принято: {{ task.date_accept | dateString2 }}</div>
            <div class="text-caption date-item">Выполним: {{ task.date_plan | dateString2 }}</div>
            <div class="text-caption date-item" v-show="task.date_finish">Выполнено: {{ task.date_finish | dateString2 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import itemphotos from 'pages/tasks/item/photos.vue'
import itemvideo from 'pages/tasks/item/video.vue'

export default {
  name: 'tasks',
  components: { itemphotos, itemvideo },
  data () {
    return {
      statusTask: 0, // 0 - Load, 1 load success, 2 task empty
      task: [],
      taskPhotos: [],
      taskVideo: []
    }
  },
  created () {
    this.$_getTask()
  },

  methods: {
    $_getTask () {
      if (!this.$route.params.id) {
        return
      }

      this.task = []
      this.taskPhotos = []
      this.taskVideo = []

      let task = this.$axios.get(`task/get/${this.$route.params.id}`)
      task.then(rs => {
        if (!this.$_.isEmpty(rs.data)) {
          let data = rs.data

          let dateCreate = new Date(data.task.date_create)
          let datePlan = new Date(data.task.date_plan)
          let diff = Math.abs(date.getDateDiff(dateCreate, datePlan))

          data.task.date_diff_create = diff

          this.task = data.task
          this.taskPhotos = data.photos
          this.taskVideo = data.video

          this.statusTask = 1
          this.$_getUsersTask()
        } else {
          this.statusTask = 2
        }
      })
    },

    async $_getUsersTask () {
      let userCreator = this.$store.dispatch('user/GET_USER', this.task.creator_id)

      userCreator.then(rs => {
        if (rs.data) {
          let user = rs.data
          this.task = Object.assign({}, this.task, {
            creator_photo: user.photo,
            creator_name: user.name,
            creator_role: user.role_name
          })
        }
      })

      let userStaff = this.$store.dispatch('user/GET_USER', this.task.staff_id)

      userStaff.then(rs => {
        if (rs.data) {
          let user = rs.data
          this.task = Object.assign({}, this.task, {
            staff_photo: user.photo
          })
        }
      })
    },

    $_checkStatusTask (status) {
      let classStatus = 'light-blue-6'
      switch (status) {
        case 1:
          classStatus = 'grey-6'
          break
        case 2:
          classStatus = 'light-blue-6'
          break
        case 3:
          classStatus = 'green-6'
          break
      }

      return classStatus
    },

    back () {
      this.statusTask = 0
      this.$router.push('/task')
    }
  },

  watch: {
    $route (fo, from) {
      this.$_getTask()
    }
  }
}
</script>

<style>
  .cont-task {
    max-width: 960px;
    margin: 0 auto;
    background-color: #FFF;
    border: 1px solid #e4e4e4;
  }

  .date-item {
    color: #969696;
  }

  #taskitem {
    position: fixed;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #ececec;
    padding-bottom: 58px;
    overflow-y: auto;
  }
</style>
