<template lang="html">
  <div id="team">
    <q-list>
      <q-item-label header>Моя команда</q-item-label>
      <div v-if="!filerResponsible" class="q-pa-md">
        <q-icon size="22px" name="warning" color="orange"/> <span class="text-caption q-ml-sm">Ответственные не назначены</span>
      </div>
      <div v-for="(user, index) in filerResponsible" :key="index">
        <transition
          appear
          enter-active-class="animated fadeIn"
        >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="getPhoto(user.photo)">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
            <q-item-label>{{ user.surname }}</q-item-label>
            <q-item-label caption>
              <!-- <span class="text-weight-bold">{{ user.role_name }}</span> -->
              <span class="text-weight-bold">{{ user.user_position_name }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section v-if="$store.state.user.contract[0].id !== 7" side top>
            {{ user.phone | phone }}
          </q-item-section>
        </q-item>
        </transition>
        <q-separator spaced inset="item"></q-separator>
      </div>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'team',
  data () {
    return {
      responsible: []
    }
  },
  created () {
    this.getResponsible()
  },
  computed: {
    filerResponsible () {
      return this.responsible.filter(user => {
        if ((user.id !== 68) && (user.id !== 90) && (user.id !== 409) && (user.active = 1)) {
          return true
        }
      })
    }
  },
  methods: {
    checkDoubles () {
      const responsible = this.responsible
      const team = this.$store.state.user.team

      const unique = team.reduce((unique, userTeam) => {
        let isFound = responsible.some((userRes) => {
          return userRes.id === userTeam.id
        })
        if (!isFound) { unique.push(userTeam) }
        return unique
      }, [])

      Array.prototype.push.apply(this.responsible, unique)
    },
    getResponsible () {
      this.$axios.post('users/get_constant_responsibles')
        .then(rs => {
          this.responsible = rs.data
          this.checkDoubles()
        })
    }
  }
}
</script>
