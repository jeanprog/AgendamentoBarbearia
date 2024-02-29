<template>
  <body class="body-dashboard">
    <div class="container-form">
      <h2>Gerenciador de tarefas</h2>
      <v-form fast-fail @submit.prevent="handleSubmit" class="form-login">
        <v-text-field v-model="login" label="Login"></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>

        <v-btn type="submit" block class="text-none" color="#4c0677"
          >Acessar painel</v-btn
        >
      </v-form>
      <h4 class="redifinir-senha">Redefina sua senha aqui</h4>
    </div>
  </body>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { router } from '../router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

/* import jwt from 'jsonwebtoken';
 */
let login = ref<string>('')
let password = ref<string>('')

/* const notifyServidor = () => {
  toast('Error no servidor', {
    autoClose: 1000,
  })
} */

const notifyCredencaisInvalidas = () => {
  toast('usuários e senhas invalidas', {
    autoClose: 1000
  })
}

const notifyCamposNulos = () => {
  toast('Os campos não podem ser vazios', {
    autoClose: 1000
  })
}

const handleSubmit = async () => {
  console.log(login.value, password.value)

  const data = {
    nameUser: login.value,
    password: password.value
  }

  if (data.nameUser && data.password) {
    try {
      // Realize a solicitação POST com o Axios
      const response = await axios.post('http://192.168.1.108:3000/auth-user', data)

      // A solicitação foi bem-sucedida, você pode processar a resposta aqui
      console.log('Resposta do servidor:', response.data)

      const token = response.data.access_token
      const decoded: { nameUser: string; idRede: number; idUser: number } =
        jwtDecode(token)

      console.log(decoded.nameUser, decoded.idRede, decoded.idUser)

      let user = decoded.nameUser
      let rede = decoded.idRede
      let idUser = decoded.idUser

      //pra teste salvando no local storage

      const jsonData = {
        user: user,
        rede: rede,
        id: idUser
      }
      localStorage.setItem('user', JSON.stringify(jsonData))

      router.push({ name: 'dashboard', params: { user, rede } })
    } catch (error) {
      // Lidar com erros de rede ou outros erros
      console.error('Erro na solicitação:', error)
      notifyCredencaisInvalidas()
      return
    }
  } else {
    notifyCamposNulos()
  }
}
</script>

<style scoped>
.container-form {
  height: 70vh;

  width: 80%;
  background-color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.form-login {
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 24px;
}
.body-dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f0549;
}

.redifinir-senha {
  margin-top: 24px;
}
</style>
