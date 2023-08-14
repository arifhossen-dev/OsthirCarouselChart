<script setup>
import { ref } from 'vue';
import Carousel from './components/Carousel.vue';
import Chart from './components/Chart.vue';

const toggleCarousel = ref(true)
</script>

<template>
  <div class="mx-auto mt-10 max-w-7xl">
    <Chart/>

    <div>
      <div class="py-5 mt-5 text-center bg-green-500">
        <button @click="toggleCarousel = !toggleCarousel" type="button"
          class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200">
          Click to Toggle The Carousel and check in console
        </button>
      </div>
      <Carousel v-if="toggleCarousel" />
    </div>
  </div>
</template>

<style scoped></style>
