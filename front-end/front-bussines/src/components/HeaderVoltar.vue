<template>
  <div class="menu-btn">
    <v-btn class="btn-voltar" @click="RedirecionarInicio"> voltar </v-btn>
    <!--  <v-icon :class="{ 'rotated': drawer }" @click="toggleDrawer">{{ drawer ? 'fa-solid fa-xmark' : 'fa-solid fa-bars' }}</v-icon> -->
    <p style="margin-left: 8%">{{ title }}</p>
  </div>
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 4%;
  background-color: #3f51b5 !important;
  color: white !important;
  height: 8% !important;
}
.btn-voltar {
  width: 20%;
  background-color: #3f51b5 !important;
  color: rgb(136, 255, 0);
}
.cabeçalho {
  max-height: 8% !important;
}
</style>
