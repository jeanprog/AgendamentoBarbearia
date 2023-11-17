<template>
  <HeaderVoltar :title="titlepage" />
  <div>corpo da page</div>
</template>

<script setup lang="ts">
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { ref } from 'vue'

const titlepage = ref('Cadastro de Serviço')
</script>
