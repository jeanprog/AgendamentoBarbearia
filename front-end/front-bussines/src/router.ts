import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../src/views/HomePage.vue'
import dashboard from '../src/views/dashboard.vue'
import CadastroDeCliente from './views/CadastroDeCliente.vue'
import ConsultaDeCliente from './views/ConsultaDeCliente.vue'
import CadastroDeServico from './views/CadastroDeServico.vue'

export const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
  },
  {
    path: '/dashboard/:user',
    name: 'dashboard',
    component: dashboard,
  },

  {
    path: '/CadastroDeCliente/:user',
    name: 'CadastroDeCliente',
    component: CadastroDeCliente,
  },
  {
    path: '/ConsultaDeCliente/:user',
    name: 'ConsultaDeCliente',
    component: ConsultaDeCliente,
  },
  {
    path: '/CadastroDeServico/:user',
    name: 'CadastroDeServico',
    component: CadastroDeServico,
  },
  // For lazy loading components
  /* {
    path: '/',
    name: 'home-page',
    component: () => import('@/pages/HomePage.vue'),
  }, */
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
