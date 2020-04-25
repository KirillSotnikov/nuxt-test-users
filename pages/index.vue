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
      :setPage="setPage"
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
  // async asyncData ({ $axios, store }) {
  //   await store.dispatch('fetchUsers', { page: 1, rowsPerPage: 5 })
  //   const userList = await store.getters.getUsers
  //   return {
  //     userList
  //   }
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
    genderFilteredUsers () {
      const genderFilteredUsers = this.userList.filter(user => this.checkedValue !== 'any' ? user.gender === this.checkedValue : true)
      return genderFilteredUsers
    },
    filteredUsers () {
      const paginationUsers = this.genderFilteredUsers.slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
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
      this.setModalText(text)
    },

    setModalText (text) {
      this.alertText = text
    },

    prevPage () {
      if (this.page !== 1) {
        this.page = this.page - 1
      }
    },

    setPage (value = 1) {
      this.handleChange('page', value)
    },

    nextPage () {
      this.setPage(this.page + 1)
      if (this.page > this.genderFilteredUsers.length / this.rowsPerPage) {
        const payload = {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          gender: false
        }
        if (this.checkedValue !== 'any') {
          payload.gender = this.checkedValue
        }
        this.fetchUsers(payload)
      }
    },

    async downloadMore () {
      const payload = {
        page: this.page + 1,
        rowsPerPage: this.rowsPerPage,
        gender: false
      }
      if (this.checkedValue !== 'any') {
        payload.gender = this.checkedValue
      }
      await this.fetchUsers(payload)

      this.openAlertModal('Uploaded successfully')
    },

    changeInput (name, value) {
      this.handleChange(name, value)
      this.setPage(1)

      if (this.rowsPerPage > this.filteredUsers.length) {
        const payload = {
          page: this.page,
          rowsPerPage: this.rowsPerPage - this.filteredUsers.length,
          gender: false
        }
        if (this.checkedValue !== 'any') {
          payload.gender = this.checkedValue
        }
        this.fetchUsers(payload)
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
