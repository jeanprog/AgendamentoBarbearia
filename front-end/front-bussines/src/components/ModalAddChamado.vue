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
            class="bg-indigo-500 rounded-lg w-60 h-12"
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
              className="w-[280px] h-12 bg-zinc-600 rounded-lg "
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

          <Select v-model="sistema" class="bg-zinc-600 rounded-lg">
            <SelectTrigger
              required
              v-bind:disabled="!existeCliente"
              className="w-[280px] h-12 bg-zinc-600 rounded-lg"
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
              className="w-[280px] h-12 bg-zinc-600 rounded-lg"
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
          <p class="text-red font-bold" v-if="formNull">
            Preencha todo o formulário
          </p>

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
        <Button
          class="bg-green-700 w-40 h-12 rounded-lg"
          @click="submitFormulario"
          >Salvar</Button
        >
        <Button class="bg-red-700 w-40 h-12 rounded-lg" @click="fecharModal"
          >Fechar</Button
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import 'vue3-toastify/dist/index.css'
import { ref, defineEmits } from 'vue'

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
import { z, ZodError } from 'zod'
import { toast } from 'vue3-toastify'

const store = useStore()
const route = useRoute()

const dialog = ref(false)
/* const user = ref(route.params.user) */
const props = defineProps(['editarChamado'])

const schema = z.object({
  nomeCliente: z.string().min(1, 'Nome Cliente é obrigatório'),
  empresa: z.string().min(1, 'Empresa é obrigatória'),
  titulo: z.string().optional(),
  statusChamadoString: z.string().nonempty('Status é obrigatório'),
  sistema: z.string().nonempty('Sistema é obrigatório'),
  prioridade: z.string().nonempty('Prioridade é obrigatória'),
  descricao: z.string().min(1, 'Descrição do chamado é obrigatória')
})
const formNull = ref<boolean>(false)
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
  emit('consultarClientes', data)
}

const submitFormulario = async () => {
  try {
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

    schema.parse(data)
    formNull.value = false
    emit('submitChamado', data)
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.errors) // Mostra erros de validação
    } else {
      console.error(error) // Mostra outros erros
    }
    notifyFormNull()
  }
}

const notifyFormNull = () => {
  toast('formulário precisa ser preenchido', {
    autoClose: 1000
  })
  formNull.value = true
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
