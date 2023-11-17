<template>
  <HeaderVoltar :title="titlepage" />
  <div class="bodyCliente">
    <v-form class="formNewCliente" @submit.prevent>
      <v-text-field
        v-model="nome"
        label="Digite nome do cliente"
      ></v-text-field>

      <v-text-field
        v-model="telefone"
        :counter="9"
        error-messages="Apenas numeros são aceitos"
        label="Digite seu telefone"
      ></v-text-field>
      <v-btn type="submit" class="btn-submit" @click="submitForm"
        >Cadastrar</v-btn
      >
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import HeaderVoltar from '../components/HeaderVoltar.vue'
import axios from 'axios'

let nome = ref<string>('')
let telefone = ref<string>('')
const titlepage = ref('Cadastro de Clientes')

const submitForm = async () => {
  const data = {
    nome: nome.value,
    telefone: telefone.value,
    userId: 1,
  }
  try {
    if (data.nome != '' && data.telefone != '') {
      const response = await axios.post('http://localhost:3000/clientes', data)
      nome.value = ''
      telefone.value = ''

      console.log('Resposta do servidor:', response.data)
    } else {
      console.log('preencha todos os campos')
    }
  } catch (error) {
    console.error('Erro na solicitação:', error)
  }
}
</script>

<style scoped>
.bodyCliente {
  display: flex;
  justify-content: center;
  align-items: center;
}
.formNewCliente {
  margin-top: 30%;
  width: 90%;
}

.btn-submit {
  background-color: indigo;
  color: white;
  margin-top: 10%;
  width: 100%;
}
</style>
