<script setup>
import { useI18n } from 'vue-i18n'
import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import TableList from '@/components/table/TableList.vue'
import plantService from '@/services/plant'

const { t } = useI18n()

const columns = [
  { text: t('plant.table.name'), data: 'name' },
  { text: t('plant.table.quarter_id'), data: 'quarter_id' },
  { text: t('plant.table.field_id'), data: 'field_id' },
  { text: t('plant.table.location'), data: 'location' },
  { text: t('plant.table.type'), data: 'type' },
  { text: t('plant.table.age'), data: 'age' },
  { text: t('plant.table.manager'), data: 'manager' },
]
</script>

<template>
  <HeaderCrud
    :title="t('plant.titles.entity_breadcrumb')"
    :breadcrumbs="[{ to: { name: 'plant.list' }, text: t('plant.titles.entity_breadcrumb') }, { text: 'Listado' }]"
    :links="[{ to: { name: 'plant.create' }, text: 'Ingresar' }]"
  />

  <TableList
    :columns="columns"
    :listHandler="plantService.getList"
    :deleteHandler="plantService.remove"
    v-slot="table"
  >
    <td class="px-6 py-3">{{ table.item.name }}</td>
    <td class="px-6 py-3">{{ table.item.quarter.name }}</td>
    <td class="px-6 py-3">{{ table.item.field.name }}</td>
    <td class="px-6 py-3">{{ table.item.location }}</td>
    <td class="px-6 py-3">{{ table.item.type }}</td>
    <td class="px-6 py-3">{{ table.item.siageze }}</td>
    <td class="px-6 py-3">{{ table.item.manager }}</td>
    <td class="px-6 py-3">
      <router-link :to="{ name: 'plant.view', params: { id: table.item.id } }">
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="mr-4 cursor-pointer transition-all hover:text-gray-600"
        />
      </router-link>
      <router-link :to="{ name: 'plant.edit', params: { id: table.item.id } }">
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
