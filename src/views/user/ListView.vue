<script setup>
import { useI18n } from 'vue-i18n'
import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import TableList from '@/components/table/TableList.vue'
import UserService from '@/services/user'

const { t } = useI18n()

const columns = [
  { text: t('user.table.name'), data: 'name' },
  { text: t('user.table.dni'), data: 'dni' },
  { text: t('user.table.phone'), data: 'phone' },
  { text: t('user.table.role'), data: 'role' },
  { text: t('user.table.email'), data: 'email' }
]

const roleColors = {
  Agricultor: 'border-[#E9E9EA] text-[#495057] bg-[#F8F9FA]',
  Técnico: 'border-[#DAF4E3] text-[#16A34A] bg-[#F0FDF4]',
  Administrador: 'border-[#DDEEF6] text-[#0B88A0] bg-[#E8F7FF]',
  'Super Admin': 'border-[#DDEEF6] text-[#0B88A0] bg-[#E8F7FF]'
}
</script>

<template>
  <HeaderCrud
    :title="t('user.titles.entity_breadcrumb')"
    :breadcrumbs="[{ to: { name: 'user.list' }, text: t('user.titles.entity_breadcrumb') }, { text: 'Listado' }]"
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
