<template>
  <v-app class="cabeçalho">
    <v-app-bar app class="menu-btn">
      <v-icon :class="{ rotated: drawer }" @click="toggleDrawer">{{
        drawer ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
      }}</v-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      disable-overlay
      class="menu"
    >
      <div class="itens-menu" style="margin-top: 32%">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          >{{ user }}</v-list-item
        >

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="fa-solid fa-plus"
            title="Chamados"
            value="servicos"
            @click="RedirectCadastroDeServico"
          ></v-list-item>
          <v-list-item
            prepend-icon="fa-solid fa-users"
            title="Consultar Clientes"
            value="cliente"
            @click="RedirectConsultaDecliente"
          ></v-list-item>
          <v-list-item
            prepend-icon="fa-solid fa-address-book"
            title="Consultar Agenda"
            value="Agenda"
            @click="RedirectAgendamento"
          ></v-list-item>
          <v-list-item
            prepend-icon="fa-solid fa-user"
            title="Cadastrar Clientes"
            value="newClientes"
            @click="RedirectCadastroDecliente"
          ></v-list-item>
          <v-list-item
            prepend-icon="fa-solid fa-gear"
            title="Solicitações Desenv"
            value="desenv"
            @click="RedirectDesenv"
          ></v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-app>

  <!--  <v-icon :class="{ 'rotated': drawer }" @click="toggleDrawer">{{ drawer ? 'fa-solid fa-xmark' : 'fa-solid fa-bars' }}</v-icon> -->
</template>

<script setup lang="ts">
import { router } from '../router'

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const drawer = ref<boolean>(false)
const user = ref(route.params.user)

const RedirectCadastroDecliente = () => {
  router.push({ name: 'CadastroDeCliente', params: { user: user.value } })
  console.log('evento acionado')
}

const RedirectConsultaDecliente = () => {
  router.push({ name: 'ConsultaDeCliente', params: { user: user.value } })
  console.log('evento acionado')
}

const RedirectCadastroDeServico = () => {
  router.push({ name: 'CadastroDeServico', params: { user: user.value } })
  console.log('evento acionado')
}

const RedirectDesenv = () => {
  router.push({ name: 'desenv', params: { user: user.value } })
  console.log('evento acionado')
}

const RedirectAgendamento = () => {
  router.push({ name: 'agentamentoDia', params: { user: user.value } })
  console.log('evento acionado')
}
console.log(user)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style scoped>
.menu-btn {
  justify-content: flex-start;
  padding-left: 4%;
  background-color: #3f51b5 !important;
  color: white !important;
  height: 6%;
}
.menu {
  background-color: #3f51b5 !important;
  color: white !important;
}

.rotated {
  transition: transform 0.3s ease;
  transform: rotate(180deg);
}
.cabeçalho {
  max-height: 6%;
  font-family: 'Poppins', sans-serif;
}
</style>
