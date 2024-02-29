<template>
  <!--   <div class="w-full justify-center flex mt-2">
    <TableCaption class="mt-0 w-full text-white"
      >Todos os chamados do dia 09/02/2024</TableCaption
    >
  </div> -->
  <Table
    v-if="tableFilter"
    class="max-h-50 text-white text-[12px] overflow-y-scroll rounded-lg"
    id="table"
  >
    <TableHeader class="sticky top-0 bg-customPurple">
      <TableRow class="">
        <TableHead class="w-[100px]"> Empresateste </TableHead>
        <TableHead>Funcionário</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Analista</TableHead>
        <TableHead class="text-right"> Data de Abertura</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="" v-for="chamado in listaResultado" :key="chamado.id">
        <TableCell class="font-medium">
          {{ chamado.Empresa }}
        </TableCell>
        <TableCell>{{ chamado.Cliente }}</TableCell>
        <TableCell>{{ chamado.status }}</TableCell>
        <TableCell>{{ chamado.Analista }}</TableCell>
        <TableCell class="text-right"> {{ chamado.dAbertura }} </TableCell>
        <div class="flex mt-1">
          <v-btn
            variant="outlined"
            class="botoesAcoes"
            @click="handleEditar(chamado)"
            ><i class="fa-solid fa-pen-to-square"></i
          ></v-btn>
          <v-btn
            variant="outlined"
            class="botoesAcoes"
            @click="handleExcluir(item)"
            ><i class="fa-solid fa-trash"></i
          ></v-btn>
        </div>
      </TableRow>
    </TableBody>
  </Table>

  <Table
    v-if="!tableFilter"
    class="max-h-50 text-white text-[12px] overflow-y-scroll rounded-lg"
    id="table"
  >
    <TableHeader class="sticky top-0 bg-customPurple">
      <TableRow class="">
        <TableHead class="w-[100px]"> Empresa </TableHead>
        <TableHead>Funcionário</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Analista</TableHead>
        <TableHead class="text-right"> Data de Abertura</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="" v-for="chamado in listaResultado" :key="chamado.id">
        <TableCell class="font-medium">
          {{ chamado.Empresa }}
        </TableCell>
        <TableCell>{{ chamado.Cliente }}</TableCell>
        <TableCell>{{ chamado.status }}</TableCell>
        <TableCell>{{ chamado.Analista }}</TableCell>
        <TableCell class="text-right"> {{ chamado.dAbertura }} </TableCell>
        <div class="flex mt-1">
          <v-btn
            variant="outlined"
            class="botoesAcoes"
            @click="handleEditar(chamado)"
            ><i class="fa-solid fa-pen-to-square"></i
          ></v-btn>
          <v-btn
            variant="outlined"
            class="botoesAcoes"
            @click="handleExcluir(item)"
            ><i class="fa-solid fa-eye"></i></v-btn>
        </div>
      </TableRow>
    </TableBody>
  </Table>
</template>
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { ref, onMounted, defineEmits, defineProps } from 'vue'
import axios from 'axios'
import { format } from 'date-fns'
import { watch } from 'vue'

const emit = defineEmits()

const listaResultado = ref<Array>([])
const idUser = ref<number>()
const idRede = ref<number>()
/* const listaChamadoAberto = ref<[]>([])
const listaChamadoFechado = ref<[]>([])
const listaChamadoPendente = ref<[]>([]) */
const chamadosData = ref<Array>([])
const tableFilter = ref<Boolean>(false)
/*
headers.value = [
  { align: 'start', key: 'Empresa', sortable: false, title: 'Empresa' },
  { key: 'Cliente', title: 'cliente' },
  { key: 'Analista', title: 'Analista' },
  { key: 'status', title: 'Status' },
  { key: 'dAbertura', title: 'Data Abertura' },
  { key: 'sistema', title: 'Sistema' },
  { key: 'Acoes', title: 'Ações' }
] */

interface Chamado {
  clienteId: number
  statusChamadoAtual: number

  Status: string
  dAbertura: string
  sistema: string
  Empresa: string
}

const chamados = ref<Chamado[]>([])
const props = defineProps(['mensagem', 'listaFiltrada'])

onMounted(() => {
  obterDadosAuthLogin() //refatorar essa chamado se repete em muitos componentes
  console.log(props.listaFiltrada, 'vendo a props')
  obterDadosTratadosChamado()
})
watch(
  () => props.mensagem,
  (newValue, oldValue) => {
    if (newValue === true) {
      // Chamar a função para obter os dados dos formulários
      obterDadosTratadosChamado()
      console.log('cai no case')
    }
  }
)
watch(
  () => props.listaFiltrada,
  (newValue, oldValue) => {
    if (newValue) {
      // Chamar a função para obter os dados dos formulários

      console.log('cai no case de filtragem', props.listaFiltrada)
      chamadosData.value = props.listaFiltrada
      tableFilter.value = true
      chamadosFiltrados()
    }
  }
)
const chamadosFiltrados = async () => {
  try {
    const responseClientes = await axios.get(`http://localhost:3000/clientes`)
    /* const responseChamados = await axios.get(
      `http://localhost:3000/servicos/user/${idUser.value}`
    )  */ // refatorar aqui promisse allslteld
    const responseUser = await axios.get(`http://localhost:3000/user-login`)

    const listaClientes = responseClientes.data
    const listaChamados = props.listaFiltrada
    const listaAnalista = responseUser.data

    if (listaClientes.length > 0 && props.listaFiltrada.length > 0) {
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
      emit('allChamado', listaResultado.value)
    } else {
      console.log('lista vazia ')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}
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
      emit('allChamado', listaResultado.value)
    } else {
      console.log('lista vazia ')
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
#table {
  overflow: auto !important;
  max-height: 50%;
  margin-top: 10px;
  border-radius: 24px;
}
#table::-webkit-scrollbar {
  width: 8px;
}

#table::-webkit-scrollbar-track {
  background: #19181f;
}
#table::-webkit-scrollbar-thumb {
  background-color: rgb(54, 0, 92); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 1px solid rgb(54, 0, 92); /* creates padding around scroll thumb */
}

.card-chamado {
  border: solid !important;
}
.container-btns {
  display: flex !important;
}

.botoesAcoes {
  margin: 2px;
  width: 12px !important;
  font-size: 12px !important;
}
</style>
