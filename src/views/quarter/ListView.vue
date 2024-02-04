<script setup>
import { useI18n } from 'vue-i18n'
import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import TableList from '@/components/table/TableList.vue'
import quarterService from '@/services/quarter'

const { t } = useI18n()

const columns = [
  { text: 'cuartel', data: 'name' },
  { text: 'campo', data: 'field_id' },
  { text: 'f. plantación', data: 'planned_at' },
  { text: 'superficie', data: 'area' },
  { text: 'arboles', data: 'number_of_trees' },
]
</script>

<template>
  <HeaderCrud
    :title="t('quarter.titles.entity_breadcrumb')"
    :breadcrumbs="[{ to: { name: 'quarter.list' }, text: t('quarter.titles.entity_breadcrumb') }, { text: 'Listado' }]"
    :links="[{ to: { name: 'quarter.create' }, text: 'Ingresar' }]"
  />

  <TableList
    :columns="columns"
    :listHandler="quarterService.getList"
    :deleteHandler="quarterService.remove"
    v-slot="table"
  >
    <td class="px-6 py-3">{{ table.item.name }}</td>
    <td class="px-6 py-3">{{ table.item.field_id }}</td>
    <td class="px-6 py-3">{{ table.item.planned_at }}</td>
    <td class="px-6 py-3">{{ table.item.area }}</td>
    <td class="px-6 py-3">{{ table.item.number_of_trees }}</td>
    <td class="px-6 py-3">
      <router-link :to="{ name: 'quarter.view', params: { id: table.item.id } }">
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="mr-4 cursor-pointer transition-all hover:text-gray-600"
        />
      </router-link>
      <router-link :to="{ name: 'quarter.edit', params: { id: table.item.id } }">
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
