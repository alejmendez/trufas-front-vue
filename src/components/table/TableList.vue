<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'

const { t } = useI18n()

const props = defineProps({
  columns: Array,
  listHandler: {
    type: Function
  },
  deleteHandler: {
    type: Function
  }
})

const toast = useToast()
const order = reactive({
  column: '',
  order: ''
})
const loading = ref(false)
const search = ref('')
const page = ref(1)

const data = reactive({
  links: {},
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: '',
    per_page: 15,
    to: 4,
    total: 4
  },
  data: []
})

const listData = async () => {
  try {
    loading.value = true
    const orderParams = `${order.order}${order.column}`
    const list = await props.listHandler({
      order: orderParams,
      search: search.value,
      page: page.value
    })
    data.links = list.links
    data.meta = list.meta
    data.data = list.data
  } catch (error) {
    toast.error(t('generics.tables.errors.searching_for_information'))
  } finally {
    loading.value = false
  }
}

const orderHandler = (field) => {
  if (order.column === field) {
    order.order = order.order === '' ? '-' : ''
  } else {
    order.order = ''
  }

  order.column = field
  listData()
}

const searchHandler = (e) => {
  search.value = e.target.value
  listData()
}

const deleteHandler = async (id) => {
  try {
    const result = await Swal.fire({
      title: t('generics.tables.confirm.delete'),
      showDenyButton: true,
      confirmButtonText: t('generics.tables.confirm.confirmButton'),
      denyButtonText: t('generics.tables.confirm.denyButton')
    })

    if (!result.isConfirmed) {
      return
    }

    await props.deleteHandler(id)
    listData()
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: t('generics.tables.errors.could_not_delete_the_record'),
    });
  }
}

const getPage = (pageNumber) => {
  if (page.value === pageNumber) {
    return
  }
  page.value = pageNumber
  listData()
}

const getFirstPage = async () => getPage(1)
const getLastPage = async () => getPage(data.meta.last_page)

onMounted(listData)
</script>

<template>
  <div
    class="mt-8 bg-white shadow-sm ring-1 ring-gray-950/5 dark:divide-white/10 dark:bg-gray-900 dark:ring-white/10"
  >
    <!-- Table responsive wrapper -->
    <div class="overflow-x-auto bg-white dark:bg-neutral-700">
      <!-- Search input -->
      <div class="flex justify-end px-4 py-3 sm:px-6">
        <div class="relative">
          <label for="inputSearch" class="sr-only">{{ t('generics.tables.search') }} </label>
          <input
            id="inputSearch"
            type="text"
            :placeholder="t('generics.tables.search') + '...'"
            class="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            @keyup.enter="searchHandler"
          />
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
        </div>
      </div>

      <!-- Table -->
      <table class="min-w-full text-left text-sm whitespace-nowrap border-t-2">
        <!-- Table head -->
        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600">
          <tr>
            <th
              v-for="column of props.columns"
              :key="column.data"
              scope="col"
              class="px-6 py-3 cursor-default"
              @click="orderHandler(column.data)"
            >
              {{ column.text }}
              <font-awesome-icon
                :icon="[
                  'fa',
                  order.column === column.data
                    ? order.order === '-'
                      ? 'sort-up'
                      : 'sort-down'
                    : 'sort'
                ]"
              />
            </th>
            <th scope="col" class="px-6 py-3">{{ t('generics.tables.actions') }}</th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody>
          <template v-if="loading && !data.data.length">
            <tr
              class="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 animate-pulse "
            >
              <td
                v-for="index in (props.columns.length + 1)"
                :key="index"
                class="px-6 py-3"
              >
                <div class="h-2 bg-slate-700 rounded"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              class="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600"
              v-for="item of data.data"
              :key="item.id"
            >
              <slot :item="item" :deleteEvent="deleteHandler" />
            </tr>
          </template>
        </tbody>
      </table>

      <nav class="pagination">
        <p>
          {{ $t('generics.tables.pagination.show') }}
          <strong>{{ data.meta.from }}</strong>-
          <strong>{{ data.meta.to }}</strong>
          {{ $t('generics.tables.pagination.of') }}
          <strong>{{ data.meta.total }}</strong>
        </p>

        <ul>
          <li>
            <a class="pagination-link" href="#!" @click="getFirstPage()">
              <font-awesome-icon :icon="['fa', 'chevron-left']" />
            </a>
          </li>
          <li v-for="pageNumber in data.meta.last_page" :key="pageNumber">
            <a
              :class="{ 'pagination-link': pageNumber !== page, current: pageNumber === page }"
              href="#!"
              @click="getPage(pageNumber)"
            >
              {{ pageNumber }}
            </a>
          </li>
          <li>
            <a class="pagination-link" href="#!" @click="getLastPage()">
              <font-awesome-icon :icon="['fa', 'chevron-right']" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
