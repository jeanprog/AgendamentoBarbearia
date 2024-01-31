<template class="body-service">
  <HeaderVoltar :title="titlepage" />
  <!--  <div class="searchbar">
    <v-text-field
      bg-color="#1E1E26"
      class="inputSearch"
      density="compact"
      variant="solo"
      label="Buscar Chamados"
      append-inner-icon="fa-brands fa-searchengin"
      single-line
      hide-details
      v-model="buscaServico"
      @input="filtroServico"
    ></v-text-field>
  </div> -->

  <div class="containerServicos">
    <div class="scrollable-container">
      <TabelaChamados />
    </div>
    <div class="container-botao">
      <v-btn
        v-if="!dialog"
        color="#67159C"
        class="addServico"
        @click="abrirModal"
        @fecharModal="fecharModal"
      >
        + Adicionar
      </v-btn>
    </div>
    <div class="ModalPage">
      <ModalAddChamado
        v-if="dialog"
        @fecharModal="fecharModal"
        @chamadoAdicionado="handleChamadoAdicionado"
        @submitChamado="obterDadosFormularios"
        @consultarClientes="escolherCliente"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/* import axios from 'axios' */
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
/* import { toast } from 'vue3-toastify' */
import 'vue3-toastify/dist/index.css'

import ModalAddChamado from '../components/ModalAddChamado.vue'
import TabelaChamados from '../components/TabelaChamados.vue'
import { useRoute } from 'vue-router'
import { router } from '../router'
import retornaNumberStatus from '../utils/formatStatus.ts'

const route = useRoute()
const emit = defineEmits()
const dialog = ref(false)
const titlepage = ref('Cadastro de Serviço')
const abrirChamado = ref()
const manipulaEstadoDaTabela = ref(false)
const idRede = ref<number>()
const idUser = ref<number>()

const user = ref(route.params.user)

const obterDadosFormularios = (item: any) => {
  console.log('teste foi', item)
  const statusNumber = retornaNumberStatus(item.StatusChamado)

  const data = {
    ...item,
    idUser: idUser.value,
    redeId: idRede.value,
    dAbertura: new Date(),
    dFechamento: new Date(),
    statusChamado: statusNumber
  }

  console.log(data)
  // Adicione lógica adicional aqui, se necessário
}

const escolherCliente = () => {
  router.push({ name: 'ConsultaDeCliente', params: { user: user.value } })
}
/* const abrirModalEditar = (item: any) => {
  dialog.value = true

  console.log('evento acionado', dialog.value)
} */

const abrirModal = () => {
  dialog.value = true

  console.log('evento acionado', dialog.value)
}
const fecharModal = () => {
  dialog.value = false
  console.log('Evento fecharModal acionado no componente pai')
}
const obterDadosAuthLogin = () => {
  const dadosLogin = localStorage.getItem('user')
  if (dadosLogin) {
    const dadosJson = JSON.parse(dadosLogin)
    idUser.value = parseInt(dadosJson.id)
    idRede.value = parseInt(dadosJson.rede)
    console.log(idUser.value, idRede.value)
  }
}

onMounted(() => {
  const route = useRoute()

  obterDadosAuthLogin()

  abrirChamado.value = route.query.chamado
  console.log(abrirChamado.value, 'teste aqui')

  if (parseInt(abrirChamado.value) === 1) {
    dialog.value = true
    console.log('cai no quase')
  }
})

const handleChamadoAdicionado = () => {
  // Propagar o evento para o componente filho (TabelaChamados)
  /* const tabelaChamadosComponent = ref('tabelaChamados').value;
  tabelaChamadosComponent && tabelaChamadosComponent.handleChamadoAdicionado(); */
  console.log('add')
  manipulaEstadoDaTabela.value = true
}

const RedirectConsultaDecliente = async () => {
  /*  const dataForm = {
    titulo: titulo.value,
    prioridade: prioridade.value,
    sistema: sistema.value,
    dAbertura: new Date(),
    dFechamento: '',
    descricao: descricao.value,
    usuarioId: idUser.value,
    redeId: redeId.value,
    clienteId: idCliente.value,
    statusChamadoAtual: StatusChamadoString.value,
    modoEditar: modoEditar.value
  } */
  /* await store.dispatch('atualizaChamado', dataForm) */
  /*  router.push({ name: 'ConsultaDeCliente', params: { user: user.value } }) */
}
</script>

<style scoped>
.body-service {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh !important;
  overflow: hidden !important;
}
.searchbar {
  margin-top: 1%;
}
.inputSearch input {
  background-color: #19181f !important;
}
.containerServicos {
  width: 100%;
  height: 90vh;

  overflow-y: hidden;
  border-radius: 8px;
  background: #19181f;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center !important;
}
.addServico {
  border: none;
  background-color: white;
  margin: 1%;
  border-radius: 8px;
}

.card-customize {
  margin: 2%;
  height: 28%;
  background: none;
  width: 96%;
  font-size: 16px;
  border: solid;
}
.btns-card {
  margin-bottom: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;

  align-items: center;
}

.scrollable-container {
  /* Garante que o conteúdo não ultrapasse a altura máxima da div pai */
  overflow-y: auto;
  width: 90%;
  max-height: 60vh !important;
}
.container-botao {
  width: 50%;

  display: flex;
  flex-direction: column;
}
.botaoCard {
  background-color: #19181f !important;

  border-color: #e82d92 !important;
  width: 20% !important;
}

.text-card {
  color: aliceblue;
  font-size: 12px !important;
}

.campo-texto {
  font-weight: bold;
  font-size: 14px;
}

/* .ModalAdicionarServiço {
  background-color: #19181f !important;
  color: white;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
}
.title-modal {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
}
#icon-cards {
  color: white !important;
  font-size: 20px !important;
} */
.ModalPage {
  max-height: 50vh !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  max-width: 50% !important;
  margin-bottom: 120px;
}
</style>
