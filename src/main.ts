import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dotenv from 'dotenv'
import { ENV_PATH } from './constants/env'
import './registerServiceWorker'
import './registerMapboxServiceWorker'

dotenv.config({ path: ENV_PATH })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
