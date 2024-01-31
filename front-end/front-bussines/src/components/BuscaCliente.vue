<template>
  Buscar Cliente
  <v-text-field label="coloque nome da empresa" v-model="cliente">
  </v-text-field>
  <div class="ContainerItens">
    <v-list class="itens" lines="one">
      <v-list-item
        :title="'Item '"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      ></v-list-item>
      <v-list-item
        :title="'Item '"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      ></v-list-item>
      <v-list-item
        :title="'Item '"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      ></v-list-item>
      <v-list-item
        :title="'Item '"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      ></v-list-item>
      <v-list-item
        :title="'Item '"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      ></v-list-item>
    </v-list>
  </div>
  <div class="ContainerBtns">
    <v-btn class="style-btn" @click="buscaCliente"> selecionar </v-btn>
    <v-btn class="style-btn" @click="adicionarCliente"> Adicionar </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let cliente = ref<string>('')

const buscaCliente = () => {
  //logica pra busca de um cliente
  console.log('capturei um cliente', cliente.value)
}

const adicionarCliente = () => {
  // chamar modal pra adicionar cliente
  console.log('evento acionado')
}
</script>

<style scoped>
.bodyModal {
  border: solid !important ;
  width: 100%;
}
.ContainerBtns {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.style-btn {
  width: 300px;
  margin: 1%;
  background-color: #e82d92 !important;
  color: white;
}

.ContainerItens {
  overflow: auto;
  max-height: 180px;
}
.itens {
  background-color: #19181f !important;
  color: white;
}
</style>
