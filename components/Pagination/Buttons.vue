<template>
  <div class="buttons">
    <span @click="prevFunc()" class="buttons__item buttons__item-prev">&#8592;</span>
    <span class="buttons__item">{{currentPage}}</span>
    <span @click="nextFunc()" class="buttons__item buttons__item-next">&#8594;</span>
  </div>
</template>

<script>
export default {
  props: {
    prevFunc: Function,
    nextFunc: Function,
    currentPage: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .buttons{
    display: flex;
    &__item{
      border: 1px solid #3498db;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      color: #3498db;
      line-height: 1;
      margin: 0 5px;
      cursor: pointer;
    }
  }
</style>
