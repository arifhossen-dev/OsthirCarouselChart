<script setup>
import { ref } from 'vue';
import Carousel from './components/Carousel.vue';
import Chart from './components/Chart.vue';

const toggleCarousel = ref(true)
</script>

<template>
  <button>Toggle Carouser</button>
  <div class="mx-auto mt-10 max-w-7xl">
    <Chart/>

    <div>
      <div class="bg-green-500 mt-5 text-center py-5">
        <button @click="toggleCarousel = !toggleCarousel" type="button"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200">
          Click to Toggle The Carousel and check in console
        </button>
      </div>
      <Carousel v-if="toggleCarousel" />
    </div>
  </div>
</template>

<style scoped></style>
