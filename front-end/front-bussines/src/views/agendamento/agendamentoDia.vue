<script setup>
import { router } from '../../router'
import HeaderVoltar from '../../components/HeaderVoltar.vue'
import ModalAddChamado from '../../components/ModalAddChamado.vue'

/* const titlepage = ref('Cadastro de Serviço') */
</script>

<template>
  <HeaderVoltar title="PAINEL DE INFORMAÇÕES" />

  <div class="pageinfo">
    <div class="containerCardsSomatorio">
      <div class="Asidelateral">
        <P style="color: white">TEMPO MÉDIO ATENDIMENTO</P>
        <P style="color: white">GRAU DE COMPLEXIDADE</P>
        <P style="color: white">PRIORIDADES</P>
      </div>
      <div class="cards">
        <v-card variant="outlined" class="cards-totais">
          <p style="color: white">PENDENTES</p>
          <p style="font-size: 24px">5</p>
        </v-card>
        <v-card variant="outlined" class="cards-totais">
          <p style="color: white">ABERTOS</p>
          <p style="font-size: 24px">5</p>
        </v-card>
        <v-card variant="outlined" class="cards-totais">
          <p style="color: white">FECHADOS</p>
          <p style="font-size: 24px">5</p>
        </v-card>
        <v-card variant="outlined" class="cards-totais">
          <p style="color: white">DESENV</p>
          <p style="font-size: 24px">5</p>
        </v-card>
        <div class="selectsdata">
          <v-select density="compact" label="Data de inicio"></v-select>
          <v-select density="compact" label="Data de Final"></v-select>
        </div>
      </div>
    </div>
    <div class="bodypage">
      <div class="inputsfiltro">
        <v-select
          density="compact"
          class="input"
          label="Escolha a data"
        ></v-select>
        <v-select
          density="compact"
          class="input"
          label=" pesquisar por empresa"
        ></v-select>
        <v-select
          density="compact"
          class="input"
          label=" pesquisar por cliente "
        ></v-select>
      </div>
      <div class="cardsChamadosDia">
        <v-card class="cards-processos" variant="outlined">
          <p>em andamento</p>
          <v-card class="card-chamado" color="indigo" variant="elevated">
            <v-card-item>
              <div class="text-caption">Empresa:</div>
              <div class="text-caption">Cliente:</div>
              <div class="text-caption">problema:</div>
            </v-card-item>
            <v-card-item>
              <div class="text-caption">Empresa:</div>
              <div class="text-caption">Cliente:</div>
              <div class="text-caption">problema:</div>
            </v-card-item>
            <v-card-item>
              <div class="text-caption">Empresa:</div>
              <div class="text-caption">Cliente:</div>
              <div class="text-caption">problema:</div>
            </v-card-item>
            <v-card-item>
              <div class="text-caption">Empresa:</div>
              <div class="text-caption">Cliente:</div>
              <div class="text-caption">problema:</div>
            </v-card-item>
          </v-card>
        </v-card>
        <v-card class="cards-processos" variant="outlined">
          <p>finalizados</p>
          <v-card class="card-chamado" color="indigo" variant="elevated">
            <v-card-item>
              <div class="text-caption">Empresa:</div>
              <div class="text-caption">Cliente:</div>
              <div class="text-caption">problema:</div>
            </v-card-item>
          </v-card>
        </v-card>
        <v-card class="cards-processos" variant="outlined">
          <p>pendentes</p>
          <v-card class="card-chamado" color="indigo" variant="elevated">
            <v-card-item>
              <div class="text-caption">Empresa:</div>
              <div class="text-caption">Cliente:</div>
              <div class="text-caption">problema:</div>
            </v-card-item>
          </v-card>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-chamado {
  max-height: 30%;
  min-width: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cards-processos {
  width: 30%;
  height: 220px !important;
  display: flex;
  align-items: center;
  margin: 0.5%;
  flex-direction: column !important;
  overflow: auto;
}
.cardsChamadosDia {
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: row !important;
}
.input {
  margin: 1%;
}
.selectsdata {
  width: 32%;
  margin: 1%;
}
.inputsfiltro {
  width: 100%;
  height: 20%;

  display: flex;
}
.bodypage {
  width: 100%;
  height: 40%;
  color: white;
}
.cards-totais {
  width: 92px;
  height: 92px;
  color: white;
  margin: 2%;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.pageinfo {
  width: 100% !important;
  height: 100vh !important;
}

.containerCardsSomatorio {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.cards {
  width: 70%;
  border: solid;
  display: flex;
  flex-direction: row;
}

.Asidelateral {
  width: 30%;
}
</style>
