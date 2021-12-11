import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dotenv from 'dotenv'
import './registerServiceWorker'
import './registerMapboxServiceWorker'

async function init() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('@/mocks/worker')
    worker.start({ onUnhandledRequest: 'bypass' })
  }

  dotenv.config({ path: '.env.local' })

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}

init()
