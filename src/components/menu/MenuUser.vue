<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getCurrentUser, getAvatarUrlUser, Logout } from '@/services/auth/login'

const root = ref(null)

const user = getCurrentUser()
const avatarUrl = getAvatarUrlUser('36x36')

const showDropDown = ref(false)

const toggleDrop = () => {
  showDropDown.value = !showDropDown.value
}

const closeDropDown = (e) => {
  if (!root.value.contains(e.target)) {
    showDropDown.value = false
  }
}

const signOutHandler = () => {
  Logout()
}

onMounted(() => {
  document.addEventListener('click', closeDropDown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropDown)
})
</script>

<template>
  <div class="w-[200px]" ref="root">
    <!-- User login -->
    <div
      class="flex items-center justify-start space-x-4"
      @click="toggleDrop"
    >
      <img
        class="w-10 h-10 rounded-full border-2 border-gray-50"
        :src="avatarUrl"
        alt=""
      >
      <div class="font-semibold text-gray-400 dark:text-white text-left">
        <div>{{ user.name }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">Admin</div>
      </div>
    </div>
    <!-- Drop down -->
    <div
      v-show="showDropDown"
      class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1 text-left" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
          Account settings
        </a>
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          @click="signOutHandler"
        >
          Sign out
        </a>
      </div>
    </div>
  </div>
</template>
