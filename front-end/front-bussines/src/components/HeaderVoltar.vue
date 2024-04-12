<template>
  <div class="menu-btn">
    <Button class="bg-[#3f51b5]" @click="RedirecionarInicio"> Inicio </Button>
    <Button class="bg-[#3f51b5]" @click="RedirectCadastroDecliente">
      cadastro de cliente
    </Button>
    <Button class="bg-[#3f51b5]" @click="RedirectConsultaDecliente">
      consulta de cliente
    </Button>
    <Button class="bg-[#3f51b5]" @click="RedirectCadastroDeServico">
      chamados
    </Button>
    <Button class="bg-[#3f51b5]" @click="RedirectDesenv">
      desenvolvimento
    </Button>

    <!--  <v-icon :class="{ 'rotated': drawer }" @click="toggleDrawer">{{ drawer ? 'fa-solid fa-xmark' : 'fa-solid fa-bars' }}</v-icon> -->
    <p style="margin-left: 8%">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { router } from '../router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Button } from '../components/ui/button'

const store = useStore()

const route = useRoute()

const user = ref(route.params.user)

const props = defineProps(['title'])

const RedirecionarInicio = () => {
  router.push({ name: 'dashboard', params: { user: user.value } })
  console.log('evento acionado')
  store.commit('limpaValores')
}

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
</script>

<style scoped>
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 4%;
  background-color: #3f51b5 !important;
  color: white !important;
  height: 8% !important;
}
.btn-voltar {
  width: 20%;
  background-color: #3f51b5 !important;
  color: rgb(136, 255, 0);
}
.cabeçalho {
  max-height: 8% !important;
}
</style>
