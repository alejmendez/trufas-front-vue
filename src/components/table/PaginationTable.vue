<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  from: {
    type: Number,
    default: 1
  },
  to: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 1
  },
  current_page: {
    type: Number,
    default: 1
  },
  last_page: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['changePage'])

const paginationLimit = 3
const current_page = ref(props.current_page)

const listPages = computed(() => {
  const pages = []
  let startIn = current_page.value - paginationLimit
  let stopIn = current_page.value + paginationLimit
  if (startIn < 1) {
    startIn = 1
  }
  if (stopIn > props.last_page) {
    stopIn = props.last_page
  }

  for (let i = startIn; i <= stopIn; i++) {
    pages.push(i);
  }

  return pages
})

const getPage = (pageNumber) => {
  if (
    current_page.value === pageNumber
    || pageNumber > props.last_page
    || pageNumber < 1
  ) {
    return
  }
  current_page.value = pageNumber
  emit('changePage', pageNumber)
}

const firstPage = async () => getPage(1)
const prevPage = async () => getPage(current_page.value - 1)
const nextPage = async () => getPage(current_page.value + 1)
const lastPage = async () => getPage(props.last_page)
</script>

<template>
  <nav class="pagination">
    <p>
      {{ $t('generics.tables.pagination.show') }}
      <strong>{{ props.from }}</strong>-
      <strong>{{ props.to }}</strong>
      {{ $t('generics.tables.pagination.of') }}
      <strong>{{ props.total }}</strong>
    </p>

    <ul>
      <li>
        <a
          class="pagination-link"
          :class="{ 'opacity-35': current_page === 1 }"
          href="#!"
          @click="firstPage()"
        >
          <font-awesome-icon :icon="['fa', 'angles-left']" />
        </a>
      </li>
      <li>
        <a
          class="pagination-link"
          :class="{ 'opacity-35': current_page === 1 }"
          href="#!"
          @click="prevPage()"
        >
          <font-awesome-icon :icon="['fa', 'chevron-left']" />
        </a>
      </li>
      <li v-for="pageNumber in listPages" :key="pageNumber">
        <a
          :class="{ 'pagination-link': pageNumber !== current_page, current: pageNumber === current_page }"
          href="#!"
          @click="getPage(pageNumber)"
        >
          {{ pageNumber }}
        </a>
      </li>
      <li>
        <a
          class="pagination-link"
          :class="{ 'opacity-35': props.last_page === 1 }"
          href="#!"
          @click="nextPage()"
        >
          <font-awesome-icon :icon="['fa', 'chevron-right']" />
        </a>
      </li>
      <li>
        <a
          class="pagination-link"
          :class="{ 'opacity-35': props.last_page === 1 }"
          href="#!"
          @click="lastPage()"
        >
          <font-awesome-icon :icon="['fa', 'angles-right']" />
        </a>
      </li>
    </ul>
  </nav>
</template>
