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
      <TabelaChamados @editar="abrirModalEditar" :mensagem="mensagem" />
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
        :editarChamado="itemEditar"
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
import { postChamado, atualizarChamado } from '../services/RequestsChamados.ts'
import { parse } from 'date-fns'
import { toast } from 'vue3-toastify'
import { useStore } from 'vuex'

const route = useRoute()
const emit = defineEmits()
const dialog = ref(false)
const titlepage = ref('Cadastro de Serviço')
const abrirChamado = ref()
const manipulaEstadoDaTabela = ref(false)
const idRede = ref<number>()
const idUser = ref<number>()
const itemEditar = ref()
const novoChamado = ref<number>()
const store = useStore()

const mensagem = ref(false)

onMounted(() => {
  const route = useRoute()

  obterDadosAuthLogin()
  console.log
  abrirChamado.value = route.query.abrirModal
  console.log('vendo chamado', abrirChamado.value)

  if (parseInt(abrirChamado.value) === 1) {
    dialog.value = true
  }
})

const user = ref(route.params.user)

const obterDadosFormularios = (item: any) => {
  console.log('verificando item no evento de saida decisão', item)
  const statusNumber = retornaNumberStatus(item.statusChamadoString)

  if (item.id) {
    console.log('estou atualizando um item')

    if (statusNumber === 3) {
      const data = {
        ...item,

        dFechamento: new Date(),
        statusChamadoAtual: statusNumber
      }
      const { statusChamadoString, nomeCliente, empresa, ...dataFormat } = data

      submitAtualizarChamado(dataFormat)
    } else {
      const data = {
        ...item,

        statusChamadoAtual: statusNumber
      }
      const {
        statusChamadoString,
        nomeCliente,
        empresa,
        usuarioId,
        redeId,
        ...dataFormat
      } = data

      console.log('atualizando o item sem statuss', dataFormat)
      submitAtualizarChamado(dataFormat)
    }
  } else {
    console.log('estou mandando um novo item', item)
    const data = {
      ...item,
      dAbertura: new Date(),
      dFechamento: new Date(),
      statusChamadoAtual: statusNumber
    }
    const { statusChamadoString, nomeCliente, empresa, ...dataFormat } = data

    console.log('saida final para submit de novo chamado', dataFormat)
    submitChamado(dataFormat)
  }
}

const submitAtualizarChamado = async (data: any) => {
  const response = await atualizarChamado(data)
  notifyAtualizachamado()
  fecharModal()
  mensagem.value = true
  store.commit('limpaChamado')

  store.commit('limpaCliente')
  store.commit('limpaValores')
  return console.log(response)

  /*  if (data) {
    const response = await atualizaChamado(data)
    return console.log(response)
  }
  return */
}

const submitChamado = async (data: any) => {
  try {
    console.log('pescando a ultima mudou', data)
    const response = await postChamado(data)
    store.commit('limpaChamado')
    store.commit('limpaCliente')
    store.commit('limpaValores')
    fecharModal()
    mensagem.value = true
    notifyAddchamado()
    return console.log(response)
  } catch (error) {
    return console.log('error ao enviar form', error)
  }
}

const escolherCliente = (item: any) => {
  console.log(item, 'saida do data aqui na busca cliente')

  router.push({
    name: 'ConsultaDeCliente',
    params: { user: user.value }
  })
  store.dispatch('salvaValores', item)
}
const abrirModalEditar = (item: any) => {
  dialog.value = true

  itemEditar.value = item
  novoChamado.value = 1
}

const abrirModal = () => {
  dialog.value = true
  itemEditar.value = undefined

  console.log('evento acionado', dialog.value)
}
const fecharModal = () => {
  dialog.value = false
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

const handleChamadoAdicionado = () => {
  // Propagar o evento para o componente filho (TabelaChamados)
  /* const tabelaChamadosComponent = ref('tabelaChamados').value;
  tabelaChamadosComponent && tabelaChamadosComponent.handleChamadoAdicionado(); */
  console.log('add')
  manipulaEstadoDaTabela.value = true
}

const notifyAddchamado = () => {
  toast('Chamado adicionado com sucesso', {
    autoClose: 1000
  })
}

const notifyAtualizachamado = () => {
  toast('Atualizado com sucesso', {
    autoClose: 1000
  })
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
