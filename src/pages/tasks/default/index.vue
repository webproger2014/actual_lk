<template lang="html">
  <div id="helpdefault">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Задачи по объекту
      </div>
      <div class="q-pa-md" v-if="statusTasks === 0">
        <q-skeleton type="rect"></q-skeleton>
      </div>
      <div class="q-pa-md" v-if="statusTasks === 2">
        <q-icon size="22px" name="warning" color="orange"/> <span class="text-caption q-ml-sm">Задачи по объекту отсутствуют</span>
      </div>
    </div>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <div class="row q-pl-md q-pr-md" v-show="statusTasks === 1">
      <div
        class="col col-md-3 col-xs-12 q-mr-md q-mt-md"
        v-for="(task, index) in tasks"
        :key="index"
        @click="$router.push(`/task/${task.id}`)"
        >
        <div class="cursor-pointer task q-pa-md">
          <div class="col text-subtitle1 ellipsis">{{ task.title }}</div>
          <div class="col text-caption ellipsis" style="color: #848484;">{{ task.description }}</div>
          <div class="row">
            <div class="col q-mt-md">
              <q-chip :color="$_checkStatusTask(task.status_id)" text-color="white">
                {{ task.status_name }}
              </q-chip>
            </div>
            <div class="row text-right q-mt-md">
              <div class="col" v-if="task.staff_photo">
                <q-avatar round flat size="36px" class="q-mr-xs" >
                  <q-img :src="$store.state.constant.CDN_DOMAIN + task.staff_photo"></q-img>
                </q-avatar>
                <q-tooltip
                  content-class="bg-blue-6"
                  content-style="font-size: 13px"
                  :offset="[10, 10]">
                  {{ task.staff_role}}: {{ task.staff_name }}
                </q-tooltip>
              </div>
              <div class="col" v-if="task.creator_photo">
                <q-avatar round flat size="36px" class="q-mr-xs">
                  <q-img :src="$store.state.constant.CDN_DOMAIN + task.creator_photo"></q-img>
                </q-avatar>
                <q-tooltip
                  content-class="bg-blue-6"
                  content-style="font-size: 13px"
                  :offset="[10, 10]">
                  {{ task.creator_role }}: {{ task.creator_name }}
                </q-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center q-mt-sm text-caption" style="color: #949494;">
          {{ task.date_create | dateString2}}
        </div>
      </div>
    </div>
    </transition>

  </div>
</template>

<script>

export default {
  name: 'helpdefault',

  created () {
    this.$_getTasks()
    this.$_watching()
  },

  data: () => {
    return {
      statusTasks: 0,
      tasks: []
    }
  },

  methods: {
    $_watching () {
      this.$watch('$store.state.user.activeContract', () => {
        this.$_getTasks()
      })
    },

    $_getTasks () {
      if (!this.$_.isEmpty(this.$store.state.user.activeContract)) {
        let tasks = this.$axios.post(`task/list/${this.$store.state.user.activeContract.id}`)
        tasks.then(rs => {
          if (!this.$_.isEmpty(rs.data)) {
            this.tasks = rs.data
            this.$_getUsersTask()
            this.statusTasks = 1
          } else {
            this.tasks = []
            this.statusTasks = 2
          }
        })
      } else {
        this.statusTasks = 2
      }
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

    async $_getUsersTask () {
      let tasks = this.tasks

      tasks.forEach((task, i) => {
        let userCreator = this.$store.dispatch('user/GET_USER', task.creator_id)

        userCreator.then(rs => {
          if (rs.data) {
            let user = rs.data
            this.$set(this.tasks[i], 'creator_photo', user.photo)
            this.$set(this.tasks[i], 'creator_name', user.name)
            this.$set(this.tasks[i], 'creator_role', user.role_name)
          }
        })

        let userStaff = this.$store.dispatch('user/GET_USER', task.staff_id)

        userStaff.then(rs => {
          if (rs.data) {
            let user = rs.data
            this.$set(this.tasks[i], 'staff_photo', user.photo)
          }
        })
      })
    }

  }
}
</script>

<style>
  .task {
    background-color: #f7f7f7;
    transition: 0.4s;
  }

  .task:hover {
    background-color: #e5f8ff;
  }
</style>
