<script setup>
import { ref } from 'vue'
const showDropDown = ref(false)

const toggleDrop = () => {
  showDropDown.value = !showDropDown.value
}
</script>

<template>
  <div class="w-[200px] ">
    <!-- User login -->
    <div class="flex items-center justify-start space-x-4" @click="toggleDrop">
      <img class="w-10 h-10 rounded-full border-2 border-gray-50"
        src="https://yt3.ggpht.com/hqsxh-Vnbw9OK0_X4DAWh6RkmEUVnL-82SRCyh-IKr9fIXR8zhUCRdBEwgWWL_14q_L8Piod=s108-c-k-c0x00ffffff-no-rj"
        alt="">
      <div class="font-semibold text-gray-400 dark:text-white text-left">
        <div>Madona ,Dev OP</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">Admin</div>
      </div>
    </div>
    <!-- Drop down -->
    <div v-show="showDropDown"
      class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1 text-left" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account
          settings</a>
        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
          id="menu-item-1">Support</a>
        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
          id="menu-item-2">License</a>
        <form method="POST" action="#" role="none">
          <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem"
            tabindex="-1" id="menu-item-3">Sign out</button>
        </form>
      </div>
    </div>
  </div>
</template>
