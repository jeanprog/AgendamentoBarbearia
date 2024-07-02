<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'

import HeaderVoltar from '../../components/HeaderVoltar.vue'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  /*  SelectLabel, */
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  /*   DialogFooter, */
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Card
  /*  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle */
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

import {
  getVersoes,
  postVersoes,
  delVersaoService,
  requestSolucaoVersao,
  getSolucaoVersao
} from '../../services/versoesServices.ts'
import { Input } from '@/components/ui/input'

import popoverTeste from '../../components/popoverTeste.vue'
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'

import { toast } from 'vue3-toastify'
import { z } from 'zod'
import fomatarData from '../../utils/maskDate.ts'
import VersaoGateway from '@/infra/Gateways/VersaoGateway.ts'
import Versao from '@/entitys/Versao.ts'

interface versao {
  id: number
  aplicativo: string
  versao: string
  datCri: Date
}

interface PropsSolucoesVersoes {
  id: number
  aplicativo: string
  datCri: string // ISO date string
  descricao: string
  desenvolvedor: string
  idVersao: number
  titulo: string
  usuarioId: number
}

let titlepage = ref('Solicitações desenvolvimento')
const dateStart = ref<Date>()
const dateEnd = ref<Date>()

const listVersoes = ref<Versao[]>([])
const valueVersao = ref<String>('')
const valueApp = ref<String>('')
const selectVersao = ref<string>('')
const desenvolvedor = ref<string>('')
const datCriDesenv = ref<Date>()
const tituloDesenv = ref<string>('')
const descricaoDesenv = ref<string>('')
const selectAppVersao = ref<string>('')
const camposObrigatorios = ref<Boolean>(false)
const arraySolicitacoes = ref<PropsSolucoesVersoes[]>([])
/* const descricaoSolucao = ref<string>('')
 */
const data = [
  { name: 'Jan', total: 3 },
  { name: 'Feb', total: 50 },
  { name: 'Mar', total: 20 },
  { name: 'Apr', total: 10 },
  { name: 'May', total: 40 },
  { name: 'Jun', total: 2 }
]

const todosGateway = inject('versaoGateway') as VersaoGateway
if (!todosGateway) {
  throw new Error('TodosGateway não foi injetado corretamente')
}

/* const maxY = 60 */

onMounted(() => {
  todoVersoes()
  todasSolicitacoes()
})

const todoVersoes = async () => {
  try {
    const todosData = await todosGateway.getTodoVersao()
    console.log(todosData, 'teste clean ')
    if (todosData) {
      listVersoes.value = todosData
    }
    /* listVersoes.value.todos = todosData; */
    /*  const response = getTodo
       if (response) { 
      listVersoes.value = response.data
    } */
  } catch (error) {
    console.error(error) // Mostra erros, caso ocorram
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

const RecebeDataDesenv = (dataDesenv: Date) => {
  datCriDesenv.value = dataDesenv
  console.log(datCriDesenv.value)
}

const filtrarPorDatas = async () => {
  if (dateStart.value && dateEnd.value) {
    console.log(' com datas  ')
  } else {
    console.log('sem datas ')
  }
}

/* const verificaDiaSelecionado = (dayvalue: any) => {
   const result = form.diasAbertos.includes(dayvalue)
  return console.log('teste aqui', dayvalue)
} */

const cadastrarVersao = async () => {
  console.log(valueVersao.value, valueApp.value)

  if (valueVersao.value && valueApp.value) {
    const data = {
      aplicativo: valueApp.value as string,
      versao: valueVersao.value as string,
      datCri: new Date()
    }
    await todosGateway.addVersao(data)
    todoVersoes()
    toastNotify('adicionado com sucesso')
    valueVersao.value = ''
    valueApp.value = ''
  } else {
    console.log('toast preencha todos os campos ! ')
    toastNotify('preencha todos os campos')
    return
  }
}

const deleteVersao = async (id: number) => {
  console.log('peguei o id', id)
  // comentei estar parte pra poder adiciona a regra de deletar somente se não tiver associado a solicitações !

  await delVersaoService(id)
  todoVersoes()
  /*   toastNotify('Ainda não é permitido remover uma versão') */
}

const toastNotify = (text: string) => {
  toast(text, {
    autoClose: 1000
  })
}

const capturaIdVersao = () => {
  const idVersao = selectVersao.value ? parseInt(selectVersao.value) : undefined
  console.log(listVersoes.value)
  if (idVersao) {
    console.log('percorrendo o array id number', idVersao)
    const nameApp = listVersoes.value.find((versao) => versao.id === idVersao)
    if (nameApp) {
      selectAppVersao.value = nameApp.aplicativo
    }
  }
}

const solicitacao = z.object({
  idVersao: z.number(),
  aplicativo: z.string().nonempty(),
  usuarioId: z.number(),
  desenvolvedor: z.string().nonempty(),
  descricao: z.string().nonempty(),
  titulo: z.string().nonempty(),
  datCri: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!"
  }) // Torna o campo datCri obrigatório
})

const submitSolicitacaoDesenv = async () => {
  const storedData = localStorage.getItem('user')

  if (storedData) {
    const parsedData = JSON.parse(storedData)
    const id = parsedData.id
    console.log(descricaoDesenv.value, 'teste metodo')
    const data = {
      idVersao: parseInt(selectVersao.value),
      aplicativo: selectAppVersao.value,
      usuarioId: id, // pegar no local storage
      desenvolvedor: desenvolvedor.value,
      descricao: descricaoDesenv.value,
      titulo: tituloDesenv.value,
      datCri: datCriDesenv.value
    }
    console.log(data)

    try {
      solicitacao.parse(data)

      console.log(
        'Todos os campos estão preenchidos corretamente. Pode prosseguir com a submissão.'
      )
      camposObrigatorios.value = false
      await requestSolucaoVersao(data)
      clearCampos()
      toastNotify('enviado com sucesso')

      // Faça a submissão da solicitação de desenvolvimento aqui
    } catch (error) {
      console.log('Preencha todos os campos corretamente antes de prosseguir.')
      camposObrigatorios.value = true // manipula a mensagem de campo obrigatório
    }
  }

  // não consegui instalar o zod e o  veevalidator não sei porque o shadcnvue não está permitindo deve estar instável , fazer feio mesmo
}
/* 
const requestDesenv = async (data: any) => {
  const response = await requestSolucaoVersao(data)
  clearCampos()
  toastNotify('enviado com sucesso')
} */

const todasSolicitacoes = async () => {
  try {
    const response = await getSolucaoVersao()
    if (response) {
      arraySolicitacoes.value = response.data
      console.log(arraySolicitacoes.value, 'lista')
    }
    return
  } catch (error) {
    console.error(error) // Mostra erros, caso ocorram
  }
}
const clearCampos = () => {
  selectAppVersao.value = ''
  desenvolvedor.value = ''
  descricaoDesenv.value = ''
  tituloDesenv.value = ''
  datCriDesenv.value = undefined
}

const cadastrarSolucao = (idSolicitacao: number, idVersao: number) => {
  console.log(idSolicitacao, idVersao)
  if (idSolicitacao && idVersao) {
    /*  const data  = {
      idVersao,
      idSolicitacao,
      descricaoSolucao: descricaoSolucao.value
      datCri: new Date()

    } */
  }
}
</script>

<template>
  <HeaderVoltar :title="titlepage" />
  <section class="flex text-white gap-8 h-100 px-4">
    <aside class="flex flex-col items-center w-64 gap-6 shadow-zinc-800 pt-6">
      <div
        class="w-full h-80 rounded-[24px] bg-zinc-800 flex flex-col items-center gap-2"
      >
        <p class="text-sm mt-4">Cadastro de versões</p>
        <div class="relative items-center w-70">
          <Input
            id="search"
            type="text"
            placeholder="Search..."
            class="pl-10 bg-zinc-900 rounded-[12px] text-zinc-600 w-70"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 text-zinc-600"
            ><i class="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <div
          class="flex flex-col gap-2 h-52 overflow-auto hover:overflow-scroll pt-2"
          id="scroll"
        >
          <div
            v-for="(versao, index) in listVersoes"
            :key="index"
            class="flex bg-zinc-700 w-60 rounded-lg h-8 hover:bg-customGreen shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] focus:outline-none"
          >
            <Dialog>
              <DialogTrigger
                class="flex items-center gap-16 w-60 shadow-zinc-800 focus:outline-none"
              >
                <p class="w-40 text-[12px]">
                  {{ versao.aplicativo }} : {{ versao.versao }}
                </p>
                <i class="fa-solid fa-eye"></i>
              </DialogTrigger>
              <DialogContent class="bg-zinc-900 text-white rounded-lg">
                <DialogHeader>
                  <DialogTitle>{{ versao.aplicativo }}</DialogTitle>
                  <DialogDescription class="flex flex-col gap-6">
                    <div class="flex justify-content gap-6">
                      <p class="font-bold">VERSÃO:</p>
                      <P>{{ versao.versao }}</P>
                    </div>
                    <div class="flex gap-6">
                      <p class="font-bold">DATA:</p>
                      <P>{{ versao.datCri }}</P>
                    </div>
                    <div>
                      <DialogClose class="focus:outline-none">
                        <Button
                          class="rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-indigo-800 hover:bg-indigo-500 focus:outline-none"
                          @click="deleteVersao(versao.id)"
                          >Remover</Button
                        >
                      </DialogClose>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Dialog>
          <DialogTrigger class="focus:outline-none">
            <Button
              class="bg-customGreen hover:bg-zinc rounded-lg shadow-zinc-800 hover:bg-zinc-900 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              >Adicionar</Button
            >
          </DialogTrigger>
          <DialogContent
            class="rounded-lg w-42 h-64 bg-zinc-600 text-white flex flex-col items-center justify-center"
          >
            <p class="text-[12px] text-transform: uppercase font-bold">
              Cadastre sua Versão
            </p>
            <DialogDescription class="flex flex-col gap-4">
              <Input
                v-model="valueApp"
                type="text"
                placeholder="Aplicativo"
                class="pl-10 bg-zinc-800 rounded-[12px] text-zinc-600 w-70 text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
              />
              <Input
                type="text"
                v-model="valueVersao"
                placeholder="Versao"
                class="pl-10 bg-zinc-800 rounded-[12px] text-zinc-600 w-70 text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
              />
              <DialogClose :disabled="!valueApp || !valueVersao">
                <Button
                  class="rounded-lg bg-indigo-800 hover:bg-indigo-600 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                  @click="cadastrarVersao()"
                >
                  Cadastrar
                </Button></DialogClose
              >
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <div class="w-full h-64 rounded-[24px] bg-zinc-800"></div>
    </aside>
    <main
      class="flex flex-col flex-auto items-center w-64 gap-2 shadow-zinc-900 pt-6"
    >
      <div class="flex flex w-100 h-36 bg-zinc-800 rounded-[24px]">
        <div class="flex flex-col">
          <div class="flex w-100 p-4 text-[12px] text-zinc-300 gap-6">
            <p>Abertos</p>
            <p>Pendentes</p>
            <p>Fechados</p>
            <p>Sla</p>
            <p>total</p>
          </div>
          <div class="flex w-100 gap-6 p-4">
            <Card class="w-12 h-12 bg-zinc-900 flex justify-center items-center"
              >5
            </Card>
            <Card class="w-12 h-12 bg-zinc-900 flex justify-center items-center"
              >5
            </Card>
            <Card class="w-12 h-12 bg-zinc-900 flex justify-center items-center"
              >5
            </Card>
            <Card class="w-12 h-12 bg-zinc-900 flex justify-center items-center"
              >5%
            </Card>
            <Card class="w-12 h-12 bg-zinc-900 flex justify-center items-center"
              >5
            </Card>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-zinc-400 text-=14px]">Ultima Solicitação pendente</h3>
          <p class="text-zinc-400 text-[12px]">Aplicativo: nfce</p>
          <p class="text-zinc-400 text-[12px]">desenvolvedor: luiz carlos</p>
          <p class="text-zinc-400 text-[12px]">
            titulo: problema na edição de pix
          </p>
          <p class="text-zinc-400 text-[12px]">data de criação: 24/02/1994</p>
        </div>
      </div>
      <div
        class="flex flex-col w-100 h-4/6 bg-zinc-800 rounded-[24px] gap-2 py-4 items-center"
      >
        <div class="text-[14px] text-zinc-300 w-full flex justify-center">
          Historico Solicitações Desenvolvimento
        </div>
        <div class="flex max-w-100 justify-center gap-2 p-4">
          <div class="relative items-center w-70">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10 bg-zinc-900 rounded-[12px] text-zinc-600 w-70"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2 text-zinc-600"
              ><i class="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>

          <popoverTeste
            dataTitulo="Data inicio"
            isStart="true"
            @dataInicio="recebeDatainicio"
          />

          <popoverTeste
            dataTitulo="Data Final"
            isStart="false"
            @dataFim="recebeDataFim"
          />
        </div>
        <div>
          <Dialog>
            <DialogTrigger class="focus:outline-none">
              <Button
                class="rounded-lg bg-indigo-900 hover:bg-customGray shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                >Adicionar solicitação</Button
              >
            </DialogTrigger>
            <DialogContent class="flex flex-col bg-zinc-700 text-white">
              <DialogDescription>
                <div class="flex gap-6 justify-center items-center">
                  <div class="flex flex-col gap-2 items-center">
                    <span>Selecione Versão</span>
                    <Select v-model="selectVersao">
                      <SelectTrigger
                        class="w-48 ml-2 h-10 bg-zinc-900 rounded-[12px]"
                      >
                        <SelectValue
                          v-if="selectAppVersao !== undefined"
                          placeholder="Versões"
                        />
                      </SelectTrigger>
                      <SelectContent class="bg-zinc-900 w-48 text-white">
                        <SelectGroup>
                          <SelectItem
                            v-for="(versao, index) in listVersoes"
                            :key="index"
                            :value="versao.id.toString()"
                            @click="capturaIdVersao()"
                          >
                            {{ versao.aplicativo }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <span>Crie um titulo</span>
                    <Input
                      v-model="tituloDesenv"
                      class="w-48 h-10 bg-zinc-900 rounded-[12px]"
                    ></Input>
                  </div>
                  <div class="flex flex-col gap-2 justify-center items-center">
                    <span>Desenvolvedor</span>
                    <Input
                      v-model="desenvolvedor"
                      class="w-48 h-10 bg-zinc-900 rounded-[12px]"
                    ></Input>
                    <span>selecione a data</span>
                    <popoverTeste
                      dataTitulo="data solução"
                      dataDesenv="true"
                      @eventDateDesenv="RecebeDataDesenv"
                    />
                  </div>
                </div>
                <div class="mt-2">
                  <span>Descrição</span>
                  <Textarea
                    v-model="descricaoDesenv"
                    class="bg-zinc-900 rounded-[12px]"
                  />
                </div>
                <div class="flex justify-between">
                  <Button
                    @click="submitSolicitacaoDesenv()"
                    class="mt-4 bg-indigo-900 hover:bg-indigo-700 focus:outline-none rounded-lg"
                    >Cadastrar solução</Button
                  >
                  <p v-if="camposObrigatorios === true" class="text-[red]">
                    preeencha todos os campos
                  </p>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div class="w-100 h-48 p-2">
          <Table class="w-100">
            <TableHeader class="sticky top-0">
              <TableRow class="flex justify-between text-[12px] text-zinc-400">
                <div class="flex gap-2">
                  <TableHead class="">Desenvolvedor</TableHead>
                  <TableHead>Aplicativo</TableHead>
                  <TableHead class="pl-4">Versão</TableHead>
                </div>
                <div class="">
                  <TableHead class="flex justify-center">titulo</TableHead>
                </div>

                <div class="flex gap-4">
                  <TableHead class="flex justify-center">Data</TableHead>
                  <TableHead class="">solução</TableHead>
                  <TableHead>Fechar</TableHead>
                  <TableHead>Visualizar</TableHead>
                </div>
              </TableRow>
            </TableHeader>
            <tableBody
              class="flex flex-col gap-2 h-52 overflow-x-auto"
              id="scroll"
            >
              <TableRow
                v-for="(solicitacao, index) in arraySolicitacoes"
                :key="index"
                class="flex justify-between items-center gap-2 text-[12px] bg-zinc-700 hover:bg-indigo-900 rounded-[8px] h-16 shadow-zinc-900 pl-2 pr-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              >
                <TableCell class="">
                  {{ solicitacao.desenvolvedor }}
                </TableCell>
                <TableCell class=""> {{ solicitacao.aplicativo }} </TableCell>
                <TableCell
                  >{{
                    listVersoes.find(
                      (versao) => versao.id === solicitacao.idVersao
                    )?.versao || 'Não encontrado'
                  }}
                </TableCell>
                <TableCell class="">
                  {{ solicitacao.titulo }}
                </TableCell>
                <TableCell class="">
                  {{ fomatarData(solicitacao.datCri) }}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger class="focus:outline-none">
                      <Button
                        class="h-6 rounded-[8px] focus:outline-none text-[10px] bg-indigo-900 hover:bg-zinc-900 shadow-zinc-900 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                        >+</Button
                      >
                    </DialogTrigger>
                    <DialogContent class="bg-zinc-900 text-white rounded-lg">
                      <p>
                        Descreve a solução que foi implementada<br />
                        {{
                          listVersoes.find(
                            (versao) => versao.id === solicitacao.idVersao
                          )?.aplicativo || 'Não encontrado'
                        }}
                        {{
                          listVersoes.find(
                            (versao) => versao.id === solicitacao.idVersao
                          )?.versao || 'Não encontrado'
                        }}
                      </p>
                      <Textarea class="rounded-lg bg-zinc-600"></Textarea>
                      <Button
                        @click="
                          cadastrarSolucao(solicitacao.id, solicitacao.idVersao)
                        "
                        class="focus-outline-none bg-customGreen rounded-lg hover:bg-[#2DFCBE]"
                        >Cadastrar solução</Button
                      >
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Button
                    class="h-6 rounded-[8px] text-[10px] bg-indigo-900 shadow-zinc-900 hover:bg-zinc-900 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                    >x</Button
                  >
                </TableCell>
                <TableCell class="text-[24px]">
                  <i class="fa-solid fa-eye"></i>
                </TableCell>
              </TableRow>
            </tableBody>
          </Table>
        </div>

        <!-- <div
          class="flex w-100 bg-zinc-700 rounded-[8px] h-16 shadow-zinc-900 gap-2"
        >
          <div class="flex flex-col">
            <div
              class="flex w-5/6 text-[12px] text-zinc-400 gap-8 px-2 border-2"
            >
              <p>Desenvolvedor</p>
              <p>Status</p>

              <p>Aplicativo</p>
              <p>Data</p>
            </div>
            <div class="flex w-4/6 text-[12px] gap-10 px-2 border-2">
              <p class="ml-2">Guimarães</p>
              <p class="ml-2">Aberto</p>
              <p class="ml-2">Back-office</p>
              <p>20/02/2024</p>
            </div>
          </div>
          <div class="flex flex-col border-2 w-2/6">
            <div class="flex text-[12px] text-zinc-400 gap-2">
              <p>adicionar</p>
              <p>fechar</p>
            </div>

            <div class="flex w-full h-full gap-4 border-2">
              <Button class="h-6 rounded-[8px] shadow-zinc-900"> + </Button>
              <Button class="h-6 rounded-[8px] text-[10px] shadow-zinc-900">
                x
              </Button>
              <div class="flex w-100 gap-2 cursor-pointer">
                <i class="fa-solid fa-eye"></i>
                <p class="text-[12px]">Visualizar</p>
              </div>
            </div>
          </div>
        </div> -->
        <!--  <div class="flex w-100 bg-zinc-700 rounded-[8px] h-12 shadow-zinc-900">
          conteudo 2
        </div>
        <div class="flex w-100 bg-zinc-700 rounded-[8px] h-12 shadow-zinc-900">
          conteudo 2
        </div> -->
      </div>
    </main>
    <aside class="w-72 flex flex-col items-center pt-6">
      <div class="w-full h-4/5 rounded-[24px] bg-zinc-800">
        <div class="flex flex-col h-[21rem] items-center">
          <p class="pt-2">Solicitações desenvolvimento</p>
          <div>
            <div class="flex gap-2 p-2">
              <popoverTeste
                dataTitulo="Data inicio"
                isStart="true"
                @dataInicio="recebeDatainicio"
              />

              <popoverTeste
                dataTitulo="Data Final"
                isStart="false"
                @dataFim="recebeDataFim"
              />
            </div>
            <Select>
              <SelectTrigger class="w-48 ml-2 h-8 bg-zinc-900 rounded-[12px]">
                <SelectValue placeholder="Status solicitação" />
              </SelectTrigger>
              <SelectContent class="bg-zinc-900 w-48 text-white">
                <SelectGroup>
                  <SelectItem c value="aberto"> Aberto </SelectItem>
                  <SelectItem c value="pendente"> Pendentes </SelectItem>
                  <SelectItem c value="fenchado"> Fechado </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div
            class="flex flex-col gap-2 items-center item-center w-100 h-100 p-2 overflow-auto"
            id="scroll"
          >
            <Card class="bg-zinc-700 w-full min-h-24 p-2 overflow-hidden">
              <p class="text-[12px]">
                <span class="text-zinc-300 text-[14px]">Titulo:</span>
                desenvolvimento feautres wms
              </p>
              <p class="text-[12px]">
                <span class="text-[#41b883] text-[14px]">Desenv :</span>
                Guimarães
              </p>
              <p class="text-[12px]">
                <span class="text-bold text-[14px]">Data:</span>
                20/02/1994
              </p>
              <p class="text-[12px]">
                <span class="text-bold text-[14px]">Status:</span>
                Aberto
              </p>
            </Card>
            <Card class="bg-zinc-700 w-full min-h-24 p-2">
              <p class="text-[12px]">
                <span class="text-zinc-300 text-[14px]">Titulo:</span>
                desenvolvimento feautres wms
              </p>
              <p class="text-[12px]">
                <span class="text-[#41b883] text-[14px]">Desenv :</span>
                Guimarães
              </p>
              <p class="text-[12px]">
                <span class="text-bold text-[14px]">Data:</span>
                20/02/1994
              </p>
              <p class="text-[12px]">
                <span class="text-bold text-[14px]">Status:</span>
                Aberto
              </p>
            </Card>
            <Card class="bg-zinc-700 w-full min-h-24">cards aqui</Card>
            <Card class="bg-zinc-700 w-full min-h-24">cards aqui</Card>
          </div>
        </div>

        <div
          class="w-100 mt-4 flex flex-col items-center gap-2 justify-center p-4"
        >
          <p class="text-zinc-300 text-[16px]">Total em meses</p>
          <VisXYContainer
            height="180px"
            :margin="{ left: 20, right: 20 }"
            :data="data"
          >
            <VisStackedBar
              :x="(d: any, i: any) => i"
              :y="(d: any) => d.total"
              color="#41b883"
              :rounded-corners="4"
              :bar-padding="0.15"
            />
            <VisAxis
              type="x"
              :num-ticks="data.length"
              :tick-format="(index: number) => data[index]?.name"
              :grid-line="false"
              :tick-line="false"
              color="#888888"
            />
            <VisAxis
              type="y"
              :grid-line="false"
              :tick-line="false"
              :domain-line="false"
              color="#888888"
            />
          </VisXYContainer>
        </div>
      </div>
    </aside>
  </section>
</template>

<style scooped>
#scroll::-webkit-scrollbar {
  width: 8px;
}

#scroll::-webkit-scrollbar-track {
  background: rgb(39 39 42);
}
#scroll::-webkit-scrollbar-thumb {
  background-color: rgb(82 82 91); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  /* creates padding around scroll thumb */
}
</style>
