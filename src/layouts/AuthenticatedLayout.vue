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
  <div class="w-screen h-screen flex">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start  items-center ">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">SW Agricola</h3>
        </div>
      </div>
      <SideBarLeft />
    </div>
    <div class="w-full h-full bg-gray-400">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </div>
        <!-- Search bar -->

        <div class="w-[calc(100%-30px)] flex justify-end">
          <MenuUser />
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <main class="p-[20px] h-full">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>
