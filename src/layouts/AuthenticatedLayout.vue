<script setup>
import { ref } from 'vue'

import SideBarLeft from '@/components/menu/SideBarLeft.vue'
import MenuUser from '@/components/menu/MenuUser.vue'

const showSide = ref(true)

const toggleSideBar = () => {
  showSide.value = !showSide.value
}
</script>

<template>
  <div
    class="w-screen h-screen flex bg-gray-50 font-normal text-gray-950 antialiased dark:bg-gray-950 dark:text-white"
  >
    <div class="w-[320px] h-full" v-show="showSide">
      <div class="flex justify-start items-center h-[64px] border-b">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">SW Agricola</h3>
        </div>
      </div>
      <SideBarLeft />
    </div>
    <div class="w-full h-full">
      <div class="flex items-center w-full h-[64px] border-b px-[20px] py-[10px] z-10">
        <div
          class="cursor-pointer rounded-lg outline-none transition duration-75 text-gray-400 hover:text-gray-500 focus-visible:ring-primary-600 border border-gray-400 rounded px-3 py-1"
          @click="toggleSideBar"
        >
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </div>

        <div class="w-[calc(100%-30px)] flex justify-end">
          <MenuUser />
        </div>
      </div>
      <div class="min-h-[calc(100vh-64px)] bg-gray-50 pb-5">
        <main class="py-[10px] px-[25px] h-full">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>
