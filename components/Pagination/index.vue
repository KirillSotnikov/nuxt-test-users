<template>
  <div class="pagination">
    <app-pagination-buttons
      :prevFunc="prevFunc"
      :nextFunc="nextFunc"
      :currentPage="currentPage"
    />
    <app-pagination-input
      :rowsPerPage="rowsPerPage"
      :handleChange="handleChange"
    />
    <app-pagination-more-btn
      :downloadMore="downloadMore"
    />
  </div>
</template>

<script>
import Buttons from './Buttons.vue'
import Input from './Input'
import MoreBtn from './MoreBtn'
export default {
  props: {
    prevFunc: Function,
    nextFunc: Function,
    rowsPerPage: Number,
    handleChange: Function,
    downloadMore: Function,
    currentPage: {
      type: Number,
      default: 1
    }
  },
  components: {
    'app-pagination-buttons': Buttons,
    'app-pagination-input': Input,
    'app-pagination-more-btn': MoreBtn
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
