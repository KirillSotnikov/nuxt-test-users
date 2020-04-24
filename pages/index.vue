<template>
  <div class="container">

    <span class="loading-indicator" v-if="!filteredUsers.length">Loading...</span>
    <app-users-list
      :users="filteredUsers"
      :openModal="openAlertModal"
    />

    <transition name="fade">
      <app-text-alert
        v-if="visibleAlert"

        :text="alertText"
        :closeModal="closeAlertModal"
      />
    </transition>

    <app-pagination
      :prevFunc="prevPage"
      :nextFunc="nextPage"
      :rowsPerPage="rowsPerPage"
      :handleChange="changeInput"
      :currentPage="page"
      :downloadMore="downloadMore"
    />

    <app-radio-filter
      :handleChange="handleChange"
      :checkedValue="checkedValue"
    />
  </div>
</template>

<script>
import UsersList from '~/components/Users/List.vue'
import TextAlert from '~/components/Common/TextAlert.vue'
import Pagination from '~/components/Pagination'
import RadioFilter from '~/components/Filters/RadioFilter'

export default {
  components: {
    'app-users-list': UsersList,
    'app-text-alert': TextAlert,
    'app-pagination': Pagination,
    'app-radio-filter': RadioFilter
  },
  data () {
    return {
      visibleAlert: false,
      alertText: '',
      page: 1,
      rowsPerPage: 5,
      checkedValue: 'any'
    }
  },
  // async asyncData ({ $axios }) {
  //   const ip = await $axios.$get('http://icanhazip.com')
  //   return { ip }
  // },
  computed: {
    userList () {
      const users = this.$store.getters.getUsers
      if (users.length > 0) {
        return users
      } else {
        this.fetchUsers({ page: this.page, rowsPerPage: this.rowsPerPage })
        return users
      }
    },
    filteredUsers () {
      const genderFilteredUsers = this.userList.filter(user => this.checkedValue !== 'any' ? user.gender === this.checkedValue : true)

      const paginationUsers = genderFilteredUsers.slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)

      return paginationUsers
    }
  },
  methods: {
    fetchUsers (payload) {
      this.$store.dispatch('fetchUsers', payload)
    },

    closeAlertModal () {
      this.visibleAlert = false
    },

    openAlertModal (text) {
      this.visibleAlert = true
      this.alertText = text
    },

    prevPage () {
      if (this.page !== 1) {
        this.page = this.page - 1
      }
    },
    nextPage () {
      if (this.page < this.userList.length / this.rowsPerPage) {
        this.page = this.page + 1
      } else {
        this.page = this.page + 1
        if (this.checkedValue === 'any') {
          this.fetchUsers({ page: this.page, rowsPerPage: this.rowsPerPage })
        } else {
          this.fetchUsers({ page: this.page, rowsPerPage: this.rowsPerPage, gender: this.checkedValue })
        }
      }
    },

    async downloadMore () {
      await this.fetchUsers({ page: this.page + 1, rowsPerPage: this.rowsPerPage })
      this.visibleAlert = true
      this.alertText = 'Uploaded successfully'
    },

    async changeInput (name, value) {
      this.handleChange(name, value)

      if (this.rowsPerPage > this.filteredUsers.length) {
        await this.fetchUsers({ page: this.page, rowsPerPage: this.rowsPerPage - this.filteredUsers.length })
      }
    },

    handleChange (name, value) {
      this[name] = value
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.loading-indicator{
  padding: 40px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
