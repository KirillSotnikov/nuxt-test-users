<template>
  <div class="radio-filter">
    <app-filter-label :handleChange="handleChange" name="sex" :checkedValue="checkedValue" value="any" text="Any"/>
    <app-filter-label :handleChange="handleChange" name="sex" :checkedValue="checkedValue" value="female" text="Female"/>
    <app-filter-label :handleChange="handleChange" name="sex" :checkedValue="checkedValue" value="male" text="Male"/>
  </div>
</template>

<script>
import Label from './Label'
export default {
  components: {
    'app-filter-label': Label
  },
  props: {
    handleChange: {
      type: Function
    },
    checkedValue: {
      type: String,
      default: 'any'
    }
  }
}
</script>

<style lang="scss" scoped>
  .radio-filter{
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }
</style>
