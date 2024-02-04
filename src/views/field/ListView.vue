<script setup>
import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import TableList from '@/components/table/TableList.vue'
import FieldService from '@/services/field'

const columns = [
  { text: 'Campo', data: 'name' },
  { text: 'Ubicación', data: 'location' },
  { text: 'Superficie', data: 'size' },
  { text: 'Arboles', data: 'number_of_trees' },
]
</script>

<template>
  <HeaderCrud
    :title="t('field.titles.entity_breadcrumb')"
    :breadcrumbs="[{ to: { name: 'field.list' }, text: t('field.titles.entity_breadcrumb') }, { text: 'Listado' }]"
    :links="[{ to: { name: 'field.create' }, text: 'Ingresar' }]"
  />

  <TableList
    :columns="columns"
    :listHandler="FieldService.getList"
    :deleteHandler="FieldService.remove"
    v-slot="table"
  >
    <td class="px-6 py-3">{{ table.item.name }}</td>
    <td class="px-6 py-3">{{ table.item.location }}</td>
    <td class="px-6 py-3">{{ table.item.size }}</td>
    <td class="px-6 py-3">{{ table.item.number_of_trees }}</td>
    <td class="px-6 py-3">
      <router-link :to="{ name: 'field.view', params: { id: table.item.id } }">
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="mr-4 cursor-pointer transition-all hover:text-gray-600"
        />
      </router-link>
      <router-link :to="{ name: 'field.edit', params: { id: table.item.id } }">
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
