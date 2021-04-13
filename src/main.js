import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import VueMyToasts from 'vue-my-toasts'
import 'vue-my-toasts/dist/vue-my-toasts.css'
import Alert from '@/components/Alert'
import Loading from '@/components/Loading'
import VueCollapse from 'vue2-collapse'
import vClickOutside from 'v-click-outside'

Vue.component('Loading', Loading)
Vue.use(VueMyToasts, {
  component: Alert,
  options: {
    width: '500px',
    position: 'bottom-right',
    padding: '1rem'
  }
})

Vue.use(vClickOutside)
Vue.use(VueCollapse)

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.use(Vuelidate)

firebase.initializeApp({
  apiKey: "AIzaSyDXpSiUK2x3sjXKNf0rLfC4sGcuBW4nquk",
  authDomain: "rieltorcrm.firebaseapp.com",
  projectId: "rieltorcrm",
  storageBucket: "rieltorcrm.appspot.com",
  messagingSenderId: "957850893192",
  appId: "1:957850893192:web:5b00e567c1fbd481a0d83d"
})

let app

firebase.auth().onAuthStateChanged( () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
