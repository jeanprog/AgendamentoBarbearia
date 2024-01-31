<template>
  <Header />
  <div class="main">
    <!-- Conteúdo da Dashboard -->
    <h3 class="title">Suporte e Gerencimaento de sistemas e clientes</h3>

    <div class="bodydash">
      <div class="cardsleft">
        <v-card
          class="card-customize"
          color="indigo"
          @click="RedirectCadastroDeServico"
        >
          <icon class="fa-solid fa-users-gear" id="IconeChamado"></icon>
          <p class="text-card">Iniciar Chamado</p>
        </v-card>
        <v-card class="card-customize" color="indigo">
          <icon class="fa-solid fa-user-tie" id="IconeChamado"></icon>
          <p class="text-card">Iniciar Consultoria</p>
        </v-card>
      </div>
      <div class="img-dashboard">
        <img src="../assets/semfundopng.png" alt="" />
      </div>
    </div>
  </div>

  <!--  <div class="footer">
    <v-col cols="auto">
      <v-btn
        density="default"
        icon="fa-solid fa-plus"
        class="adicionarAgendamento"
        @click="RedirectNovoAgendamento"
      >
      </v-btn>
    </v-col>
  </div> -->
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '../router'

const route = useRoute()

const user = ref(route.params.user)

onMounted(() => {
  const date = new Date()
  console.log(date)
})

const RedirectCadastroDeServico = () => {
  router.push({ name: 'CadastroDeServico', params: { user: user.value } })
  console.log('evento acionado')
}
</script>

<style scoped>
.main {
  width: 100% !important;
  overflow: hidden !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.bodydash {
  display: flex;
  flex-direction: row;

  width: 100% !important;
  max-height: 100vh !important;
}

.diasdasemana {
  width: 20% !important ;
  color: white;
  margin: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card-customize {
  width: 20vw !important;
  height: 30vh;
  display: flex !important;
  justify-content: center !important ;
  align-items: center !important;
  flex-direction: row !important;
  margin: 2% 2% 2% 36%;
}
#IconeChamado {
  font-size: 36px;
}
.title {
  color: white;
  size: 24px;
  margin: 2%;
}
.text-card {
  margin: 8%;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Alinha na parte inferior */
  position: fixed;
  bottom: 0;
  /* Cor de fundo do footer, ajuste conforme necessário */
}

.adicionarAgendamento {
  background-color: #2f0549;
  color: white;
}

.cardsleft {
  max-height: 76vh !important;
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 2%;
}
/* Adicione estilos adicionais conforme necessário */
</style>
