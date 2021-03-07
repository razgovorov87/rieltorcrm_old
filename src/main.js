import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
