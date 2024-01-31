import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createModal } from '@kolirt/vue-modal'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import PrimeVue from 'primevue/config'
import store from '../store'

//icons
import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(PrimeVue)
  .use(createModal())
  .use(Vue3Toastify, {
    autoClose: 3000
  } as ToastContainerOptions)
  .mount('#app')
App.config.globalProperties.$fa = require('@fortawesome/fontawesome-free')
