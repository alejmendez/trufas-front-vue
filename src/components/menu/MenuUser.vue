<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, signOut } from '@/services/auth/login'

const router = useRouter()

const root = ref(null)

const user = getCurrentUser()

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
  signOut()
  router.push({
    name: 'auth.login'
  })
}

onMounted(() => {
  document.addEventListener('click', closeDropDown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropDown)
})
</script>

<template>
  <div class="w-[40px]" ref="root">
    <!-- User login -->
    <div class="flex items-center justify-start space-x-4" @click="toggleDrop">
      <img class="w-10 h-10 rounded-full border-2 border-gray-50" :src="user.avatar" alt="" />
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
      <div class="font-semibold text-left block px-4 py-2">
        <div>{{ user?.name }}</div>
      </div>
      <div class="py-1 text-left" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" class="text-gray-700 block px-4 py-2" role="menuitem" tabindex="-1">
          Account settings
        </a>
        <a
          href="#"
          class="text-gray-700 block px-4 py-2"
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
