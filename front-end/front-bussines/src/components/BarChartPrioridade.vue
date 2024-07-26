<template>
  <Bar
    class="min-h-56 max-h-56 max-w-full"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  alta: Function,
  media: Number,
  baixa: Number
})
/* const selectItems = [
    "PDV",
    "Back-office",
    "Emissor Nf-e",
    "Etiquetas",
    "Pré-Venda Mobile",
    "ecommerce",
    "Etiquetas" // Nota: "Etiquetas" aparece duas vezes
  ]; */

const chartData = ref({
  labels: [
    'Alta',
    'Media',
    'Baixa'

    // Nota: "Etiquetas" aparece duas vezes
  ],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: ['#3f51b5', '#3f51b5', '#3f51b5'],
      borderRadius: 10,
      barThickness: 50,
      padding: 10
    }
  ]
})

const updateChartData = () => {
  /*  console.log('chamei o update do inicio do component', props.pdv)
    chartData.value.datasets[0].data = [props.pdv, props.back, props.emissor]  */ // Ajuste conforme necessário
  // Atualiza os dados e rótulos do gráfico
  const dataArray = [props.alta, props.media, props.baixa]
  chartData.value.datasets[0].data = dataArray
  // Atualize os rótulos conforme necessário

  const maxDataValue = Math.max(...dataArray)
  chartOptions.value.scales.y.max = maxDataValue + 1 // Set max y-axis value
  chartOptions.value.scales.y.ticks.stepSize = 1 //
  // Ajuste os limites do eixo Y com base no tamanho dos dados
  // Ajusta o valor máximo do eixo Y para o próximo múltiplo de 5
}

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      ticks: {
        padding: 10,
        stepSize: 1 // Adjust if needed
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        padding: 10,
        // Display exact values on the y-axis
        callback: function (value) {
          if (Number.isInteger(value)) {
            return value
          }
        }
      }
    }
  },
  plugins: {
    legend: {
      display: false // This will hide the legend completely
    }
  }
})

onMounted(() => {
  console.log(props.alta)
})

watch(() => [props.alta, props.media, props.baixa], updateChartData, {
  immediate: true
})
</script>
