<template>
  <Line
    class="min-h-56 max-h-56 max-w-full"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
)

const props = defineProps({
  pdv: Number,
  back: Number,
  emissor: Number,
  etiquetas: Number,
  pre: Number,
  ecommerce: Number
})

const colors = {
  purple: {
    default: 'rgba(149, 76, 233, 1)',
    half: 'rgba(63, 81, 181, 0.5)',
    quarter: 'rgba(149, 76, 233, 0.25)',
    zero: 'rgba(149, 76, 233, 0)'
  },
  indigo: {
    default: 'rgba(80, 102, 120, 1)',
    quarter: 'rgba(80, 102, 120, 0.25)'
  }
}

const chartData = ref({
  labels: [
    'Back-office',
    'PDV',
    'Emissor Nf-e',
    'Etiquetas',
    'Pré-Venda Mobile',
    'ecommerce'
  ],
  datasets: [
    {
      label: 'Dataset',
      data: [],
      backgroundColor: colors.purple.half, // Set the background color here
      borderColor: colors.purple.default,
      borderWidth: 2,
      pointBackgroundColor: colors.purple.default,
      fill: true,
      lineTension: 0.2
    }
  ]
})

const updateChartData = () => {
  const dataArray = [
    props.back,
    props.pdv,
    props.emissor,
    props.etiquetas,
    props.pre,
    props.ecommerce
  ]
  chartData.value.datasets[0].data = dataArray

  const maxDataValue = Math.max(...dataArray)
  chartOptions.value.scales.y.max = maxDataValue + 1
  chartOptions.value.scales.y.ticks.stepSize = 1
}

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        stepSize: 1,
        color: colors.indigo.default
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: colors.indigo.default,
        callback: function (value) {
          if (Number.isInteger(value)) {
            return value
          }
        }
      },
      grid: {
        color: colors.indigo.quarter
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
})

onMounted(async () => {
  await nextTick()
  // No need for gradient creation as we use a solid color now
  // Update the chart data
  updateChartData()
})

// Observa mudanças nas propriedades e atualiza os dados do gráfico
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

<style scoped>
/* Adicione estilos personalizados, se necessário */
</style>
