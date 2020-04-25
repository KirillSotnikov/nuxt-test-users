<template>
  <div class="card">
    <div class="header">
      <div class="header__overlay"></div>
      <img @click="openModal(alertText)" :src="user.picture[imageType]" :alt="user.name.first" class="header__avatar">
    </div>
    <div class="body">
      <p class="body__greetings">{{subtitle}}</p>
      <p class="body__name">{{title}}</p>
    </div>
    <div class="footer">
      <div class="footer__info">
        <img :class="{'active' : hoveredItem === 'name'}" @mouseover="setHoverItem('name')" class="footer__icon" src="~assets/name.svg" alt="">
      </div>
      <div class="footer__info">
        <img :class="{'active' : hoveredItem === 'email'}" @mouseover="setHoverItem('email')" class="footer__icon" src="~assets/mail.svg" alt="">
      </div>
      <div class="footer__info">
        <img :class="{'active' : hoveredItem === 'dob'}" @mouseover="setHoverItem('dob')" class="footer__icon" src="~assets/birth.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import DateFormatter from '~/utils/DateFormatter'

export default {
  props: {
    user: Object,
    openModal: Function
  },
  data () {
    const { email, gender, dob: { age } } = this.user
    // const pageWidth = window.innerWidth
    // let imageType = 'large'
    // if (pageWidth < 500) {
    //   imageType = 'thumbnail'
    // } else if (pageWidth < 800) {
    //   imageType = 'medium'
    // }

    return {
      alertText: `My email is ${email}. Gender is ${gender}. Age is ${age}.`,
      imageType: 'large',
      subtitle: '',
      title: '',
      hoveredItem: 'name'
    }
  },
  filters: {
    date (value) {
      const dateFormatter = new DateFormatter(value)
      const { date, month, year } = dateFormatter
        .getDate()
        .getMonth()
        .getYear()
        .getResult()

      return `${date}/${month}/${year}`
    }
  },
  updated () {
    this.onHoverHandler(this.hoveredItem)
  },
  mounted () {
    this.onHoverHandler(this.hoveredItem)
  },
  methods: {
    setHoverItem (item) {
      this.hoveredItem = item
    },
    onHoverHandler (type) {
      const data = {}
      switch (type) {
        case 'name' :
          data.subtitle = 'Hi, My name is'
          data.title = `${this.user.name.title} ${this.user.name.first} ${this.user.name.last}`
          break
        case 'email' :
          data.subtitle = 'My email address is'
          data.title = this.user.email
          break
        case 'dob' :
          data.subtitle = 'My birthday is'
          data.title = this.$options.filters.date(this.user.dob.date)
          break
        default:
          break
      }

      this.setHoverData(data)
    },
    setHoverData ({ title = 'Something went wrong', subtitle = 'Oooooops' }) {
      this.subtitle = subtitle
      this.title = title
    }
  },
  watch: {
    hoveredItem (val) {
      this.onHoverHandler(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  border: 1px solid #fff;
}
.header{
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__overlay{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: #ecf0f1;
    z-index: 1;
  }
  &__avatar{
    width: 100px;
    height: 100px;
    z-index: 2;
    border-radius: 100%;
    object-fit: cover;
  }
}
.body{
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__greetings{
    margin-bottom: 10px;
    color: #95a5a6;
  }
  &__name{
    font-size: 26px;
    color: #2c3e50;
  }
}
.footer{
  display: flex;
  // flex-direction: column;
  justify-content: space-around;
  padding-top: 20px;
  align-items: center;
  &__info{
    color: #2c3e50;
  }
  &__icon{
    height: 30px;
    transition: all .4s ease-in-out;
    &.active{
      background: #3498db;
      padding: 5px;
    }
  }
}
</style>
