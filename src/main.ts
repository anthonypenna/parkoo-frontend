import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dotenv from 'dotenv'
import './registerServiceWorker'
import './registerMapboxServiceWorker'

async function init() {
  dotenv.config({ path: '.env.local' })

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}

init()
