<template>
  <v-card class="ModalAdicionarServiço">
    <v-card-title class="title-modal">
      <span class="title-modal">Novo Chamado</span>
    </v-card-title>
    <v-card-text>
      <v-container class="ContainerForm">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="titulo"
              label="Titulo"
              required
              v-bind:disabled="!existeCliente"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="statusChamadoString"
              :items="['aberto', 'pendente', 'fechado']"
              label="Status"
              required
              v-bind:disabled="!existeCliente"
            ></v-select>
          </v-col>
          <v-col v-if="!dialog" cols="12" sm="6" md="4">
            <v-text-field
              v-if="!dialog"
              v-model="nomeCliente"
              label="Nome Cliente"
              persistent-hint
              required
              v-bind:disabled="!existeCliente"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-btn
              v-if="!dialog"
              class="modalBuscaCliente"
              @click="RedirectConsultaDecliente"
            >
              Buscar Cliente
            </v-btn>
            <div v-if="dialog" class="ContainerBuscaCliente">
              <buscaCliente />
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-if="!dialog"
              v-model="empresa"
              label="Empresa"
              required
              v-bind:disabled="!existeCliente"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              v-model="descricao"
              label="Descrição"
              required
              v-bind:disabled="!existeCliente"
            ></v-textarea>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="sistema"
              :items="[
                'PDV',
                'Back-office',
                'Financeiro',
                'Pré-Venda Mobile',
                'laser Report',
                'ecommerce',
                'etiquetas'
              ]"
              label="Sistemas"
              v-bind:disabled="!existeCliente"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="prioridade"
              :items="['Alta', 'Media', 'Baixa']"
              label="Prioridade"
              v-bind:disabled="!existeCliente"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="fluid">
          <v-btn color="#67159C" variant="text" @click="fecharModal">
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submitFormulario"
            v-bind:disabled="!existeCliente"
          >
            Save
          </v-btn>
          <small>*Todos os campos obrigatórios</small>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import 'vue3-toastify/dist/index.css'
import { ref, defineEmits } from 'vue'
/* import axios from 'axios'
import RequestsChamados from '../../src/services/RequestsChamados.ts' */

/* import { router } from '../router' */
/* import { useRoute } from 'vue-router' */
import { useStore } from 'vuex'
import { onMounted } from 'vue'
/* import { toast } from 'vue3-toastify' */

/* const route = useRoute() */
const store = useStore()

const dialog = ref(false)
/* const user = ref(route.params.user) */

let empresa = ref('')
let statusChamadoString = ref<string | null>('')
let statusChamado = ref<number | null>(null)
let nomeCliente = ref('')
let descricao = ref('')
let sistema = ref('')
let prioridade = ref<string | null>('')
let titulo = ref<string | null>('')
const existeCliente = ref<boolean>(false)

/* const props = defineProps(['dialog']); */
const emit = defineEmits()

onMounted(() => {
  console.log(existeCliente.value)
  const clienteEscolhido = store.getters.obterCliente
  console.log(clienteEscolhido)
  if (clienteEscolhido) {
    existeCliente.value = true
    nomeCliente.value = clienteEscolhido.nome
    empresa.value = clienteEscolhido.empresa
  }
})

const fecharModal = async () => {
  await emit('fecharModal')

  nomeCliente.value = ''
  empresa.value = ''
  store.commit('limpaCliente')
  store.commit('limpaChamado')
}

const RedirectConsultaDecliente = async () => {
  emit('consultarClientes')
}

const submitFormulario = () => {
  const dataForm = {
    StatusChamado: statusChamadoString.value,
    descricao: descricao.value,
    prioridade: prioridade.value,
    titulo: titulo.value,
    nomeCliente: nomeCliente.value,
    empresa: empresa.value
  }
  emit('submitChamado', dataForm)
}
</script>

<style scoped>
.ModalAdicionarServiço {
  background-color: #19181f !important;
  color: white;
  max-height: 90vh;
  font-size: 10px !important;
}
.title-modal {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
}
.ContainerForm {
  max-height: 80%;
}
#icon-cards {
  color: white !important;
  font-size: 10px !important;
}
.ContainerBuscaCliente {
  width: 460px !important;
  background-color: black;
  border-radius: 12px;
}
</style>
