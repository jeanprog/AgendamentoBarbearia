import { formToJSON } from 'axios';
<script setup lang="ts">
import { ref } from 'vue'
import HeaderVoltar from '../../components/HeaderVoltar.vue'

let titlepage = ref('Configurações')
let cordefundo = ref('')
let listaDiasFuncionamento = ref<array>([])
const form = ref({
  nome: '',
  diasAbertos: [],
  horarioAbertura: '',
  horarioFechamento: '',
  situacao: '',
  userId: null
})

const diasSemanaOptions = [
  { text: 'Dom', value: 1 },
  { text: 'Seg', value: 2 },
  { text: 'Ter', value: 3 },
  { text: 'Qua', value: 4 },
  { text: 'Qui', value: 5 },
  { text: 'Sex', value: 6 },
  { text: 'Sab', value: 7 }
]
const submitForm = () => {
  // Aqui você pode enviar os dados para o backend, por exemplo, usando uma chamada de API
  console.log('Formulário enviado:', form.value)
}
const isDiaSelected = (dayValue) => {
  return listaDiasFuncionamento.value.includes(dayValue)
}

const toggleDaySelection = (dayValue) => {
  console.log('teste aqui', dayValue)

  const index = listaDiasFuncionamento.value.indexOf(dayValue)

  if (index !== -1) {
    listaDiasFuncionamento.value.splice(index, 1)
  } else {
    listaDiasFuncionamento.value.push(dayValue)
  }

  form.diasAbertos = [...listaDiasFuncionamento.value]
  console.log(form.diasAbertos)
}

const verificaDiaSelecionado = (dayvalue) => {
  /* const result = form.diasAbertos.includes(dayvalue) */
  return console.log('teste aqui', dayvalue)
}
</script>

<template>
  <HeaderVoltar :title="titlepage" />
  <v-container>
    <v-form class="form-config" @submit.prevent="submitForm">
      <v-row class="row-dias">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.nome"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <p>Dias de Funcionamento</p>

          <v-btn
            v-for="(dia, index) in diasSemanaOptions"
            :key="index"
            :value="dia.value"
            v-model="form.diasAbertos"
            multiple
            variant="outlined"
            :class="{
              'btn-selected': isDiaSelected(dia.value),
              'btns-dias': !isDiaSelected(dia.value)
            }"
            @click="toggleDaySelection(dia.value, index)"
          >
            {{ dia.text }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.horarioAbertura"
            label="Horário de Abertura"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.horarioFechamento"
            label="Horário de Fechamento"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-select
            label="Situação da loja"
            :items="['Ativo', 'Inativo']"
          ></v-select>
        </v-col>
      </v-row>

      <v-btn type="submit" color="#e82d92">Salvar</v-btn>
    </v-form>
  </v-container>
</template>

<style scooped>
.form-config {
  color: white;
}
.row-dias {
  width: 100% !important ;
}
.btns-dias {
  display: flex;
  justify-content: space-between;
  background-color: #19181f !important ;
  border-color: #e82d92 !important;
  margin: 1%;
  font-size: 12px !important;
}
.btn-selected {
  background-color: #e82d92 !important; /* ou a cor desejada quando selecionado */
  color: white;
  border-color: #e82d92 !important;
  margin: 1%;
}
</style>
