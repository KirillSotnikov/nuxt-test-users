<template>
  <div class="box">
    <input
      v-model="value"
      type="number"
      class="input"
      @change="inputChange('rowsPerPage', value)"
    >
    <ol v-if="errors.length > 0" class="error__list">
      <li v-for="(error, i) in errors" :key="i">
        <p
          class="error__text"
        >
          {{error.errorMessage}}
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import Validator from '~/utils/Validator'
export default {
  props: {
    rowsPerPage: Number,
    handleChange: Function
  },
  data () {
    return {
      value: this.rowsPerPage || 0,
      errors: []
    }
  },
  methods: {
    inputChange (name, value) {
      const validator = new Validator(value)
      const { result, errors } = validator
        .isEmpty()
        .notZero()
        .maxSize(20)
        .getResult()
      if (errors.length > 0) {
        this.errors = errors
      } else {
        this.errors = []
        this.handleChange(name, Number(result))
      }
    }
  }
}
</script>

<style lang="scss">
  .box{
    border: 1px solid #3498db;
    height: 50px;
    width: 100px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .input{
    width: 100%;
    font-size: 24px;
    border: none;
    border-radius: 0px;
  }
  .error{
    &__list{
      position: absolute;
      top: 100%;
      left: 50%;
      padding-top: 10px;
      transform: translateX(-50%);
      min-width: 200px;
    }
    &__text{
      color: red;
    }
  }
</style>
