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

import AxiosAdapter from './infra/http/AxiosAdapter'
import TodosGatewayHttp from './infra/Gateways/VersaoGatewayHttp'
/* require('dotenv').config();  */
import VersoesList from './entitys/VersoesList'

import SolicitacaoGatewayHttp from './infra/Gateways/SolicitacaoGatewayHttp'
import SolicitacoesList from './entitys/SolicitacoesList'
const vuetify = createVuetify({
  components,
  directives
})

const httpClient = new AxiosAdapter()
const baseUrl = `http://${import.meta.env.VITE_IP_URL}:3000`
const TodosGateway = new TodosGatewayHttp(httpClient, baseUrl)
const SolicitacaoGateway = new SolicitacaoGatewayHttp(httpClient, baseUrl)
const versaoList = new VersoesList(TodosGateway)
const solicitacoesList = new SolicitacoesList(SolicitacaoGateway)

createApp(App)
  .provide('versaoList', versaoList)
  .provide('solicitacaoList', solicitacoesList)
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
