<script setup>
import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import TableList from '@/components/table/TableList.vue'
import UserService from '@/services/user'

const columns = [
  { text: 'Nombre', data: 'name' },
  { text: 'RUT / ID', data: 'dni' },
  { text: 'Teléfono', data: 'phone' },
  { text: 'Tipo de usuario', data: 'role' },
  { text: 'Correo', data: 'email' }
]

const roleColors = {
  Agricultor: 'border-gray-800 text-gray-800 bg-gray-200',
  Técnico: 'border-green-800 text-green-800 bg-green-200',
  Administrador: 'border-blue-800 text-blue-800 bg-blue-200',
  'Super Admin': 'border-blue-800 text-blue-800 bg-blue-200'
}
</script>

<template>
  <HeaderCrud
    title="Usuarios"
    :breadcrumbs="[{ to: { name: 'user.list' }, text: 'Usuarios' }, { text: 'Listado' }]"
    :links="[{ to: { name: 'user.create' }, text: 'Ingresar' }]"
  />

  <TableList
    :columns="columns"
    :listHandler="UserService.getList"
    :deleteHandler="UserService.remove"
    v-slot="table"
  >
    <td class="px-6 py-3">{{ table.item.name }}</td>
    <td class="px-6 py-3">{{ table.item.dni }}</td>
    <td class="px-6 py-3">{{ table.item.phone }}</td>
    <td class="px-6 py-3">
      <span
        class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none border rounded-full"
        :class="roleColors[table.item.role.name]"
      >
        {{ table.item.role.name }}
      </span>
    </td>
    <td class="px-6 py-3">{{ table.item.email }}</td>
    <td class="px-6 py-3">
      <router-link :to="{ name: 'user.view', params: { id: table.item.id } }">
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="mr-4 cursor-pointer transition-all hover:text-gray-600"
        />
      </router-link>
      <router-link :to="{ name: 'user.edit', params: { id: table.item.id } }">
        <font-awesome-icon
          :icon="['fas', 'pencil']"
          class="mr-4 cursor-pointer transition-all hover:text-lime-600"
        />
      </router-link>
      <font-awesome-icon
        :icon="['fas', 'trash-can']"
        class="mr-4 cursor-pointer transition-all hover:text-red-600"
        @click="table.deleteEvent(table.item.id)"
      />
    </td>
  </TableList>
</template>
