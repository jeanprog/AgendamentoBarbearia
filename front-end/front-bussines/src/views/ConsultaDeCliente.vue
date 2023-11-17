<template>
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
      ></v-text-field>
    </div>
    <v-card
      class="card-customize"
      max-width="600"
      color="indigo-darken-3"
      v-for="(cliente, index) in clientes"
      :key="index"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1"></div>
          <div class="text-h6 mb-1">Nome: {{ cliente.nome }}</div>
          <div class="text-caption">Tel: {{ cliente.telefone }}</div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn> <icon class="fa-brands fa-whatsapp"> </icon> </v-btn>
        <v-btn> <icon class="fa-solid fa-pen"></icon> </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface Cliente {
  nome: string
  telefone: string
}

let clienteBusca = ref<string>('')
let clientes = ref<Cliente[]>([])
const titlepage = ref('Consulta de Clientes')

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

onMounted(() => {
  listaDeClientes()
})
</script>

<style scoped>
.bodyapp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-customize {
  margin: 2%;
  width: 90%;
}
.searchbar {
  width: 90%;
}
.inputSearch {
  border-radius: 8px !important;
}
</style>
