<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  link: Object,
})
</script>

<template>
  <router-link
    v-bind="attrs"
    :to="props.link.to"
    class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out"
  >
    {{ props.link.text }}
  </router-link>
</template>
