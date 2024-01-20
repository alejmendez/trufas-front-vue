<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Login } from '@/services/auth/login'

const router = useRouter()

const form = ref(null)

const submitHandler = async () => {
  try {
    await Login(form.value)

    router.push({
      name: 'dashboard',
    })
  } catch (error) {
    console.log("error")
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center" style="background-color: #CC6844;">
    <div class="w-full md:max-w-lg p-6 bg-white border-gray-300 rounded-md shadow-md border lg:max-w-md">
      <h1 class="text-3xl font-semibold text-center text-gray-900">SW Agricola</h1>
      <Vueform
        v-model="form"
        :endpoint="false"
        @submit="submitHandler"
        :display-errors="false"
      >
        <TextElement
          name="email"
          label="Correo electrónico"
          input-type="email"
          rules="required|email"
        />
        <TextElement
          name="password"
          label="Contraseña"
          input-type="password"
          rules="required"
        />
        <CheckboxElement name="remember" text="Recordarme" />
        <ButtonElement
          name="submit"
          :submits="true"
          button-label="Ingresar"
          :full="true"
          size="lg"
        />
      </Vueform>
      <p class="mt-8 font-medium text-center text-gray-700">
        <a href="#" class="hover:underline">Restablecer contraseña</a>
      </p>
    </div>
  </div>

</template>
