<template lang="html">
  <div id="team-page">
    <div class="q-pa-md gt-sm">
      <div class="text-h4 xs-text-h4">
        Моя команда
      </div>
      <div class="row q-mt-md" v-if="!$_.isEmpty(responsible)">
        <div  class="col-xs-12 col-sm-3 col-md-2 specialist q-mr-md q-mb-md" v-for="(user, index) in filerResponsible" :key="index" style="max-width: 230px;">
          <q-img v-if="user.photo" :ratio="1" :src="$store.state.constant.CDN_DOMAIN + user.photo"  class="cursor-pointer"></q-img>
          <q-img v-else :ratio="1" :src="imgUrl"  class="cursor-pointer"></q-img>
          <div class="text-center q-mb-md">
            <div class="q-mt-md text-uppercase text-bold surname">{{ user.surname }}</div>
            <div class="q-mt-sm text-uppercase text-bold text-light-blue-14 name">{{ user.name }}</div>
            <div class="q-mt-xs text-grey-7 text-uppercase role-name">{{ user.user_position_name }}</div>
            <div v-if="$store.state.user.contract[0].id !== 7" class="q-mt-sm">{{ user.phone | phone}}</div>
          </div>
        </div>

      </div>
    </div>

    <team class="lt-md q-pr-md"></team>
  </div>
</template>

<script>
import team from 'components/team/index.vue'

export default {
  name: 'team-page',
  components: { team },
  data () {
    return {
      responsible: [],
      imgUrl: 'https://vevanta.ru/wp-content/themes/agentstvo/assets/images/components/avatar300x300.jpg'
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

<style lang="css">
  .surname {
    font-size: 13px
  }

  .name {
    font-size: 16px;
  }

  .specialist {
    background-color: #f7f7f7;
  }

  .role-name {
    font-size: 11px
  }

</style>
