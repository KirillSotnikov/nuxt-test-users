<template>
  <button @click="downloadHandler" class="download-btn">Download more</button>
</template>

<script>
export default {
  props: {
    downloadMore: Function
  },
  methods: {
    downloadHandler () {
      this.downloadMore()
    }
  }
}
</script>

<style lang="scss" scoped>
  .download-btn{
    border: 1px solid #3498db;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #3498db;
    line-height: 1;
    margin: 0 5px;
    cursor: pointer;
    background: transparent;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 30px;
  }
</style>
