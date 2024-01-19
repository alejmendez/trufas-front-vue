<script setup>
import { reactive } from 'vue'

import VButton from '@/components/form/VButton.vue'
import VInput from '@/components/form/VInput.vue'
import VCheckbox from '@/components/form/VCheckbox.vue'
import { Login } from '@/services/auth/login'

const form = reactive({
  email: 'alejmendez.87@gmail.com',
  password: '12345678',
  remember: true,
})

const handlerSubmit = () => {
  Login(form)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center" style="background-color: #CC6844;">
    <div class="w-full md:max-w-lg p-6 bg-white border-gray-900 rounded-md shadow-md border lg:max-w-md">
      <h1 class="text-3xl font-semibold text-center text-purple-700">SW Agricola</h1>
      <form class="mt-6" @submit.prevent="handlerSubmit">
        <v-input
          label="Correo electrónico"
          type="email"
          v-model="form.email"
        />
        <v-input
          class-wrapper="mt-4"
          label="Contraseña"
          type="password"
          v-model="form.password"
        />

        <v-checkbox
          class-wrapper="mt-4"
          label="Recordarme"
          v-model="form.remember"
        />

        <div class="mt-6">
          <v-button class="w-full">
            Ingresar
          </v-button>
        </div>
      </form>
      <p class="mt-8 font-medium text-center text-gray-700">
        <a href="#" class="hover:underline">Restablecer contraseña</a>
      </p>
    </div>
  </div>

</template>
