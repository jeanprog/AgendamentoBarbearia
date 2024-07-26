<template>
  <Bar
    class="min-h-56 max-h-56 max-w-full bg-indigo-600"
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
  pdv: Number,
  back: Number,
  emissor: Number,
  etiquetas: Number,
  pre: Number,
  ecommerce: Number
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
    'Back-office',
    'PDV',
    'Emissor Nf-e',
    'Etiquetas',
    'Pré-Venda Mobile',
    'ecommerce'
    // Nota: "Etiquetas" aparece duas vezes
  ],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [
        '#BF5700',
        ' #00274c',
        '#065535',
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      borderRadius: 10
    }
  ]
})

const updateChartData = () => {
  /*  console.log('chamei o update do inicio do component', props.pdv)
  chartData.value.datasets[0].data = [props.pdv, props.back, props.emissor]  */ // Ajuste conforme necessário
  // Atualiza os dados e rótulos do gráfico
  const dataArray = [
    props.back,
    props.pdv,
    props.emissor,
    props.etiquetas,
    props.pre,
    props.ecommerce
  ]
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
        stepSize: 1 // Adjust if needed
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
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

onMounted(() => {})

watch(
  () => [
    props.pdv,
    props.back,
    props.emissor,
    props.etiquetas,
    props.pre,
    props.ecommerce
  ],
  updateChartData,
  { immediate: true }
)
</script>
