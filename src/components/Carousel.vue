<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import images from "../data/carouselData";

/**
 * initial values
 * @items making image reactive
 * @isActive responsible for active item
 * @interval responsible for delay auto slide between two images
 */
let items = ref(images)
let isActive = ref(0)
const interval = 5000 //milliseconds

// navigation to Previous image
const prev = () => {
  isActive.value = (isActive.value - 1 + items.value.length) % items.value.length;
}

// navigation to Next image
const next = () => {
  isActive.value = (isActive.value + 1 + items.value.length) % items.value.length;
  console.log('You will see me every 5000 millisecond if carousel is visible (in DOM)');
}

// autoplay  
let initAutoPlay = setInterval(() => {
  next()
}, interval)

onMounted(() => {
  initAutoPlay
})

// on mouse out autoplay will be restart
const replay = () => {
  initAutoPlay = setInterval(() => {
    next()
  }, interval)
}

// on mouse over autoplay will be stopped
const hold = () => {
  clearInterval(initAutoPlay)
}


/**
 * Clear interval
 * then Add random new item to the carousel
 * then initialize from beginning
 */
const addNewItem = () => {
  clearInterval(initAutoPlay)

  let randNumber = Math.floor(Math.random() * 10)
  items.value.unshift({ thumb: `https://source.unsplash.com/featured/1024x72${randNumber}?fit=facearea&facepad=5&q=80` })
  isActive.value = 0
  replay()
}

onBeforeUnmount(() => {
  clearInterval(initAutoPlay)
})

</script>
<template>
  <section
    class="min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700 rounded-3xl my-10">
    <div class="max-w-2xl mx-auto py-10">
      <div class="px-5 py-2 rounded-lg bg-white/60 mb-10 text-center">
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <span class="text-yellow-500">Osthir</span> Carousel
        </h1>
      </div>
      <div @mouseover="hold" @mouseout="replay" class="relative w-full">
        <!-- Carousel wrapper -->
        <div class="relative h-[470px] overflow-hidden rounded-2xl bg-slate-200">
          <template v-for="(item, index) in items" :key="index">
            <Transition name="slide-fade">
              <div :style="`background-image: url(${item.thumb})`"
                class="w-full h-full duration-700 ease-in-out bg-no-repeat bg-cover" v-show="isActive === index">
              </div>
            </Transition>
          </template>
        </div>
        <!-- Slider indicators -->
        <div
          class="absolute z-30 flex px-3 py-2 space-x-3 -translate-x-1/2 border rounded-full shadow-md bg-white/50 bottom-5 left-1/2">
          <button v-for="(item, index) in items" :key="index" @click="isActive = index" type="button"
            class="w-3 h-3 rounded-full" :class="isActive === index ? 'bg-green-400' : 'bg-black'"></button>
        </div>
        <!-- Slider controls -->
        <button @click="prev" type="button"
          class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">

          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 1 1 5l4 4" />
            </svg>
            <span class="sr-only">Previous</span>
          </span>

        </button>

        <button @click="next" type="button"
          class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">

          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <span class="sr-only">Next</span>
          </span>

        </button>

      </div>

      <button @click="addNewItem" type="button"
        class="text-gray-900 mt-10 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2">
        <svg class="w-8 mr-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5" />
          <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5"
            stroke-linecap="round" />
        </svg>
        Add a random image from unsplash
      </button>

    </div>
  </section>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateY(5px); */
  opacity: 0.1;
}
</style>
