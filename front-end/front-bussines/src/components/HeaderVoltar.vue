<template>
  <v-app class="cabeçalho">
    <v-app-bar app class="menu-btn">
      <v-btn class="btn-voltar" @click="RedirecionarInicio"> voltar </v-btn>
      <!--  <v-icon :class="{ 'rotated': drawer }" @click="toggleDrawer">{{ drawer ? 'fa-solid fa-xmark' : 'fa-solid fa-bars' }}</v-icon> -->
      <v-titles style="margin-left: 8%"> {{ title }} </v-titles>
    </v-app-bar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { router } from '../router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const route = useRoute()
const props = defineProps(['title'])
console.log(props) // posso utilziar o ts ignore pra não reclamar deste aviso .

const user = ref(route.params.user)

const RedirecionarInicio = () => {
  router.push({ name: 'dashboard', params: { user: user.value } })
  console.log('evento acionado')
  store.commit('limpaValores')
}
</script>

<style scoped>
.menu-btn {
  justify-content: flex-start;
  padding-left: 4%;
  background-color: #2f0549 !important;
  color: white !important;
  height: 10%;
}
.btn-voltar {
  width: 20%;
  border-radius: 50%;
  color: rgb(136, 255, 0);
}
.cabeçalho {
  height: 10%;
}
</style>
