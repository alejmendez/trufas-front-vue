<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { signIn } from '@/services/auth/login'

const router = useRouter()

const form = ref(null)
const errorLogin = ref('')
const loading = ref(false)

const submitHandler = async () => {
  errorLogin.value = ''
  loading.value = true
  try {
    await signIn(form.value)

    router.push({
      name: 'dashboard'
    })
  } catch (error) {
    errorLogin.value = 'Correo electrónico o Contraseña incorrectos, intentelo nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h1 class="text-3xl font-semibold text-center text-gray-900 mb-10">SW Agricola</h1>
  <Vueform v-model="form" :endpoint="false" @submit="submitHandler" :display-errors="false">
    <TextElement
      name="email"
      label="Correo electrónico"
      input-type="email"
      rules="required|email"
    />
    <TextElement name="password" label="Contraseña" input-type="password" rules="required" />
    <div
      v-if="errorLogin !== ''"
      class="form-color-danger block form-text-small mt-5 text-center col-span-12"
    >
      {{ errorLogin }}
    </div>
    <ButtonElement
      name="submit"
      :submits="true"
      button-label="Ingresar"
      :full="true"
      size="lg"
      class="mt-5"
      :loading="loading"
    />
  </Vueform>
  <p class="mt-8 font-medium text-center text-gray-700">
    <a href="#" class="hover:underline">Restablecer contraseña</a>
  </p>
</template>
