<template>
  <div class="alert">
    <div @click="closeModal" class="alert__overlay"></div>
    <div class="alert__container">
      <span @click="closeModal" class="alert__close">&times;</span>
      <p class="alert__text">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    closeModal: Function
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(44, 62, 80, .8);
  }
  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 600px;
    width: 100%;
    padding: 20px 40px;
    z-index: 2;
    background: #fff;
    border-radius: 5px 0px 5px 0px ;
  }
  &__close{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 13px;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    color: #c0392b;
  }
}
</style>
