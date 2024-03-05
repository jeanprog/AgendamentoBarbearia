<script setup lang="ts">
import { ref } from 'vue'
import HeaderVoltar from '../../components/HeaderVoltar.vue'
import axios from 'axios'

let titlepage = ref('Solicitações desenvolvimento')

/* const verificaDiaSelecionado = (dayvalue: any) => {
   const result = form.diasAbertos.includes(dayvalue) 
  return console.log('teste aqui', dayvalue)
} */
</script>

<template>
  <HeaderVoltar :title="titlepage" />

  estou aqui nas configurações do
</template>

<style scooped>
.form-config {
  color: white;
}
.row-dias {
  width: 100% !important ;
}
.btns-dias {
  display: flex;
  justify-content: space-between;
  background-color: #19181f !important ;
  border-color: #e82d92 !important;
  margin: 1%;
  font-size: 12px !important;
}
.btn-selected {
  background-color: #e82d92 !important; /* ou a cor desejada quando selecionado */
  color: white;
  border-color: #e82d92 !important;
  margin: 1%;
}
</style>
