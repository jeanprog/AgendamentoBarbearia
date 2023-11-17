<template>

    <Header/>
    <div class="main">
      <!-- Conteúdo da Dashboard -->
      <h3 class="title">Clientes agendados pra hoje </h3>

     
      <v-card 
      class="card-customize" 
      max-width="600" 
      variant="outlined" 
      color="indigo"
      
      >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
               
              </div>
              <div class="text-h6 mb-1">
                José henrique da silva
              </div>
              <div class="text-caption">Corte navalhado + pigmentação  R$ 50,00</div>
              <div class="text-time">Tempo estimado 1:00 hr</div>
              <div class="text-time">Horário do agendamento 9:30 as 10:30</div>



            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn>
              Checkin
            </v-btn>
            <v-btn>
              Desistir
            </v-btn>
          </v-card-actions>
        </v-card>
   
    </div>

  

</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
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
.card-customize { 
  width: 95%;
}
.title{ 
  color: indigo;
  
}

/* Adicione estilos adicionais conforme necessário */
</style>
