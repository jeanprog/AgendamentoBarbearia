<template class="body-clientes">
  <HeaderVoltar :title="titlepage" />

  <div class="bodyapp">
    <div class="searchbar">
      <v-text-field
        class="inputSearch"
        density="compact"
        variant="solo"
        label="Buscar clientes"
        append-inner-icon="fa-brands fa-searchengin"
        single-line
        hide-details
        v-model="clienteBusca"
        @input="filteredClientes"
        bg-color="#1E1E26"
      ></v-text-field>
    </div>
    <div class="container-cards">
      <div class="scrollable-container">
        <v-card
          class="card-customize"
          max-width="600"
          color="#67159C"
          v-for="(cliente, index) in clientes"
          :key="index"
          variant="outlined"
        >
          <v-card-item>
            <div>
              <div class="text-card">
                <span class="label-card">Nome:</span> {{ cliente.nome }}
              </div>
              <div class="text-card">
                <span class="label-card">Telefone:</span> {{ cliente.telefone }}
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
                class="fa-solid fa-calendar"
                style="font-size: 24px; color: #e82d92"
              ></icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
    <div class="botoesRedirect">
      <v-btn
        class="addCliente"
        color="#67159C"
        @click="redirecionarCadastroDeCliente(cliente)"
        >Novo Cliente</v-btn
      >
      <v-btn class="addCliente" color="#E82D92">agendar</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { router } from '../router'
/* import { useRoute } from 'vue-router' */

interface Cliente {
  id: number
  nome: string
  telefone: string
}

let clienteBusca = ref<string>('')
let clientes = ref<Cliente[]>([])
const titlepage = ref('Consulta de Clientes')
let cliente = ref<Cliente | null>(null)

/* 
 const route = useRoute()
  const user = ref(route.params.user)   */

const listaDeClientes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/clientes')

    console.log(response.data)
    clientes.value = response.data // Assumindo que a resposta contém um array de clientes
  } catch (error) {
    console.error('Erro ao obter a lista de clientes:', error)
  }
}

const filteredClientes = () => {
  if (clienteBusca.value.trim() === '') {
    // Se o campo de busca estiver vazio, atribui a lista original de clientes
    listaDeClientes()
  } else {
    // Caso contrário, realiza o filtro
    const filtro = clientes.value.filter((cliente) => {
      return cliente.nome
        .toLowerCase()
        .includes(clienteBusca.value.toLowerCase())
    })
    clientes.value = filtro
    console.log(filtro)
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
        telefone: cliente.telefone
      }
    })

    console.log('consulta', cliente.nome, cliente.telefone, cliente.id)
  } else {
    router.push({ name: 'CadastroDeCliente' })
  }
  /* 
  router.push({ name: 'CadastroDeCliente' }) */
}

onMounted(() => {
  listaDeClientes()
})
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
  height: 60vh;
  overflow-y: auto;
  border-radius: 8px;
  background: #19181f;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center !important;
}
.card-customize {
  margin: 2%;

  background: none;
  width: 96%;

  border: solid 2px;
}
.scrollable-container {
  max-height: 100%; /* Garante que o conteúdo não ultrapasse a altura máxima da div pai */
  overflow-y: auto;
  width: 100%;
}
.searchbar {
  width: 100%;
}
.inputSearch {
  border-radius: 8px !important;
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
  flex-direction: column;
  padding: 2%;
}

.addCliente {
  border: none;
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
