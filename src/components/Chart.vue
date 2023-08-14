<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { dataset, chartData } from '../data/chartData';

const newLabel = ref('')
const newItem = ref(16)
let error = ref(false)

let chart = null


const config = {
  type: 'pie',
  data: chartData,
};

onMounted(() => {
  const ctx = document.getElementById('chart')
  chart = new Chart(ctx, config)
})

const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

function updateChart() {
  if (!newLabel.value) {
    error.value = true
  }

  if (newLabel.value) {
    dataset.push(newItem.value)
    chartData.labels.push(newLabel.value)
    chart.data.datasets[0].backgroundColor.push(randColor())

    chart.data.datasets[0].data = dataset
    chart.update()

    // resetting
    newLabel.value = null
    error.value = false
  }

}

onBeforeUnmount(() => {
  chart.destroy();
})

</script>

<template>
  <section class="p-10 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-3xl my-10">
    <div class="flex flex-col items-center">
      <div class=" mx-auto w-[400px] h-[400px] bg-white/60 p-5 rounded-xl">
        <canvas id="chart">
        </canvas>
      </div>

      <div class="mt-10 flex items-center gap-3">
        <input type="text" class="rounded-lg outline-none focus:outline-none py-3"
          :class="error ? 'border bg-red-400 border-red-600' : 'border-none'" required v-model="newLabel">
        <input type="number" class="rounded-lg border-none outline-none focus:outline-none py-3" v-model="newItem">


      </div>
      <button @click="updateChart()" type="button"
        class="mt-5 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200">
        <svg class="w-8 mr-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5" />
          <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5"
            stroke-linecap="round" />
        </svg>
        Add to chart
      </button>
    </div>
  </section>
</template>

<style scoped></style>
