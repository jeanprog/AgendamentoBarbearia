<template>
  <HeaderVoltar :title="titlepage" />
  <div class="bodyCliente">
    <v-form class="formNewCliente" @submit.prevent>
      <v-text-field
        v-model="nome"
        label="Digite nome do cliente"
      ></v-text-field>
      <v-text-field
        v-model="empresa"
        label="Digite nome do empresa"
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
      <v-btn type="submit" class="btn-submit" @click="submitForm"
        >Cadastrar e iniciar chamado</v-btn
      >
    </v-form>
  </div>
  <tabelaChamados />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import HeaderVoltar from '../components/HeaderVoltar.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
/* import { router } from '@/router' */
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { router } from '../router'

const route = useRoute()

let nome = ref<string>('')
let telefone = ref<string>('')
const titlepage = ref('Cadastro de Clientes')
let editCliente = ref<boolean>(false)
let id = ref<number>()
let empresa = ref<string>('')
const user = ref(route.params.user)

/* 
interface cliente  { 
   nome: string ; 
   cliente: string ; 
} */

const notify = () => {
  toast('Cadastrada com sucesso', {
    autoClose: 1000
  }) // ToastOptions
}

const notifyEdit = () => {
  toast('Alterado com sucesso', {
    autoClose: 2000
  })
}

onMounted(() => {
  // Acessar os parâmetros da rota usando route.query
  const route = useRoute()
  nome.value = route.query.nome as string
  telefone.value = route.query.telefone as string
  empresa.value = route.query.empresa as string
  id.value = route.query.id ? parseInt(route.query.id as string, 10) : undefined
  console.log('verificando id', id.value)
  if (nome.value && telefone.value && id.value) {
    console.log('cai aqui')
    editCliente.value = true
  }
  console.log(id.value)
})

const submitForm = async () => {
  let redeId
  const storedData = localStorage.getItem('user')

  if (storedData) {
    // Convertendo a string JSON de volta para um objeto
    const parsedData = JSON.parse(storedData)

    // Acessando as propriedades
    const userName = parsedData.user
    redeId = parsedData.rede
    console.log('teste aqui', userName, redeId)
  }

  const data = {
    nome: nome.value,
    telefone: telefone.value,
    empresa: empresa.value,
    redeId: redeId // trocar por id de config localstorage
  }

  try {
    if (data.nome != '' && data.telefone != '') {
      console.log(editCliente.value)
      if (editCliente.value === true) {
        const data = {
          nome: nome.value,
          telefone: telefone.value,
          empresa: empresa.value,
          redeId: parseInt(redeId) // trocar por id de config localstorage
        }

        const response = await axios.patch(
          `http://192.168.1.108:3000/clientes/${id.value}`,
          data
        )
        notifyEdit()
        router.push({
          name: 'ConsultaDeCliente',
          params: { user: user.value }
        })
        router.push({ name: 'ConsultaDeCliente', params: { user: user.value } })
        console.log(response.data)
        nome.value = ''
        telefone.value = ''
      } else {
        const data = {
          nome: nome.value,
          telefone: telefone.value,
          empresa: empresa.value,
          redeId: parseInt(redeId)
        }
        console.log(data)
        const response = await axios.post(
          'http://192.168.1.108:3000/clientes',
          data
        )

        nome.value = ''
        telefone.value = ''
        empresa.value = ''
        notify()
        router.push({ name: 'ConsultaDeCliente', params: { user: user.value } })

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
  margin: 12% 2% 2% 2%;
  width: 60%;
  color: white;
}

.btn-submit {
  background-color: indigo;
  color: white;
  margin: 2%;
  width: 100%;
}
</style>
