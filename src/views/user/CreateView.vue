<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { MaskInput } from "maska"

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import VInputFile from '@/components/form/VInputFile.vue'
import userService from '@/services/user'

const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const avatar = ref(null)
const form = ref(null)
const form$ = ref(null)
const formRole = ref(null)
const formRole$ = ref(null)

const loading = ref(false)

onMounted(() => {
  new MaskInput("#dni", {
    mask: "##.###.###-K",
    tokens: {
      K: {
        pattern: /[0-9|k]/i,
        transform: chr => chr.toUpperCase(),
      }
    },
  })

  new MaskInput("#phone", {
    mask: "(+##) # #### ####",
    tokens: {
      F: {
        pattern: /[0-9|f]/i,
        transform: chr => chr.toUpperCase(),
      }
    },
  })
})

const submitHandler = async () => {
  try {
    loading.value = true

    await form$.value.validate()
    await formRole$.value.validate()
    const invalid = form$.value.invalid || formRole$.value.invalid

    if (invalid) {
      return
    }

    const data = {
      avatar: avatar.value,
      ...form.value,
      ...formRole.value,
    }

    await userService.create(data)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'user.list'
    })
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const changeFileHandler = (e) => {
  avatar.value = e.fileInput
}
</script>

<template>
  <HeaderCrud
    :breadcrumbs="[{ to: { name: 'user.list' }, text: t('user.titles.entity_breadcrumb') }, { text: t('generics.actions.create') }]"
    :title="t('user.titles.create')"
  >
    <template v-slot:header>
      <button
        class="btn btn-primary"
        :disabled="loading"
        @click="submitHandler"
      >
        <font-awesome-icon
          class="animate-spin"
          :icon="['fas', 'circle-notch']"
          v-show="loading"
        />
        {{ t('generics.buttons.create') }}
      </button>
      <router-link
        :to="{ name: 'user.list'}"
        class="btn btn-secondary"
      >
        {{ t('generics.buttons.cancel') }}
      </router-link>
    </template>
  </HeaderCrud>
  <section
    class="mt-5 rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10"
  >
    <header class="flex items-center gap-x-3 overflow-hidden px-6 py-4">
      <h3 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
        {{ t('user.sections.details') }}
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
            <VInputFile
              :imagePreview="true"
              @change="changeFileHandler"
            />
          </div>

          <TextElement
            id="dni"
            name="dni"
            :label="t('user.form.dni.label')"
            :field-name="t('user.form.dni.name')"
            rules="required|max:255"
          />

          <TextElement
            name="name"
            :label="t('user.form.name.label')"
            :field-name="t('user.form.name.name')"
            :rules="['required', 'min:3', 'max:255', 'regex:/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/']"
          />

          <TextElement
            name="last_name"
            :label="t('user.form.last_name.label')"
            :field-name="t('user.form.last_name.name')"
            :rules="['required', 'min:3', 'max:255', 'regex:/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/']"
          />

          <TextElement
            name="email"
            :label="t('user.form.email.label')"
            :field-name="t('user.form.email.name')"
            rules="required|email|max:255"
          />

          <TextElement
            id="phone"
            name="phone"
            :label="t('user.form.phone.label')"
            :field-name="t('user.form.phone.name')"
            rules="required|max:17"
          />

          <TextElement
            name="password"
            input-type="password"
            :label="t('user.form.password.label')"
            :field-name="t('user.form.password.name')"
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
      <h3 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
        {{ t('user.sections.roles') }}
      </h3>
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
            :label="t('user.form.role.label')"
            :field-name="t('user.form.role.name')"
            :items="['Super Admin', 'Administrador', 'Técnico', 'Agricultor']"
          />
        </Vueform>
      </div>
    </div>
  </section>
</template>
