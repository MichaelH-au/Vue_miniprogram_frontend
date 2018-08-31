import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import $ from './assets/js/jquery-3.2.1';
import VueKeepScrollPosition from 'vue-keep-scroll-position'
Vue.use(VueKeepScrollPosition);

window.jQuery = $;
window.$ = $;

import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(VueResource);
import routes from './router/router.config';
import store from './store/index'


import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD78ti68KfHeGEOosHrp_m8vzPHmP2n9Ec',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})

const router = new VueRouter({
  routes,
});

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
