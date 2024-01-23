<script setup>
import { useSlots } from 'vue'
import BreadCrumbs from '@/components/crud/BreadCrumbs.vue'

const slots = useSlots()

const props = defineProps({
  breadcrumbs: Array,
  title: String,
  links: Array
})
</script>

<template>
  <header class="fi-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <BreadCrumbs :elements="props.breadcrumbs" />

      <h1 class="fi-header-heading text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
        {{ props.title }}
      </h1>
    </div>

    <div
      class="fi-ac gap-3 flex flex-wrap items-center justify-start shrink-0 sm:mt-[50px]"
      v-if="props.links"
    >
      <router-link
        v-for="link in props.links"
        :key="link.text"
        :to="link.to"
        class="px-5 py-2 text-gray-100 transition-colors duration-150 bg-gray-900 rounded-lg focus:shadow-outline hover:bg-gray-800"
      >
        {{ link.text }}
      </router-link>
    </div>

    <div
      class="fi-ac gap-3 flex flex-wrap items-center justify-start shrink-0 sm:mt-[50px]"
      v-if="slots.header"
    >
      <slot name="header"></slot>
    </div>
  </header>
</template>
