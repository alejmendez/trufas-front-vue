<script setup>
import { reactive, onMounted } from 'vue'

import BreadCrumbs from '@/components/BreadCrumbs.vue'
import UserService from '@/services/user'

const breadCrumbs = [
  {
    to: 'user.list',
    text: 'Usuarios'
  },
  {
    text: 'Listado'
  },
]

const tableData = reactive(
  {
    page: 1,
    perPage: 50,
    totalItems: 1,
    totalPages: 1,
    items: []
  }
)

onMounted(async () => {
  const userList = await UserService.list()
  tableData.page = userList.page
  tableData.perPage = userList.perPage
  tableData.totalItems = userList.totalItems
  tableData.totalPages = userList.totalPages
  tableData.items = userList.items
})

const orderHandler = () => {

}
</script>

<template>
  <header class="fi-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <BreadCrumbs :elements="breadCrumbs" />

      <h1 class="fi-header-heading text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
        Usuarios
      </h1>
    </div>

    <div class="fi-ac gap-3 flex flex-wrap items-center justify-start shrink-0 sm:mt-[50px]">
      <router-link
        :to="{ name: 'user.create' }"
        class="px-5 py-2 text-gray-100 transition-colors duration-150 bg-gray-900 rounded-lg focus:shadow-outline hover:bg-gray-800"
      >
        Ingresar
      </router-link>
    </div>
  </header>

  <div class="mt-8 bg-white shadow-sm ring-1 ring-gray-950/5 dark:divide-white/10 dark:bg-gray-900 dark:ring-white/10">
    <!-- Table responsive wrapper -->
    <div class="overflow-x-auto bg-white dark:bg-neutral-700">

      <!-- Search input -->
      <div class="flex justify-end px-4 py-3 sm:px-6">
        <div class="relative">
          <label for="inputSearch" class="sr-only">Search </label>
          <input id="inputSearch" type="text" placeholder="Search..."
            class="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
        </div>
      </div>

      <div>
        <!-- Table -->
        <table class="min-w-full text-left text-sm whitespace-nowrap border-t-2">
          <!-- Table head -->
          <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600">
            <tr>
              <th scope="col" class="px-6 py-3" @click="orderHandler('name')">
                Nombre <font-awesome-icon :icon="['fa', 'sort']" />
              </th>
              <th scope="col" class="px-6 py-3" @click="orderHandler('dni')">
                RUT / ID <font-awesome-icon :icon="['fa', 'sort']" />
              </th>
              <th scope="col" class="px-6 py-3" @click="orderHandler('phone')">
                Teléfono <font-awesome-icon :icon="['fa', 'sort']" />
              </th>
              <th scope="col" class="px-6 py-3" @click="orderHandler('role')">
                Tipo de usuario <font-awesome-icon :icon="['fa', 'sort']" />
              </th>
              <th scope="col" class="px-6 py-3" @click="orderHandler('email')">
                Correo <font-awesome-icon :icon="['fa', 'sort']" />
              </th>
              <th scope="col" class="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>

          <!-- Table body -->
          <tbody>
            <tr
              class="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600"
              v-for="user of tableData.items"
              :key="user.id"
            >
              <td class="px-6 py-3">{{ user.name }}</td>
              <td class="px-6 py-3">{{ user.dni }}</td>
              <td class="px-6 py-3">{{ user.phone }}</td>
              <td class="px-6 py-3">
                <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-3">{{ user.email }}</td>
              <td class="px-6 py-3">
                <router-link :to="{ name: 'user.view', params: { id: user.id } }">
                  <font-awesome-icon :icon="['fas', 'eye']" class="mr-4 cursor-pointer transition-all hover:text-gray-600" />
                </router-link>
                <router-link :to="{ name: 'user.edit', params: { id: user.id } }">
                  <font-awesome-icon :icon="['fas', 'pencil']" class="mr-4 cursor-pointer transition-all hover:text-lime-600" />
                </router-link>
                <font-awesome-icon :icon="['fas', 'trash-can']" class="mr-4 cursor-pointer transition-all hover:text-red-600" />
              </td>
            </tr>
          </tbody>

        </table>
      </div>


      <nav class="m-5 flex items-center justify-between text-sm">
        <p>
          Mostrando <strong>1-5</strong> de <strong>10</strong>
        </p>

        <ul class="list-style-none flex">
          <li>
            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!">
              <font-awesome-icon :icon="['fa', 'chevron-left']" />
            </a>
          </li>
          <li>
            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!">
              1
            </a>
          </li>
          <li aria-current="page">
            <a class="relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300"
              href="#!">
              2
              <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                (current)
              </span>
            </a>
          </li>
          <li>
            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!">
              3
            </a>
          </li>
          <li>
            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!">
              <font-awesome-icon :icon="['fa', 'chevron-right']" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
