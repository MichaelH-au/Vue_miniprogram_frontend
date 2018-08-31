<template>
  <div id="app">
    <Header></Header>
    <!--<keep-alive include="Myinfo">-->
    <!--<router-view></router-view>-->
    <!--</keep-alive>-->
    <keep-alive>
      <router-view v-keep-scroll-position v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    components:{
      Header,
      Footer
    }
  }
</script>
<style scoped>
  @import './assets/css/index.css';
</style>
