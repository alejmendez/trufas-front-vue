<script setup>
import MenuElement from './MenuElement.vue'
</script>
<template>
  <aside class="min-h-[calc(100vh-64px)] py-[20px]">
    <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
      <div class="flex flex-col justify-between space-y-[10px]">
        <MenuElement :link="{ to: { name: 'dashboard' }, text: 'Escritorio' }" />
        <div>Gestión</div>
        <MenuElement :link="{ to: { name: 'field.list' }, text: 'Campos' }" />
        <MenuElement :link="{ to: { name: 'quarter.list' }, text: 'Cuarteles' }" />
        <MenuElement :link="{ to: { name: 'plant.list' }, text: 'Plantas' }" />
        <div>Configuraciones</div>
        <MenuElement :link="{ to: { name: 'user.list' }, text: 'Usuarios' }" />
      </div>
    </div>
  </aside>
</template>
