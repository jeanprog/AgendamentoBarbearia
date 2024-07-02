<template>
  <v-card class="ModalAdicionarServiço">
    <v-card-title class="title-modal">
      <span class="title-modal">Novo Chamado</span>
    </v-card-title>
    <v-card-text>
      <div class="flex gap-8 w-[700px] h-[330px]">
        <div id="right" class="flex flex-col gap-8 w-50">
          <Input
            class="w-60 h-12 bg-zinc-600 rounded-lg pl-14"
            v-if="!dialog"
            v-model="nomeCliente"
            placeholder="Nome Cliente"
            persistent-hint
            required
            v-bind:disabled="!existeCliente"
          ></Input>
          <Input
            class="bg-zinc-600 h-12 w-60 rounded-lg"
            v-if="!dialog"
            v-model="empresa"
            placeholder="Empresa"
            required
            v-bind:disabled="!existeCliente"
          ></Input>
          <Button
            v-if="!dialog"
            @click="RedirectConsultaDecliente"
            class="bg-red-400 w-60 h-12"
          >
            Buscar Cliente
          </Button>
          <div v-if="dialog" class="ContainerBuscaCliente">
            <buscaCliente />
          </div>
          <Input
            class="w-60 h-12 bg-zinc-600 rounded-lg"
            type="text"
            v-model="titulo"
            placeholder="titulo"
          >
          </Input>
        </div>
        <div id="left" class="flex flex-col gap-6">
          <Select class="bg-zinc-600" v-model="statusChamadoString">
            <SelectTrigger
              required
              v-bind:disabled="!existeCliente"
              className="w-[280px] h-12 bg-zinc-600"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent class="bg-zinc-800">
              <SelectGroup>
                <SelectItem value="aberto">Aberto</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="fechado">Fechado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select v-model="sistema" class="bg-zinc-600">
            <SelectTrigger
              required
              v-bind:disabled="!existeCliente"
              className="w-[280px] h-12 bg-zinc-600"
            >
              <SelectValue placeholder="Sistema" />
            </SelectTrigger>
            <SelectContent class="bg-zinc-800">
              <SelectGroup>
                <SelectItem value="PDV">PDV</SelectItem>
                <SelectItem value="Back-office">Back-office</SelectItem>
                <SelectItem value="Emissor Nf-e">Emissor Nf-e</SelectItem>
                <SelectItem value="Etiquetas">Etiquetas</SelectItem>
                <SelectItem value="Pré-Venda Mobile"
                  >Pré-Venda Mobile</SelectItem
                >
                <SelectItem value="ecommerce">ecommerce</SelectItem>
                <SelectItem value="Etiquetas">Etiquetas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select class="bg-zinc-600" v-model="prioridade">
            <SelectTrigger
              required
              v-bind:disabled="!existeCliente"
              className="w-[280px] h-12 bg-zinc-600"
            >
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent class="bg-zinc-800">
              <SelectGroup>
                <SelectItem class="hover:bg-zinc-600" value="Alta"
                  >Alta</SelectItem
                >
                <SelectItem class="hover:bg-zinc-600" value="Media"
                  >Media</SelectItem
                >
                <SelectItem class="hover:bg-zinc-600" value="Baixa"
                  >Baixa</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>

          <!--    <Input class="w-40 h-8 bg-zinc-400"></Input>
          <Input class="w-40 h-8 bg-zinc-400"></Input>
          <Input class="w-40 h-8 bg-zinc-400"></Input>
          <Input class="w-40 h-8 bg-zinc-400"></Input> -->
        </div>
      </div>
      <Textarea
        class="bg-zinc-600 rounded-lg h-44"
        placeholder="Descrição do chamado"
        v-model="descricao"
      ></Textarea>
      <div class="flex gap-4 mt-4">
        <!--   @click="submitFormulario" -->
        <Button class="bg-green-700 w-40" @click="submitFormulario"
          >Salvar</Button
        >
        <Button class="bg-red-700 w-40" @click="fecharModal">Fechar</Button>
      </div>
      <!--    <v-container class="ContainerForm">
        <v-row>
          <v-col cols="12" sm="6">
            <Input
              class="bg-zinc-600 h-16 w-80 rounded-lg"
              v-model="titulo"
              placeholder="Titulo"
              required
              v-bind:disabled="!existeCliente"
            ></Input>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              class="InputModal"
              v-model="statusChamadoString"
              :items="['aberto', 'pendente', 'fechado']"
              label="Status"
              required
              v-bind:disabled="!existeCliente"
            ></v-select>
          </v-col>
          <v-col class="border-2" v-if="!dialog" cols="12" sm="6" md="4">
            <Input
              class="bg-zinc-600 h-16 w-80 rounded-lg"
              v-if="!dialog"
              v-model="nomeCliente"
              placeholder="Nome Cliente"
              persistent-hint
              required
              v-bind:disabled="!existeCliente"
            ></Input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <div v-if="dialog" class="ContainerBuscaCliente">
              <buscaCliente />
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <Input
              class="bg-zinc-600 h-16 w-80 rounded-lg"
              v-if="!dialog"
              v-model="empresa"
              placeholder="Empresa"
              required
              v-bind:disabled="!existeCliente"
            ></Input>
          </v-col>

          <v-col cols="12">
            <v-textarea
              class="InputModal"
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
              class="InputModal"
              v-model="sistema"
              :items="[
                'PDV',
                'Back-office',
                'Emissor Nf-e',
                'Etiquetas',
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
              class="InputModal"
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
      </v-container> -->
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import 'vue3-toastify/dist/index.css'
import { ref, defineEmits } from 'vue'
/* import axios from 'axios'
import RequestsChamados from '../../src/services/RequestsChamados.ts' */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

/* import { router } from '../router' */
import { useRoute } from 'vue-router'

import { useStore } from 'vuex'
import { onMounted } from 'vue'

/* import { toast } from 'vue3-toastify' */

/* const route = useRoute() */
const store = useStore()
const route = useRoute()

const dialog = ref(false)
/* const user = ref(route.params.user) */
const props = defineProps(['editarChamado'])

let empresa = ref<string>('')
let statusChamadoString = ref<string | null>('')
let id = ref<number>()
let redeId = ref<number>()
let idUser = ref<number>()
let nomeCliente = ref<string>('')
let descricao = ref<string>('')
let sistema = ref<string>('')
let prioridade = ref<string | null>('')
let titulo = ref<string | null>('')
let idCliente = ref<number>()
const existeCliente = ref<boolean>(false)
const atualizaChamado = ref<boolean>(false)
const trocaDeCliente = ref<boolean>(false)
const novoChamado = ref<boolean>(false)

/* const props = defineProps(['dialog']); */
const emit = defineEmits()

onMounted(() => {
  salvarClienteSelecionado()
  recuperaDadosDoForm()
  obterDadosAuthLogin()

  recuperandoChamado()
  console.log(props.editarChamado)
})
const obterDadosAuthLogin = () => {
  const dadosLogin = localStorage.getItem('user')
  if (dadosLogin) {
    const dadosJson = JSON.parse(dadosLogin)
    idUser.value = parseInt(dadosJson.id)
    redeId.value = parseInt(dadosJson.rede)
    console.log(idUser.value, redeId.value)
  }
}

const recuperandoChamado = () => {
  if (props.editarChamado) {
    existeCliente.value = true
    titulo.value = props.editarChamado?.titulo
    nomeCliente.value = props.editarChamado?.Cliente
    empresa.value = props.editarChamado?.Empresa

    id.value = props.editarChamado?.id
    descricao.value = props.editarChamado?.descricao
    sistema.value = props.editarChamado?.sistema
    statusChamadoString.value = props.editarChamado?.status
    redeId.value = props.editarChamado?.redeId
    idUser.value = props.editarChamado?.usuarioId
    prioridade.value = props.editarChamado?.prioridade
    idCliente.value = props.editarChamado?.clienteId
  }

  console.log('recuperandoChamado')
}

const salvarClienteSelecionado = () => {
  const clienteEscolhido = store.getters.obterCliente
  console.log(clienteEscolhido)

  if (clienteEscolhido) {
    existeCliente.value = true
    nomeCliente.value = clienteEscolhido.nome
    empresa.value = clienteEscolhido.empresa
    idCliente.value = clienteEscolhido.id
  }
}

const recuperaDadosDoForm = () => {
  const dadosForm = store.getters.recuperarValoresForm
  if (dadosForm) {
    titulo.value = dadosForm.titulo
    id.value = dadosForm.id
    titulo.value = dadosForm.titulo
    prioridade.value = dadosForm.prioridade
    descricao.value = dadosForm.descricao
    statusChamadoString.value = dadosForm.statusChamadoString
    redeId.value = dadosForm.redeId
    idUser.value = dadosForm.usuarioId

    sistema.value = dadosForm.sistema
    console.log('recuperandoDadosDoForm')
  }
}

/*   const recuperaEstadoForm = store.getters.recuperarValoresForm */
/*  if (props.editarChamado === undefined && recuperaEstadoForm !== null) {
    // recuperando valores do formulário quando estou em um novo chamado.

    console.log('remontando os valores na troca do cliente', recuperaEstadoForm)

    if (recuperaEstadoForm) {
      // em um novo chamado peguei o estado do form
      // conteudo problematico
      console.log('teste', recuperaEstadoForm)
      titulo.value = recuperaEstadoForm.titulo
      statusChamadoString.value = recuperaEstadoForm.statusChamadoString
      prioridade.value = recuperaEstadoForm.prioridade
      descricao.value = recuperaEstadoForm.descricao
      sistema.value = recuperaEstadoForm.sistema
    }
  }

  const clienteEscolhido = store.getters.obterCliente

  if (clienteEscolhido) {
    existeCliente.value = true
    nomeCliente.value = clienteEscolhido.nome
    empresa.value = clienteEscolhido.empresa
    idCliente.value = clienteEscolhido.id
  }

  const existChamado = store.getters.recuperarChamado
  console.log(existChamado)
  if (existChamado) {
    // quando eu editei e fui trocar o cliente eu salvei no estado do form pra trazer os valores remontando aqui
    // então veirifquei se existia um chamado.
    titulo.value = store.getters.recuperarChamado.titulo

    sistema.value = store.getters.recuperarChamado.sistema
    prioridade.value = store.getters.recuperarChamado.prioridade
    descricao.value = store.getters.recuperarChamado.descricao
    statusChamadoString.value = store.getters.recuperarChamado.status
    trocaDeCliente.value = true
    /*   props.editarChamado.id = store.getters.recuperarChamado.id
    props.editarChamado.dAbertura = store.getters.recuperarChamado.dAbertura
    props.editarChamado.usuarioId = store.getters.recuperarChamado.usuarioId

    atualizaChamado.value = true
  }

  if (props.editarChamado !== undefined && props.editarChamado !== null) {
    // logica aqui

    existeCliente.value = true
    titulo.value = props.editarChamado?.titulo
    nomeCliente.value = props.editarChamado?.Cliente
    empresa.value = props.editarChamado?.Empresa
    sistema.value = props.editarChamado?.sistema
    prioridade.value = props.editarChamado?.prioridade
    descricao.value = props.editarChamado?.descricao
    statusChamadoString.value = props.editarChamado?.status
    idCliente.value = props.editarChamado?.clienteId

    atualizaChamado.value = true
  } */

const testeReatividade = () => {
  return console.log(titulo.value, 'acionei o metodo')
}

const fecharModal = async () => {
  await emit('fecharModal', { editarChamado: undefined })

  nomeCliente.value = ''
  empresa.value = ''
  store.commit('limpaCliente')
  store.commit('limpaChamado')
  store.commit('limpaValores')
}

const RedirectConsultaDecliente = () => {
  const data = {
    id: id.value,
    titulo: titulo.value,
    nomeCliente: nomeCliente.value,
    empresa: empresa.value,
    sistema: sistema.value,
    prioridade: prioridade.value,
    descricao: descricao.value,
    statusChamadoString: statusChamadoString.value,
    redeId: redeId.value,
    usuarioId: idUser.value,
    clienteId: idCliente.value
  }

  /* if (
    props.editarChamado !== undefined &&
    props.editarChamado !== null &&
    atualizaChamado.value === true
  ) {
    props.editarChamado.status = statusChamadoString.value
    const formatItem = {
      atualizaChamado: atualizaChamado.value,
      ...props.editarChamado
    }
    // desestruturação devolve item , menos os campos desestruturado .
    console.log(
      formatItem,
      ' verificando se a consulta cai aqui na busca por cliente quando está editando'
    )
    store.dispatch('atualizaChamado', formatItem)
    emit('consultarClientes', data) // se estou editando aqui eu salvo o estado do form pra trocar o cliente .
  } else {
    console.log('salvando o valores do novo chamado')
    store.dispatch('salvaValores', data)
    emit('consultarClientes', data)
  }  */
  emit('consultarClientes', data)
}

const submitFormulario = async () => {
  const data = {
    id: id.value,
    titulo: titulo.value,
    nomeCliente: nomeCliente.value,
    empresa: empresa.value,
    sistema: sistema.value,
    prioridade: prioridade.value,
    descricao: descricao.value,
    statusChamadoString: statusChamadoString.value,
    redeId: redeId.value,
    usuarioId: idUser.value,
    clienteId: idCliente.value
  }

  emit('submitChamado', data)
  /*  if (novoChamado.value === true) {
    const dataForm = {
      statusChamadoAtual: statusChamadoString.value,
      descricao: descricao.value,
      prioridade: prioridade.value,
      titulo: titulo.value,

      sistema: sistema.value,
      clienteId: idCliente.value
    }

    console.log('estou envinando um novo chamado ', dataForm)
    emit('submitChamado', dataForm)
  }

  // verificando no clique do botão se é editar e enviando o form pra atualziar
  // nesse primeiro if foi verificado o comportamento no caso de editar e não trocar o cliente .
  if (trocaDeCliente.value === true) {
    // se troquei o cliente então troco da onde estou recuperando a informação.
    console.log(idCliente.value)
    const clienteEscolhido = store.getters.obterCliente
    /*  const data = {
      id: store.getters.recuperarChamado.id, // trocar pelo state
      descricao: descricao.value,
      sistema: sistema.value,
      prioridade: prioridade.value,
      status: statusChamadoString.value,
      clienteId: idCliente.value,
      usuarioId: store.getters.recuperarChamado.usuarioId,
      titulo: titulo.value,
      atualizaChamado: atualizaChamado.value,
      dAbertura: store.getters.recuperarChamado.dAbertura
    }
    console.log(
      'teste pra cair na troca de cliente dentro de atualizar um pedido',
      data
    )
    emit('submitChamado', data)
  }
  if (
    props.editarChamado !== undefined &&
    props.editarChamado !== null &&
    atualizaChamado.value === true
  ) {
    props.editarChamado.status = statusChamadoString.value
    atualizaChamado.value === true

    const data = {
      id: props.editarChamado.id,
      descricao: descricao.value,
      sistema: sistema.value,
      prioridade: prioridade.value,
      status: statusChamadoString.value,
      clienteId: idCliente.value,
      usuarioId: props.editarChamado.usuarioId,
      titulo: titulo.value,
      atualizaChamado: atualizaChamado.value,
      dAbertura: props.editarChamado.dAbertura
    }

    // desestruturação devolve item , menos os campos desestruturado .

    emit('submitChamado', data)
  } */
}
</script>

<style scoped>
.ModalAdicionarServiço {
  background-color: #232229 !important;
  color: white;
  max-height: 90vh;
  font-size: 10px !important;
  border-radius: 24px;
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
.InputModal {
  border-radius: 24px !important;
  background-color: #403f4b;
}
</style>
