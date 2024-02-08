<template>
  <v-card flat title="LISTA DE CHAMADOS" class="cTable">
    <template class="containerbusca" v-slot:text>
      <v-text-field
        v-model="search"
        label="PROCURE POR CLIENTE"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      ></v-text-field>
      <v-btn
        variant="outlined"
        class="fa-solid fa-rotate-right"
        @click="atualizarTabela()"
      ></v-btn>
    </template>

    <v-data-table
      class="cTablebody"
      :headers="headers"
      :items="listaResultado"
      :search="search"
    >
      <template v-slot:item.Acoes="{ item }" class="containerbtns">
        <v-btn
          variant="outlined"
          class="botoesAcoes"
          @click="handleEditar(item)"
          ><i class="fa-solid fa-pen-to-square"></i
        ></v-btn>
        <v-btn
          variant="outlined"
          class="botoesAcoes"
          @click="handleExcluir(item)"
          ><i class="fa-solid fa-trash"></i
        ></v-btn> </template
    ></v-data-table>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import axios from 'axios'
import { format } from 'date-fns'
import { watch } from 'vue'

import { useStore } from 'vuex'

const search = ref('')
const store = useStore()
const emit = defineEmits()

const headers = ref<[]>([])
const listaResultado = ref<[]>([])
const idUser = ref<number>()
const idRede = ref<number>()

headers.value = [
  { align: 'start', key: 'Empresa', sortable: false, title: 'Empresa' },
  { key: 'Cliente', title: 'cliente' },
  { key: 'Analista', title: 'Analista' },
  { key: 'status', title: 'Status' },
  { key: 'dAbertura', title: 'Data Abertura' },
  { key: 'sistema', title: 'Sistema' },
  { key: 'Acoes', title: 'Ações' }
]

interface Chamado {
  clienteId: number
  statusChamadoAtual: number

  Status: string
  dAbertura: string
  sistema: string
  Empresa: string
}

const chamados = ref<Chamado[]>([])
const props = defineProps(['mensagem'])

onMounted(() => {
  obterDadosAuthLogin() //refatorar essa chamado se repete em muitos componentes

  obterDadosTratadosChamado()
  console.log(props.mensagem, 'agora')
})
watch(
  () => props.mensagem,
  (newValue, oldValue) => {
    console.log(props.mensagem)
    if (newValue === true) {
      // Chamar a função para obter os dados dos formulários
      obterDadosTratadosChamado()
      console.log('cai no case')
    }
  }
)

const obterDadosAuthLogin = () => {
  const dadosLogin = localStorage.getItem('user')
  if (dadosLogin) {
    const dadosJson = JSON.parse(dadosLogin)
    idUser.value = parseInt(dadosJson.id)
    idRede.value = parseInt(dadosJson.rede)
  }
}
const handleEditar = async (item: any) => {
  /*  await store.dispatch('atualizaChamado', item) */
  emit('editar', item)
}

const handleExcluir = (item: any) => {
  console.log(item)
}

const formatarData = (data: any) => {
  const dataFormatada = format(new Date(data), 'dd/MM/yyyy')
  return dataFormatada
}

const obterDadosTratadosChamado = async () => {
  try {
    const responseClientes = await axios.get(`http://localhost:3000/clientes`)
    const responseChamados = await axios.get(
      `http://localhost:3000/servicos/user/${idUser.value}`
    ) // refatorar aqui promisse allslteld
    const responseUser = await axios.get(`http://localhost:3000/user-login`)

    const listaClientes = responseClientes.data
    const listaChamados = responseChamados.data
    const listaAnalista = responseUser.data

    if (listaClientes.length > 0 && listaChamados.length > 0) {
      listaResultado.value = listaChamados.map((chamado: any) => {
        const clienteCorrespondente = listaClientes.find(
          (cliente: any) => cliente.id === chamado.clienteId
        )
        const AnalistaCorrespondente = listaAnalista.find((analista: any) => {
          return analista.Id === chamado.usuarioId
        })

        return {
          ...chamado,
          Analista: AnalistaCorrespondente
            ? AnalistaCorrespondente.nameUser
            : 'nada',
          Empresa: clienteCorrespondente
            ? clienteCorrespondente.empresa
            : 'N/A',
          Cliente: clienteCorrespondente ? clienteCorrespondente.nome : 'n/a',
          status: getStatusText(chamado.statusChamadoAtual),
          dAbertura: formatarData(chamado.dAbertura)
        }
      })

      return listaResultado.value
    } else {
      console.log('Alguma lista vazia')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}

const getStatusText = (status: number): string => {
  switch (status) {
    case 1:
      return 'aberto'
    case 2:
      return 'pendente'
    case 3:
      return 'fechado'
    default:
      return 'Desconhecido'
  }
}
</script>

<style scoped>
.cTable {
  background-color: black !important;
  color: white;
}
.cTablebody {
  background-color: #19181f;
  color: white;
}

.containerbtns {
  display: flex !important;
}

.botoesAcoes {
  margin: 2px;
}

.containerbusca {
  position: fixed !important;
}
</style>
