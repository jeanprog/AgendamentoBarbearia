<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderVoltar from '../../components/HeaderVoltar.vue'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { getVersoes, postVersoes } from '../../services/versoesServices.ts'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import popoverTeste from '../../components/popoverTeste.vue'
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'

interface versao {
  id: number
  aplicativo: string
  versao: string
  datCri: Date
}

let titlepage = ref('Solicitações desenvolvimento')
const dateStart = ref<Date>()
const dateEnd = ref<Date>()
const listVersoes = ref<versao[]>([])
const valueVersao = ref<String>('')
const valueApp = ref<String>('')

const data = [
  { name: 'Jan', total: 3 },
  { name: 'Feb', total: 50 },
  { name: 'Mar', total: 20 },
  { name: 'Apr', total: 10 },
  { name: 'May', total: 40 },
  { name: 'Jun', total: 2 }
]

const maxY = 60

onMounted(() => {
  todoVersoes()
})

const todoVersoes = async () => {
  try {
    const response = await getVersoes()

    listVersoes.value = response.data
  } catch (error) {
    console.error(error) // Mostra erros, caso ocorram
  }
}

const teste = () => {
  console.log('teste')
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
      aplicativo: valueApp.value,
      versao: valueVersao.value,
      datCri: new Date()
    }
    const submitVersao = await postVersoes(data)
  } else {
    console.log('toast preencha todos os campos ! ')
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
        <div
          class="flex flex-col gap-2 h-52 overflow-auto hover:overflow-scroll pt-2"
          id="scroll"
        >
          <div
            v-for="(versao, index) in listVersoes"
            :key="index"
            class="flex bg-zinc-700 w-60 rounded-lg h-8 hover:bg-customGreen"
          >
            <Dialog>
              <DialogTrigger
                class="flex items-center gap-16 w-60 shadow-zinc-800"
              >
                <p class="w-40 text-[12px]">{{ versao.aplicativo }}</p>
                <i class="fa-solid fa-eye"></i>
              </DialogTrigger>
              <DialogContent class="bg-zinc-900 text-white rounded-lg">
                <DialogHeader>
                  <DialogTitle>{{ versao.aplicativo }}</DialogTitle>
                  <DialogDescription class="flex flex-col">
                    <div class="flex justify-content gap-6">
                      <p class="font-bold">VERSÃO:</p>
                      <P>{{ versao.versao }}</P>
                    </div>
                    <div class="flex gap-6">
                      <p class="font-bold">DATA:</p>
                      <P>{{ versao.datCri }}</P>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Dialog class="">
          <DialogTrigger>
            <Button
              variant="outline"
              class="bg-customGreen hover:bg-zinc rounded-lg shadow-zinc-800 hover:bg-zinc-900"
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
                class="pl-10 bg-zinc-800 rounded-[12px] text-zinc-600 w-70 text-white"
              />
              <Input
                type="text"
                v-model="valueVersao"
                placeholder="Versao"
                class="pl-10 bg-zinc-800 rounded-[12px] text-zinc-600 w-70 text-white"
              />
              <Button
                class="rounded-lg bg-indigo-800 hover:bg-indigo-600"
                @click="cadastrarVersao()"
              >
                Cadastrar
              </Button>
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
        class="flex flex-col w-100 h-3/5 bg-zinc-800 rounded-[24px] gap-2 py-4 items-center"
      >
        <div class="text-[14px] text-zinc-300 w-full flex justify-center">
          Historico Soluções de versão
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
        <div class="w-100 h-96 p-2 overflow-x-auto">
          <Table class="w-100">
            <TableHeader class="top-0">
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
            <tableBody class="flex flex-col gap-2">
              <TableRow
                class="flex justify-between items-center gap-2 text-[12px] flex bg-zinc-700 rounded-[8px] h-16 shadow-zinc-900 pl-2 pr-2"
              >
                <TableCell class=""> Guimarães </TableCell>

                <TableCell class=""> Back-office </TableCell>
                <TableCell> 3.4.2.1 </TableCell>
                <TableCell class="">
                  emissor valor fixo <br />
                  de icms em 2 reais
                </TableCell>
                <TableCell class=""> 20/02/1994 </TableCell>
                <TableCell>
                  <Button class="h-6 rounded-[8px] text-[10px] shadow-zinc-900"
                    >+</Button
                  >
                </TableCell>
                <TableCell>
                  <Button
                    class="h-6 rounded-[8px] text-[10px] shadow-zinc-900 hover:bg-zinc-900"
                    >x</Button
                  >
                </TableCell>
                <TableCell class="text-[24px]">
                  <i class="fa-solid fa-eye"></i>
                </TableCell>
              </TableRow>
              <TableRow
                class="flex justify-between items-center gap-6 text-[12px] flex bg-zinc-700 rounded-[12px] h-16 shadow-zinc-900 pl-2 pr-2"
              >
                <TableCell class=""> doutor </TableCell>
                <TableCell class=""> Back-office </TableCell>
                <TableCell> 2.4.3.1 </TableCell>

                <TableCell class="flex justify-center">
                  emissor valor fixo<br />
                  de icms em 2 reais
                </TableCell>
                <TableCell class=""> 20/02/1994 </TableCell>
                <TableCell>
                  <Button class="h-6 rounded-[8px] text-[10px] shadow-zinc-900"
                    >+</Button
                  >
                </TableCell>
                <TableCell>
                  <Button
                    class="h-6 rounded-[8px] text-[10px] shadow-zinc-900 hover:bg-zinc-900"
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
              :x="(d, i) => i"
              :y="(d) => d.total"
              color="#41b883"
              :rounded-corners="4"
              :bar-padding="0.15"
            />
            <VisAxis
              type="x"
              :num-ticks="data.length"
              :tick-format="(index) => data[index]?.name"
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
