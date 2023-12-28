<script setup lang="ts">
/* import { router } from '../../router' */
import HeaderVoltar from '../../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const titlepage = ref('Novo Agendamento')

let clientes = ref<{ nome: string; telefone: string }[]>([])
let clienteBusca = ref<string>('')
let buscaServico = ref<string>('')
let servicos = ref<{ nome: string; duracao: string; preco: number }[]>([])

const filteredClientes = async () => {
  if (clienteBusca.value.trim() === '') {
    // Se o campo de busca estiver vazio, atribui a lista original de clientes
    clientes.value.splice(0, clientes.value.length)
  } else {
    // Caso contrário, realiza o filtro
    const response = await axios.get('http://localhost:3000/clientes')

    const filtro = response.data.filter((cliente: { nome: string }) => {
      return cliente.nome
        .toLowerCase()
        .includes(clienteBusca.value.toLowerCase())
    })
    clientes.value = filtro
    console.log(filtro)
  }
}

const filtroServico = async () => {
  if (buscaServico.value.trim() === '') {
    // Se o campo de busca estiver vazio, atribui a lista original de clientes
    servicos.value.splice(0, servicos.value.length)
  } else {
    // Caso contrário, realiza o filtro
    const response = await axios.get('http://localhost:3000/servicos')
    const filtro = response.data.filter((servico: { nome: string }) => {
      return servico.nome
        .toLowerCase()
        .includes(buscaServico.value.toLowerCase())
    })
    servicos.value = filtro
    console.log(servicos.value)
  }
}

onMounted(() => {})
</script>

<template>
  <HeaderVoltar :title="titlepage" />
  <div class="bodyAgendamento">
    <div class="pesquisa">
      <label class="selecionaCliente">Selecione o cliente</label>
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
      <div class="clientes-itens">
        <v-list-item
          v-for="(cliente, index) in clientes"
          :key="index"
          :title="'Nome: ' + cliente.nome"
          :subtitle="'Telefone: ' + cliente.telefone"
        ></v-list-item>
      </div>
    </div>
    <div class="pesquisa">
      <label class="selecionaCliente">Selecione o servico</label>
      <v-text-field
        class="inputSearch"
        density="compact"
        variant="solo"
        label="Buscar clientes"
        append-inner-icon="fa-brands fa-searchengin"
        single-line
        hide-details
        v-model="buscaServico"
        @input="filtroServico"
        bg-color="#1E1E26"
      ></v-text-field>
      <div class="clientes-itens">
        <v-list-item
          v-for="(servico, index) in servicos"
          :key="index"
          :title="'Nome: ' + servico.nome"
          :subtitle="
            'Duração: ' + servico.duracao + ' | Preço: ' + servico.preco
          "
        ></v-list-item>
      </div>
    </div>
  </div>

  <div class="pesquisa">
    <label class="selecionaCliente">Selecione a data</label>
    <v-text-field
      append-inner-icon="fa-solid fa-calendar"
      class="input-date"
      type="date"
      single-line
      hide-details
      bg-color="#1E1E26"
      density="compact"
      variant="solo"
    ></v-text-field>
  </div>
</template>

<style scoped>
.input-date .v-input__icon--append-outer {
  display: none; /* Torna o ícone nativo invisível */
}
.pesquisa {
  width: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2%;
}
.inputSearch {
  border-radius: 8px !important;
  min-width: 100%;
}
.selecionaCliente {
  color: white;
}

.clientes-itens {
  color: white;
}
.date-calendar {
  font-size: 0.00001rem !important;
}
.input-date {
  color: white;
  width: 100%;
}

.input-date .v-input__icon[style*='icon'] {
  color: white !important;
}
</style>
