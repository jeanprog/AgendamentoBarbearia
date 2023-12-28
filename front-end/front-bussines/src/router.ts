import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../src/views/HomePage.vue'
import dashboard from '../src/views/dashboard.vue'
import CadastroDeCliente from './views/CadastroDeCliente.vue'
import ConsultaDeCliente from './views/ConsultaDeCliente.vue'
import CadastroDeServico from './views/CadastroDeServico.vue'
import agendamentoDia from '../src/views/agendamento/agendamentoDia.vue'
import novoAgendamento from '../src/views/agendamento/novoAgendamento.vue'
import configLoja from '../src/views/configuracaoLoja/configLoja.vue'

export const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage
  },
  {
    path: '/dashboard/:user',
    name: 'dashboard',
    component: dashboard
  },

  {
    path: '/CadastroDeCliente/:user',
    name: 'CadastroDeCliente',
    component: CadastroDeCliente,
    props: true
  },
  {
    path: '/ConsultaDeCliente/:user',
    name: 'ConsultaDeCliente',
    component: ConsultaDeCliente,
    props: (route: { query: any }) => ({ ...route.query })
  },
  {
    path: '/CadastroDeServico/:user',
    name: 'CadastroDeServico',
    component: CadastroDeServico
  },
  {
    path: '/novoagendamento/:user',
    name: 'novoAgendamento',
    component: novoAgendamento
  },
  {
    path: '/agendamentodia/:user',
    name: 'agentamentoDia',
    component: agendamentoDia
  },

  {
    path: '/configloja/:user',
    name: 'configLoja',
    component: configLoja
  }

  // For lazy loading components
  /* {
    path: '/',
    name: 'home-page',
    component: () => import('@/pages/HomePage.vue'),
  }, */
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
