<template>
  <body class="body-dashboard">
    <div class="container-form">
      <h1 class="text-indigo-600 font-bold text-[28px] p-4 scroll-mt-80">
        Registro de Chamados
      </h1>
      <form @submit.prevent="handleSubmit" class="w-96 p-8">
        <div class="flex flex-col gap-4">
          <label for="login" class="form-label text-zinc-600">Login</label>
          <input
            class="text-black bg-white p-2"
            type="text"
            id="login"
            v-model="login"
            required
          />

          <label for="senha" class="form-label text-zinc-600">Senha</label>
          <input
            type="password"
            id="senha"
            v-model="password"
            class="text-black bg-white p-2"
            required
          />
        </div>
        <Button type="submit" class="bg-indigo-400 w-full rounded-sm mt-4"
          >Entrar</Button
        >
      </form>

      <!--   <v-form fast-fail @submit.prevent="handleSubmit" class="form-login">
        <v-text-field v-model="login" label="Login"></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>

        <v-btn type="submit" block class="text-none" color="#4c0677"
          >Acessar painel</v-btn
        >
      </v-form> -->
      <h4 class="text-black">Redefina sua senha aqui</h4>
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
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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
      const response = await axios.post(
        `http://${import.meta.env.VITE_IP_URL}:3000/auth-user`,
        data
      )

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
  height: 50vh;

  width: 30%;
  background-color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;

  flex-direction: column;
}
/* .form-login {
  display: flex;
  flex-direction: column;
  color: black;

  width: 100%;
  padding: 24px;
} */
.body-dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #818cf8;
}

.redifinir-senha {
  margin-top: 24px;
}
#login {
  border: 1px solid #a1a1aa !important;
  border-radius: 8px;
  height: 48px;
  width: 100%;
}

#senha {
  border: 1px solid #a1a1aa !important;
  border-radius: 8px;
  height: 48px;
  width: 100%;
}
</style>
