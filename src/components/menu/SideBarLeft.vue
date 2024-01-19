<script setup>
import { RouterLink } from 'vue-router'
import MenuElement from './MenuElement.vue'

const menuList = [
  {
    to: { name: 'dashboard' },
    text: 'Dashboard',
  },
  {
    to: { name: 'auth.login' },
    text: 'Login',
  },
]

</script>
<template>
  <aside class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
    <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
      <div class="flex flex-col justify-between space-y-[10px]">
        <MenuElement v-for="link in menuList" :key="link.text" :link="link" />
      </div>
      <div class="h-[50px]">
        <div>
          <router-link to="/setting"
            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800  transition duration-400 ease-in-out">
            <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"></path>
            </svg>
            Setting
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>
