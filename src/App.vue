<template>
  <div id="app">
    <div class="content" :class="{'mobile-view':mobileView}">
        <Header v-bind:mobileView="mobileView" @toggle="toggleMenu"/>
        <Menu v-bind:showMenu="showMenu"/>
        <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './views/Header.vue'
import Menu from './views/Menu.vue'

export default ({
  components: {
     Header,
     Menu
  },
  data() {
    return{
        mobileView : false,
        showMenu : false
    }
  },
  methods: {
     handleView() {
       this.mobileView = window.innerWidth  <= 750
     },
     toggleMenu() {
        this.showMenu = !this.showMenu
     }
  },
  created() {
    this.handleView()
    window.addEventListener('resize', this.handleView)
  }
})
</script>

<style>
     body{
       margin: 0;
       padding: 0;
        font-family: 'Noto Sans Khmer', sans-serif;;
     }
</style>
