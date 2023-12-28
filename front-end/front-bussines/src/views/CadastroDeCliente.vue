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
import { onMounted, ref } from 'vue'

import HeaderVoltar from '../components/HeaderVoltar.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
/* import { router } from '@/router' */
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

let nome = ref<string>('')
let telefone = ref<string>('')
const titlepage = ref('Cadastro de Clientes')
let editCliente = ref<boolean>(false)
let id = ref<number>()

/* 
interface cliente  { 
   nome: string ; 
   cliente: string ; 
} */

const notify = () => {
  toast('Cadastrada com sucesso', {
    autoClose: 1000,
  }) // ToastOptions
}

onMounted(() => {
  // Acessar os parâmetros da rota usando route.query
  const route = useRoute()
  nome.value = route.query.nome as string
  telefone.value = route.query.telefone as string
  id.value = route.query.id ? parseInt(route.query.id as string, 10) : undefined
  console.log('verificando id', id.value)
  if (nome.value && telefone.value && id.value) {
    console.log('cai aqui')
    editCliente.value = true
  }
  console.log(id.value)
})

const submitForm = async () => {
  const data = {
    nome: nome.value,
    telefone: telefone.value,
    userId: id.value,
  }
  try {
    if (data.nome != '' && data.telefone != '') {
      if (editCliente.value === true) {
        const data = {
          nome: nome.value,
          telefone: telefone.value,
          userId: id.value,
        }

        const response = await axios.patch(
          `http://localhost:3000/clientes/${id.value}`,
          data
        )

        console.log(response.data)
        nome.value = ''
        telefone.value = ''
      } else {
        const data = {
          nome: nome.value,
          telefone: telefone.value,
          userId: 1,
        }
        const response = await axios.post(
          'http://localhost:3000/clientes',
          data
        )

        nome.value = ''
        telefone.value = ''
        notify()

        console.log('Resposta do servidor:', response.data)
      }
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
  color: white;
}

.btn-submit {
  background-color: indigo;
  color: white;
  margin-top: 10%;
  width: 100%;
}
</style>
