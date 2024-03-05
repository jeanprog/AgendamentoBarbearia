<template>
  <!--    -->

  <div class="body">
    <HeaderVoltar :title="titlepage" />
    <div class="body-left">
      <p class="py-2">Chamados {{ hoje }}</p>
      <div class="cards" v-if="!dialog">
        <div class="itens">
          <p class="titulo-box">Abertos ({{ listaChamadoAberto.length }})</p>

          <v-card
            class="card-customize"
            max-width="600"
            color="#67159C"
            v-for="(chamado, index) in listaChamadoAberto"
            :key="index"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-card">
                  <span class="label-card">Nome:</span> {{ chamado.Cliente }}
                </div>

                <div class="text-card">
                  <span class="label-card">Empresa:</span> {{ chamado.Empresa }}
                </div>
                <i class="fa-solid fa-eye"></i>
              </div>
            </v-card-item>
          </v-card>
        </div>
        <div class="itens">
          <p class="titulo-box">
            Pendentes ({{ listaChamadoPendente.length }})
          </p>
          <v-card
            class="card-customize"
            max-width="600"
            color="#67159C"
            v-for="(chamado, index) in listaChamadoPendente"
            :key="index"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-card">
                  <span class="label-card">Nome:</span> {{ chamado.Cliente }}
                </div>

                <div class="text-card">
                  <span class="label-card">Empresa:</span> {{ chamado.Empresa }}
                </div>
              </div>
            </v-card-item>
          </v-card>
        </div>
        <div class="itens">
          <p class="titulo-box">Fechados ({{ listaChamadoFechado.length }})</p>
          <v-card
            class="card-customize"
            max-width="600"
            color="#67159C"
            v-for="(chamado, index) in listaChamadoFechado"
            :key="index"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-card">
                  <span class="label-card">Nome:</span> {{ chamado.Cliente }}
                </div>

                <div class="text-card">
                  <span class="label-card">Empresa:</span> {{ chamado.Empresa }}
                </div>
              </div>
            </v-card-item>
          </v-card>
        </div>
      </div>
      <div class="container-acoes">
        <div class="container-prioridade">
          <div class="ml-28 flex flex-col align-center">
            <p v-if="!dialog">Prioridade Alta Pendentes</p>
            <Carousel
              v-if="!dialog"
              class="relative w-full max-w-sm"
              :opts="{
                align: 'start'
              }"
            >
              <CarouselContent class="-ml-1">
                <CarouselItem
                  v-for="(chamado, index) in listaChamadoPrioridade"
                  :key="index"
                  class="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div class="p-1" @click="abrirCardsPrioridade(chamado)">
                    <Dialog>
                      <DialogTrigger as-child>
                        <Card class="bg-indigo cursor-pointer">
                          <CardContent
                            class="flex aspect-square items-center p-6"
                          >
                            <div class="flex flex-col max-h-[48px]">
                              <span class="text-[12px] font-semibold">{{
                                chamado.Empresa
                              }}</span>
                              <span class="text-[6px] font-semibold"
                                >Data de Abertura</span
                              >
                              <span class="text-[12px] font-semibold">{{
                                chamado.dAbertura
                              }}</span>
                            </div>
                            <div>
                              <i class="fa-solid fa-eye"></i>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent class="sm:max-w-[425px] bg-indigo">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Chamado</DialogTitle>
                          <DialogDescription>
                            {{ chamado.descricao }}
                          </DialogDescription>
                        </DialogHeader>
                        <div class="grid py-4">
                          <div
                            class="grid grid-cols-2 items-center gap-2 text-[14px]"
                          >
                            <span class="font-bold">Titulo:</span>
                            {{ chamado.titulo }}
                            <span class="font-bold">Cliente:</span>
                            {{ chamado.Cliente }}

                            <span class="font-bold">Empresa:</span>
                            {{ chamado.Empresa }}

                            <span class="font-bold">Prioridade:</span>
                            {{ chamado.prioridade }}

                            <span class="font-bold">Arbetura:</span>
                            {{ chamado.dAbertura }}
                            <span class="font-bold">Fechamento:</span>
                            {{ chamado.dFechamento }}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            class="bg-customPurple rounded-lg rounded-sm transition-opacity hover:opacity-100 focus:outline-none"
                            type="submit"
                            @click="atualizarStatusFechado(chamado)"
                          >
                            <DialogClose
                              class="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                            >
                              Finalizar Chamado
                            </DialogClose>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <v-btn
          v-if="!dialog"
          color="#67159C"
          class="btn-chamado"
          @click="abrirModal"
          @fecharModal="fecharModal"
        >
          + Chamado
        </v-btn>
        <div class="ModalPage" v-if="dialog">
          <ModalAddChamado
            @fecharModal="fecharModal"
            @chamadoAdicionado="handleChamadoAdicionado"
            @submitChamado="obterDadosFormularios"
            @consultarClientes="escolherCliente"
            :editarChamado="itemEditar"
          />
        </div>
      </div>
    </div>
    <div class="body-right">
      <div v-if="!dialog" class="flex flex-grid-2 gap 2">
        <v-text-field
          class="w-80 m-6"
          density="compact"
          variant="solo"
          label="Buscar Chamados"
          append-inner-icon="fa-brands fa-searchengin"
          single-line
          hide-details
          bg-color="#1E1E26"
        ></v-text-field>
      </div>
      <p v-if="!dialog">Filtrar por data</p>
      <div v-if="!dialog" class="flex flex-grid-2 gap-4">
        <div class="max-w-50">
          <popoverTeste
            dataTitulo="Data inicio"
            isStart="true"
            @dataInicio="recebeDatainicio"
          />
        </div>
        <div class="max-w-50">
          <popoverTeste
            dataTitulo="Data Final"
            isStart="false"
            @dataFim="recebeDataFim"
          />
        </div>
      </div>
      <!--   <v-btn :elevation="12" class="mt-2">Filtrar</v-btn> -->
      <p v-if="!dialog" class="mt-16">Todos os chamados Recentes</p>
      <tabela
        v-if="!dialog && listaPronta"
        @chamados="listaChamadosAbertos"
        @editar="abrirModalEditar"
        :listaFiltrada="novaLista"
        :itensTabela="itensChamado"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import popoverTeste from '../components/popoverTeste.vue'
import tabela from '../components/tabela.vue'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog'

/* import axios from 'axios' */
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import { watch } from 'vue'
/* import { toast } from 'vue3-toastify' */
import 'vue3-toastify/dist/index.css'

import ModalAddChamado from '../components/ModalAddChamado.vue'
import TabelaChamados from '../components/TabelaChamados.vue'
import { useRoute } from 'vue-router'
import { router } from '../router'
import retornaNumberStatus from '../utils/formatStatus.ts'
import {
  postChamado,
  atualizarChamado,
  getChamadosPorData,
  getChamadosDiaAtual
} from '../services/RequestsChamados.ts'

import { toast } from 'vue3-toastify'
import { useStore } from 'vuex'
import axios from 'axios'
import { format } from 'date-fns'

const route = useRoute()
const emit = defineEmits()
const dialog = ref(false)
const titlepage = ref('Administração Rápida de Chamados')
const abrirChamado = ref()
const manipulaEstadoDaTabela = ref(false)
const idRede = ref<number>()
const idUser = ref<number>()
const itemEditar = ref()
const novoChamado = ref<number>()
const store = useStore()
const listaChamadoAll = ref<[]>([])
const listaChamadoPrioridade = ref<[]>([])
const listaChamadoAberto = ref<[]>([])
const listaChamadoFechado = ref<[]>([])
const listaChamadoPendente = ref<[]>([])
let openModalPrioridade = ref<boolean>(false)
const chamadoSelecionado = ref()
const dateStart = ref<Date>()
const dateEnd = ref<Date>()
const _listaFiltrada = ref<unknown[]>([])
const _listaChamadosDiaAtual = ref<[]>([])
const recarregar = ref<Boolean>(false)
const hoje = ref<String>('')
const listaResultado = ref<Array>([])
const itensChamado = ref<Array>([])
const novaLista = ref<Array>([])

const mensagem = ref<Boolean>(false)
const listaPronta = ref<Boolean>(false)
const user = ref(route.params.user)

onMounted(() => {
  const route = useRoute()

  console.log((hoje.value = format(new Date(), 'dd/MM/yyyy')))
  if (listaResultado.value.length > 0) {
    console.log('executei depois')
  }

  retornaChamadosIgualDiaAtual()
  obterDadosTratadosChamado()

  obterDadosAuthLogin()

  abrirChamado.value = route.query.abrirModal
  console.log('vendo chamado', abrirChamado.value)

  if (parseInt(abrirChamado.value) === 1) {
    dialog.value = true
  }
})

/* watch(
  () => recarregar.value,
  (newValue, oldValue) => {
    if (newValue === true) {
      // Chamar a função para obter os dados dos formulários
      retornaChamadosIgualDiaAtual()
      console.log('cai no case')
    }
  }
) */

const atualizarStatusFechado = async (item: any) => {
  console.log(item.statusChamadoAtual, 'capturando item')
  const data = {
    id: item.id,
    statusChamadoAtual: 3
  }
  const response = await atualizarChamado(data)
  notifyAtualizachamado()
  obterDadosTratadosChamado()
  retornaChamadosIgualDiaAtual()

  return /* console.log(response) */
}
const retornaChamadosIgualDiaAtual = async () => {
  const storedData = localStorage.getItem('user')

  if (storedData) {
    const parsedData = JSON.parse(storedData)
    const id = parsedData.id
    const response = await getChamadosDiaAtual(id)
    try {
      const responseClientes = await axios.get(
        `http://192.168.1.108:3000/clientes`
      )
      /* const responseChamados = await axios.get(
      `http://localhost:3000/servicos/user/${idUser.value}`
    )  */ // refatorar aqui promisse allslteld
      const responseUser = await axios.get(
        `http://192.168.1.108:3000/user-login`
      )

      const listaClientes = responseClientes.data
      const listaChamados = response.data
      const listaAnalista = responseUser.data

      if (
        listaChamados.length > 0 &&
        listaClientes.length > 0 &&
        listaAnalista.length > 0
      ) {
        _listaChamadosDiaAtual.value = listaChamados.map((chamado: any) => {
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
        filtrarChamadosAbertos()
        filtrarChamadosPendentes()
        filtrarChamadosFechados()
      } else {
        console.log('lista vazia ')
        return []
      }
    } catch (error) {
      console.error('Erro ao obter dados:', error)
      return []
    }
  }
}

const formatarData = (data: any) => {
  const dataFormatada = format(new Date(data), 'dd/MM/yyyy')
  return dataFormatada
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

const filtrarChamadosAbertos = () => {
  if (_listaChamadosDiaAtual.value.length > 0) {
    listaChamadoAberto.value = _listaChamadosDiaAtual.value.filter(
      (chamado: any) =>
        chamado.status === 'aberto' || chamado.statusChamadoAtual === 1
    )
  }
}
const filtrarChamadosPendentes = () => {
  if (_listaChamadosDiaAtual.value.length > 0) {
    listaChamadoPendente.value = _listaChamadosDiaAtual.value.filter(
      (chamado: any) =>
        chamado.status === 'pendente' || chamado.statusChamadoAtual === 2
    )
  }
}
const filtrarChamadosFechados = () => {
  if (_listaChamadosDiaAtual.value.length > 0) {
    listaChamadoFechado.value = _listaChamadosDiaAtual.value.filter(
      (chamado: any) =>
        chamado.status === 'fechado' || chamado.statusChamadoAtual === 3
    )
  }
}

const recebeDatainicio = (dataInicio: Date) => {
  console.log(dataInicio, 'acionei o evento data inicio')
  dateStart.value = dataInicio
  filtrarPorDatas()
}

const recebeDataFim = (dataFim: Date) => {
  dateEnd.value = dataFim
  filtrarPorDatas()
}
const filtrarPorDatas = async () => {
  if (dateStart.value && dateEnd.value) {
    const storedData = localStorage.getItem('user')

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const id = parsedData.id
      const response = await getChamadosPorData(
        id,
        dateStart.value,
        dateEnd.value
      )
      _listaFiltrada.value = response.data
      console.log(_listaFiltrada.value)
      chamadosFiltrados()
    }
  } else {
    console.log('case sem datas preenchidas ')
  }
}

const obterDadosTratadosChamado = async () => {
  try {
    const responseClientes = await axios.get(
      `http://192.168.1.108:3000/clientes`
    )
    const responseChamados = await axios.get(
      `http://192.168.1.108:3000/servicos/user/${idUser.value}`
    ) // refatorar aqui promisse allslteld
    const responseUser = await axios.get(`http://192.168.1.108:3000/user-login`)

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
      console.log(
        listaResultado.value,
        'teste da lista aqui no cadastro de serviço'
      )

      listaPrioridadeChamado()
      if (listaResultado.value.length > 0) {
        console.log('executei depois', listaResultado.value)
        itensChamado.value = listaResultado.value
        listaPronta.value = true

        console.log(itensChamado.value)
      }
      /*   emit('allChamado', listaResultado.value)
      recarregar.value = false */
    } else {
      console.log('lista vazia ')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}

const chamadosFiltrados = async () => {
  try {
    const responseClientes = await axios.get(
      `http://192.168.1.108:3000/clientes`
    )
    /* const responseChamados = await axios.get(
      `http://localhost:3000/servicos/user/${idUser.value}`
    )  */ // refatorar aqui promisse allslteld
    const responseUser = await axios.get(`http://192.168.1.108:3000/user-login`)

    const listaClientes = responseClientes.data
    const listaChamados = _listaFiltrada.value
    const listaAnalista = responseUser.data

    if (listaClientes.length > 0 && _listaFiltrada.value.length > 0) {
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
      console.log('lista final ', listaResultado.value)
      if (listaResultado.value.length > 0) {
        novaLista.value = listaResultado.value
        console.log(novaLista.value, 'lista filtrada')
      }
    } else {
      console.log('lista vazia ')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}

const abrirCardsPrioridade = (item: any) => {
  console.log('cards', openModalPrioridade.value, item)
  openModalPrioridade.value = true
  chamadoSelecionado.value = item
}

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
  obterDadosTratadosChamado()
  retornaChamadosIgualDiaAtual()
  mensagem.value = true
  recarregar.value = true
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
    recarregar.value = true
    notifyAddchamado()
    obterDadosTratadosChamado()
    retornaChamadosIgualDiaAtual()
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

const listaPrioridadeChamado = () => {
  if (listaResultado.value.length > 0) {
    listaChamadoPrioridade.value = listaResultado.value.filter(
      (chamado) =>
        chamado.prioridade === 'Alta' && chamado.statusChamadoAtual != 3
    )
  }
  console.log('só chamados em Alta', listaChamadoPrioridade.value)
}
</script>

<style scoped>
.body {
  min-width: 100%;
  max-height: 90%;
  overflow: hidden;

  display: flex;
}
.body-left {
  width: 50%;
  color: white;
  max-height: 88vh;
  margin-top: 6%;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.cards {
  display: flex;
  justify-content: space-around;
  margin-top: 8px;

  min-height: 46%;
  width: 100%;
  overflow-y: auto !important;
}
.titulo-box {
  position: sticky;
  top: 0;
  background-color: rgb(54, 0, 92);
  width: 100%;
  /* Opcional: cor de fundo para tornar o texto mais visível */
  z-index: 1; /* Garante que o texto esteja acima dos elementos abaixo */
  text-align: center;
  border-radius: 8px;
}
.itens {
  width: 100%;

  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: auto !important;
  height: 100%;
}
.itens::-webkit-scrollbar {
  width: 8px;
}

.itens::-webkit-scrollbar-track {
  background: #19181f;
}
.itens::-webkit-scrollbar-thumb {
  background-color: rgb(54, 0, 92); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 1px solid rgb(54, 0, 92); /* creates padding around scroll thumb */
}
.card-customize {
  box-shadow: 0px 4px 6px rgb(54, 0, 92);
  width: 80%;
  margin: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 20%;
}
.aside {
  width: 100%;
  border: solid 2px;
  border-color: white;
}
.body-right {
  color: white;

  width: 50%;
  margin-top: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-card {
  color: white;
  font-size: 12px;
}
.container-acoes {
  width: 96%;

  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  margin: 8px;
  padding-bottom: 12px;
}
.container-prioridade {
  max-height: 30vh;

  display: flex;
  min-width: 100%;

  display: flex;

  align-items: center;

  margin: 4%;
}

.btn-chamado {
  box-shadow: 0px 4px 6px rgb(54, 0, 92);
  width: 50%;
  min-height: 30%;
  right: 10%;
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
  height: 80vh !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  min-width: 100% !important;
  left: 50%;
  bottom: 12%;
  position: relative;
}
</style>
