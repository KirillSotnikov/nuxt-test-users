<template>
  <div class="list">
    <div class="list__item" v-for="(user, i) in users" :key="i">
      <app-list-item
        :openModal="openModal"
        :user="user"
      />
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  props: {
    users: Array,
    openModal: Function
  },
  components: {
    'app-list-item': ListItem
  }
}
</script>

<style lang="scss" scoped>
.list{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  &__item{
    width: 20%;
  }
}
</style>
