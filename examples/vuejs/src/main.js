import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Carousel from '../../../src/vuejs/index'

Vue.config.productionTip = false
Vue.use(Carousel)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
