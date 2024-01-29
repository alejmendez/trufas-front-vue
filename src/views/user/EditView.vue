<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useToast } from 'vue-toastification'

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import UserService from '@/services/user'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const id = route.params.id;

const avatarInput = ref(null)
const form = ref(null)
const form$ = ref(null)
const formRole = ref(null)
const formRole$ = ref(null)

const loading = ref(false)

onMounted(async() => {
  const user = await UserService.getOne(id)
  form$.value.load(user)
  formRole$.value.load({
    role: user.role.name
  })
})

const submitHandler = async () => {
  try {
    await form$.value.validate()
    await formRole$.value.validate()
    const invalid = form$.value.invalid || formRole$.value.invalid

    if (invalid) {
      return
    }

    loading.value = true

    const avatar = avatarInput.value.files[0]
    const formData = new FormData()
    formData.append('avatar', avatar)
    ;[...Object.entries(form.value), ...Object.entries(formRole.value)].forEach(([key, value]) =>
      formData.append(key, value)
    )

    await UserService.create(formData)
    toast.success('Guardado satisfactoriamente')

    router.push({
      name: 'user.list'
    })
  } catch (error) {
    const message = error?.response?.data?.message
    toast.error(message ? message : 'Error al intentar guardar')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <HeaderCrud
    :breadcrumbs="[{ to: { name: 'user.list' }, text: 'Usuarios' }, { text: 'Crear' }]"
    title="Crear Usuario"
  >
    <template v-slot:header>
      <button
        class="px-5 py-2 text-gray-100 transition-colors duration-150 bg-gray-900 rounded-lg focus:shadow-outline hover:bg-gray-800"
        @click="submitHandler"
      >
        Guardar Cambios
      </button>
      <router-link
        :to="{ name: 'user.list'}"
        class="px-5 py-2 text-gray-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20"
      >
        Cancelar
      </router-link>
    </template>
  </HeaderCrud>
  <section
    class="mt-5 rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10"
  >
    <header class="flex items-center gap-x-3 overflow-hidden px-6 py-4">
      <h3 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
        Detalles del perfil
      </h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <Vueform
          ref="form$"
          v-model="form"
          :endpoint="false"
          @submit="submitHandler"
          :columns="{ container: 6, label: 12, wrapper: 12 }"
          :display-errors="false"
        >
          <div class="form-text col-span-12 form-text-type">
            <input
              ref="avatarInput"
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-gray-200 hover:file:bg-gray-700"
            />
          </div>

          <TextElement name="dni" label="RUT / ID" field-name="rut" rules="required|max:255" />

          <TextElement name="name" label="Nombre" field-name="nombre" rules="required|max:255" />

          <TextElement
            name="last_name"
            label="Apellido"
            field-name="apellido"
            rules="required|max:255"
          />

          <TextElement
            name="email"
            label="Correo electrónico"
            field-name="correo electrónico"
            rules="required|email|max:255"
          />

          <TextElement
            name="phone"
            label="Teléfono"
            field-name="teléfono"
            rules="required|max:17"
          />

          <TextElement
            name="password"
            input-type="password"
            label="Contraseña"
            field-name="contraseña"
            rules="required|min:6"
          />
        </Vueform>
      </div>
    </div>
  </section>
  <section
    class="mt-5 rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10"
  >
    <header class="flex items-center gap-x-3 overflow-hidden px-6 py-4">
      <h3 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">Permisos</h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <Vueform
          ref="formRole$"
          v-model="formRole"
          :endpoint="false"
          @submit="submitHandler"
          :columns="{ container: 6, label: 12, wrapper: 12 }"
          :display-errors="false"
        >
          <SelectElement
            name="role"
            :search="true"
            :native="false"
            input-type="search"
            autocomplete="disabled"
            label="Tipo de usuario"
            :items="['Super Admin', 'Administrador', 'Técnico', 'Agricultor']"
          />
        </Vueform>
      </div>
    </div>
  </section>
</template>
