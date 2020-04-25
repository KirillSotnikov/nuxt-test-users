<template>
  <label :for="text" class="radio-filter__label">
    <input
      @change="changeHandler(value)"
      :checked="checkedValue == value"
      :value="value"
      :name="name"
      :id="text"
      type="radio">
    <span class="radio-filter__text">{{text}}</span>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'radio'
    },
    text: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    checkedValue: {
      type: String,
      default: 'any'
    },
    handleChange: {
      type: Function
    },
    setPage: {
      type: Function
    }
  },
  methods: {
    changeHandler (value) {
      this.setPage(1)
      this.handleChange('checkedValue', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .radio-filter__label{
    margin: 0 15px;
    display: flex;
    align-items: center;
    input{
      margin-right: 5px;
    }
  }
</style>
