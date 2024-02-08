<template class="body-clientes">
  <HeaderVoltar :title="titlepage" />

  <div class="bodyapp">
    <div class="searchbar">
      <v-select
        class="inputFiltro"
        label="Selecione o campo da busca"
        :items="['nome', 'empresa', 'telefone']"
        bg-color="#1E1E26"
        density="compact"
        v-model="tipoBusca"
      ></v-select>
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
    </div>
    <div class="botoesRedirect">
      <v-btn
        class="addCliente"
        color="#67159C"
        @click="redirecionarCadastroDeCliente(cliente)"
        >Novo Cliente</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { router } from '../router'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { atualizarChamado } from '@/services/RequestsChamados'
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

const iniciaChamado = (cliente: Cliente) => {
  const novoCliente = cliente
  console.log(novoCliente)
  store.dispatch('atualizarCliente', novoCliente)

  router.push({ name: 'CadastroDeServico', query: { abrirModal: 1 } })
}

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
  height: 60vh;
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
  width: 100%;

  height: 12vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
.inputFiltro {
  max-width: 30vw !important;
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
