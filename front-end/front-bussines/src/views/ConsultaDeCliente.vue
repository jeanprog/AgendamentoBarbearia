<template class="body-clientes">
  <HeaderVoltar :title="titlepage" />

  <div class="w-100 h-100 border">
    <div class="w-100 h-30 flex flex-col align-center">
      <v-select
        class="mt-2 w-50 rounded"
        label="Selecione o campo da busca"
        :items="['nome', 'empresa', 'telefone']"
        bg-color="#1E1E26"
        :elevation="12"
        density="compact"
        v-model="tipoBusca"
      ></v-select>
      <div class="relative w-50 h-16 items-center">
        <Input
          id="search"
          type="text"
          placeholder="Buscar Clientes"
          class="pl-10 border-[1px] border-zinc-400 bg-zinc-900 rounded-lg"
          v-model="clienteBusca"
          @input="filteredClientes"
          bg-color="#1E1E26"
        />
        <span
          class="absolute start-0 inset-y-0 flex text-white items-center justify-center px-2"
        >
          <i
            class="size-12 text-[24px] text-muted-foreground fa-brands fa-searchengin"
          ></i>

          <!-- <Search class="size-6 text-muted-foreground" /> -->
        </span>
      </div>
      <!--  <Input
        class="w-50 h-16 border-[1px] border-zinc-400 bg-zinc-900 rounded-lg"
        placeholder="Buscar Clientes"
        v-model="clienteBusca"
        @input="filteredClientes"
        bg-color="#1E1E26"
      ></Input> -->
    </div>

    <!-- <div class="container-cards">
      <div class="scrollable-container">
        <v-card
          class="card-customize"
          max-width="600"
          color="#67159C"
          v-for="(cliente, index) in clientes"
          :key="index"
          
          @click="iniciaChamado(cliente)"
        >
          <v-card-item>
            <div>
              <div class="text-card">
                <span class="label-card">Nome:</span> {{ cliente.nome }}
              </div>
              <div class="text-card">
                <span class="label-card">Telefone:</span> {{ cliente.telefone }}
              </div>
              <div class="text-card">
                <span class="label-card">Empresa:</span> {{ cliente.empresa }}
              </div>
            </div>
          </v-card-item>
          <div class="btns-card">
            <v-btn color="#E82D92" class="botaoCard">
              <icon
                id="icon-cards"
                color="#E82D92"
                class="fa-brands fa-whatsapp"
                style="font-size: 20px; color: #e82d92"
              >
              </icon>
            </v-btn>
            <v-btn
              color="#E82D92"
              class="botaoCard"
              @click="redirecionarCadastroDeCliente(cliente)"
            >
              <icon
                id="icon-cards"
                class="fa-solid fa-pen"
                style="font-size: 24px; color: #e82d92"
              ></icon>
            </v-btn>
            <v-btn color="#E82D92" class="botaoCard">
              <icon
                id="icon-cards"
                class="fa-solid fa-users-gear"
                style="font-size: 24px; color: #e82d92"
              ></icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div> -->
    <div class="mt-10">
      <v-card class="mx-auto ml-40" max-width="700" :elevation="8">
        <v-card-item class="bg-indigo">
          <v-card-title> LISTA DE CLIENTES </v-card-title>

          <template v-slot:append>
            <v-btn color="white" icon="fa-solid fa-user" size="small"></v-btn>
          </template>
        </v-card-item>

        <v-card-text class="pt-4 bg-grey-darken-4">
          Clicando em um Cliente, inicie um novo chamado
        </v-card-text>

        <v-divider></v-divider>

        <v-virtual-scroll :items="clientes" height="300" item-height="50">
          <template v-slot:default="{ item }">
            <v-list-item class="bg-grey-darken-4 border">
              <template v-slot:prepend>
                <v-avatar class="text-white" size="40">
                  <i class="fa-solid fa-user"></i>
                </v-avatar>
              </template>

              <v-list-item-title
                class="cursor-pointer"
                @click="iniciaChamado(item)"
              >
                Empresa: {{ item.empresa }} <br />
                <p class="text-[12px]">Cliente: {{ item.nome }}</p>
                <p class="text-[12px]">Telefone: {{ item.telefone }}</p>
              </v-list-item-title>

              <template v-slot:append>
                <v-btn
                  @click="redirecionarCadastroDeCliente(item)"
                  size="small"
                  variant="tonal"
                >
                  editar Cliente

                  <v-icon color="white" end
                    ><i class="fa-solid fa-pen-to-square"></i>
                  </v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
      <Button class="rounded-lg cursor-pointer"> + solicitação </Button>
    </div>
    <div class="botoesRedirect">
      <v-btn
        :elevation="12"
        class="addCliente"
        color="indigo"
        @click="redirecionarCadastroDeCliente(cliente)"
        >Novo Cliente</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import { router } from '../router'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Input } from '@/components/ui/input'

import todoClientes from '@/services/clientesServices'

/*  import { useRoute } from 'vue-router'  */

interface Cliente {
  id: number
  nome: string
  telefone: string
  empresa: string
}
const store = useStore()
const route = useRoute()
let clienteBusca = ref<string>('')
let clientes = ref<Cliente[]>([])
const titlepage = ref('Consulta de Clientes')
let cliente = ref<Cliente | null>(null)
let tipoBusca = ref<string>('')
let chamado = ref<number>(1)

onMounted(() => {
  listaDeClientes()

  const atualizaChamado = ref(route.query.atualizarChamado)
  console.log(atualizaChamado.value)
})
/* 
 const route = useRoute() */

const iniciaChamado = async (cliente: Cliente) => {
  const novoCliente = cliente
  console.log(novoCliente)
  await store.dispatch('atualizarCliente', novoCliente)

  router.push({ name: 'CadastroDeServico', query: { abrirModal: 1 } })
}

const listaDeClientes = async () => {
  const response = await todoClientes()
  if (response) {
    clientes.value = response
  }
}

const filteredClientes = () => {
  if (clienteBusca.value.trim() === '') {
    // Se o campo de busca estiver vazio, atribui a lista original de clientes
    listaDeClientes()
  } else {
    // Caso contrário, realiza o filtro
    if (tipoBusca.value === '' || tipoBusca.value === 'nome') {
      const filtro = clientes.value.filter((cliente) => {
        return cliente.nome
          .toLowerCase()
          .includes(clienteBusca.value.toLowerCase())
      })
      clientes.value = filtro
      console.log(filtro)
      console.log('case nome e default')
    } else if (tipoBusca.value === 'empresa') {
      const filtro = clientes.value.filter((cliente) => {
        return cliente.empresa
          .toLowerCase()
          .includes(clienteBusca.value.toLowerCase())
      })
      clientes.value = filtro
      console.log(filtro)
      console.log('case empresa')
    } else if (tipoBusca.value === 'telefone') {
      console.log('case telefone')
      const filtro = clientes.value.filter((cliente) => {
        return cliente.telefone
          .toLowerCase()
          .includes(clienteBusca.value.toLowerCase())
      })
      clientes.value = filtro
      console.log(filtro)
    }
  }
}

const redirecionarCadastroDeCliente = (cliente: Cliente | null = null) => {
  // Verifica se o cliente é válido antes de redirecionar
  if (cliente) {
    // Lógica para redirecionar para a página de cadastro de cliente
    router.push({
      name: 'CadastroDeCliente',
      query: {
        id: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        empresa: cliente.empresa
      }
    })

    console.log(
      'consulta',
      cliente.nome,
      cliente.telefone,
      cliente.id,
      cliente.empresa
    )
  } else {
    router.push({ name: 'CadastroDeCliente' })
  }
  /*
  router.push({ name: 'CadastroDeCliente' }) */
}
</script>

<style scoped>
.body-clientes {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh !important;
  overflow: hidden !important;
}

.bodyapp {
}
.container-cards {
  width: 100%;
  height: 100%vh;
  overflow-y: auto;
  border-radius: 8px;
  background: #19181f;
  display: flex !important;

  align-items: center !important;
  justify-content: center !important;
}
.card-customize {
  margin-top: 2%;

  background: none;
  width: 86%;
  min-height: 30%;
  display: flex;

  border: solid 2px;
}
.scrollable-container {
  max-height: 100%; /* Garante que o conteúdo não ultrapasse a altura máxima da div pai */
  overflow-y: auto !important;
  width: 100%;
  height: 100% !important;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
}
.searchbar {
  width: 100% !important;

  height: 12vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: solid 2px;
}
.inputFiltro {
  margin-top: 1%;
  margin-right: 2%;
  height: 8vh !important;
  border-radius: 8px !important;
}
.inputSearch {
  border-radius: 8px !important;
  max-width: 50vw !important;
}
.container-botao {
  width: 100%;
  justify-content: space-around !important;

  display: flex;
  padding: 2%;
}
.botaoCard {
  background-color: #19181f !important;
  border: solid 1px !important;
  border-color: #e82d92 !important;
  width: 20% !important;
  margin: 2%;
}

.text-card {
  color: aliceblue;
  font-size: 12px !important;
}

.label-card {
  font-weight: bold;
  font-size: 14px;
}
.botoesRedirect {
  width: 100%;

  display: flex;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
}

.addCliente {
  border: none;
  width: 50%;
  background-color: white;
  margin: 2%;
  border-radius: 8px;
  height: 42px !important;
}
.btns-card {
  width: 100%;

  display: flex;
  justify-content: space-around;
}
#icon-cards {
  color: white !important ;
  font-size: 20px !important;
}
</style>
