<template>
  <Header />
  <div class="main">
    <!-- Conteúdo da Dashboard -->
    <h3 class="title">Confira sua semana</h3>

    <div class="bodydash">
      <div class="diasdasemana">
        <p>18</p>
        <p>seg</p>
      </div>
      <div class="cardsleft" style="display: flex">
        <v-card class="card-customize" color="indigo">
          <p class="text-card">
            Serviços: <br />
            10
          </p>

          <p class="text-card">Próximo: <br />Jean Roberto</p>
        </v-card>
      </div>
    </div>
  </div>

  <div class="footer">
    <v-col cols="auto">
      <v-btn
        density="default"
        icon="fa-solid fa-plus"
        class="adicionarAgendamento"
        @click="RedirectNovoAgendamento"
      >
      </v-btn>
    </v-col>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '../router'

const route = useRoute()

const user = ref(route.params.user)

const RedirectNovoAgendamento = () => {
  router.push({ name: 'novoAgendamento', params: { user: user.value } })
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
  width: 74vw;
  height: 12vh;
  display: flex !important;
  justify-content: space-between !important ;
  flex-direction: row !important;
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

/* Adicione estilos adicionais conforme necessário */
</style>
