<template>
  <!--   <div class="w-full justify-center flex mt-2">
      <TableCaption class="mt-0 w-full text-white"
        >Todos os chamados do dia 09/02/2024</TableCaption
      >
    </div> -->
  <!-- <Table
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
   -->
  <Table
    class="flex flex-col text-white text-[12px] rounded-lg shadow-zinc-600"
    id="table"
  >
    <!--  <TableHeader class="flex items-center absolute  border -top-0 bg-zinc-800">
      <TableRow class="fixed flex items-center gap-4 max-h-8 bg-zinc-800">
        <TableHead class="w-24"> Empresa </TableHead>
        <TableHead class="w-24">Funcionário</TableHead>
        <TableHead class="w-24">Sistema</TableHead>
        <TableHead class="w-24"> Data de Abertura</TableHead>
        <TableHead class="w-24">Status</TableHead>
        <TableHead class="w-24">Ações</TableHead>
      </TableRow>
    </TableHeader> -->
    <TableBody class="flex flex-col border-white">
      <TableRow
        id="tablerow"
        class="flex max-h-16 bg-zinc-700 rounded-lg mt-2 gap-4 items-center"
        v-for="chamado in listaResultado"
        :key="chamado.id"
      >
        <!--  <TableRow
          v-if="listaFiltrada.length > 0"
          class=""
          v-for="chamado in props.listaFiltrada"
          :key="chamado.id"
        ></TableRow> -->
        <TableCell class="w-24 mt-2">
          {{ chamado.Empresa }}
        </TableCell>
        <TableCell class="w-24">{{ chamado.Cliente }}</TableCell>

        <TableCell class="w-24">{{ chamado.sistema }}</TableCell>
        <TableCell class="text-right"> {{ chamado.dAbertura }} </TableCell>
        <TableCell
          :class="getStatusClasses(chamado.status)"
          class="w-24 border-2 rounded-lg font-bold h-8 flex justify-center items-center"
          >{{ chamado.status }}</TableCell
        >
        <div class="flex mt-1 gap-2">
          <Button
            class="bg-indigo-800 rounded-lg text-white hover:bg-indigo-600 shadow-zinc-800"
            @click="handleEditar(chamado)"
            ><i class="fa-solid fa-pen-to-square"></i
          ></Button>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                @click="capturaItem(chamado)"
                variant="outline"
                class="bg-indigo-800 rounded-lg text-white hover:bg-indigo-600 shadow-zinc-800"
              >
                <i class="fa-solid fa-eye"></i>
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] bg-zinc-900 text-white">
              <DialogHeader>
                <DialogTitle>
                  <span class="text-zinc-400 text-[16px] font-bold"
                    >Empresa:
                  </span>
                  <br />{{ chamado.Empresa }}</DialogTitle
                >
                <DialogDescription>
                  <span class="text-zinc-400 text-[16px] font-bold"
                    >Titulo</span
                  >
                  <p>{{ chamado.titulo }}</p>
                </DialogDescription>
              </DialogHeader>
              <div class="flex flex-col py-4">
                <p>
                  <span class="text-zinc-400 font-bold">Funcionário:</span>
                  {{ chamado.Cliente }}
                </p>
                <p>
                  <span class="text-zinc-400 font-bold">sistema:</span>
                  {{ chamado.sistema }}
                </p>
                <p>
                  <span class="text-zinc-400 font-bold">Status:</span>
                  {{ chamado.status }}
                </p>
                <p>
                  <span class="text-zinc-400 font-bold">prioridade:</span>
                  {{ chamado.prioridade }}
                </p>
                <p>
                  <span class="text-zinc-400 font-bold">Abertura:</span>
                  {{ chamado.dAbertura }}
                </p>
                <p>
                  <span class="text-zinc-400 font-bold">Fechamento:</span>
                  {{ chamado.dFechamento }}
                </p>
              </div>
              <DialogFooter> </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableRow>
      <div class="h-4"></div>
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
const recarregar = ref<Boolean>(false)
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import getStatusClasses from '@/utils/coresDiv'
/* const mensagem = ref(props.mensagem) */
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

/* interface Chamado {
  clienteId: number
  statusChamadoAtual: number

  Status: string
  dAbertura: string
  sistema: string
  Empresa: string
}

const chamados = ref<Chamado[]>([]) */
const props = defineProps(['listaFiltrada', 'itensTabela'])
watch(
  () => props.listaFiltrada,
  (novaListaFiltrada) => {
    listaResultado.value = novaListaFiltrada
    console.log(chamadosData.value)
  }
)
watch(
  () => props.itensTabela,
  (novaLista) => {
    listaResultado.value = novaLista
  }
)

onMounted(() => {
  obterDadosAuthLogin() //refatorar essa chamado se repete em muitos componentes

  console.log('Valor da listaFiltrada:', props.listaFiltrada)

  listaTabela()
  /* console.log(chamadosData.value)
  if (chamadosData.value) {
    listaTabela()
  } */
  /*   obterDadosTratadosChamado() */
  /*  console.log(props.itensTabela, 'teste aqu') */
})

const capturaItem = (chamado: any) => {
  console.log(chamado, 'capturei ')
}

const listaTabela = () => {
  listaResultado.value = props.itensTabela
  console.log('executou')
  console.log('saida chamados data ', listaResultado.value)
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
</script>

<style scoped>
#table {
  max-width: 90%;
  overflow: hidden;
}

#table::-webkit-scrollbar {
  width: 4px;
}

#table::-webkit-scrollbar-track {
  background: #19181f;
}
#table::-webkit-scrollbar-thumb {
  background-color: #3f51b5; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  /* creates padding around scroll thumb */
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
