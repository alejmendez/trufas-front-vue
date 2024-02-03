<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import fieldService from '@/services/field'

const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const avatarInput = ref(null)
const avatarPreview = ref(null)
const avatarRemove = ref(false)
const form = ref(null)
const form$ = ref(null)
const formRole = ref(null)
const formRole$ = ref(null)

const loading = ref(false)

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
      avatar: avatarInput.value,
      ...form.value,
      ...formRole.value,
    }

    await fieldService.create(data)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'field.list'
    })
  } catch (error) {
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const changeAvatarHandler = (e) => {
  const [file] = e.target.files
  if (file) {
    avatarRemove.value = false
    avatarPreview.value = URL.createObjectURL(file)
  }
}

const avatarRemoveHandler = () => {
  avatarRemove.value = true
  avatarInput.value.value = null
  avatarPreview.value = null
}
</script>

<template>
  <HeaderCrud
    :breadcrumbs="[{ to: { name: 'field.list' }, text: t('user.titles.entity_breadcrumb') }, { text: t('generics.actions.create') }]"
    :title="t('field.titles.create')"
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
        :to="{ name: 'field.list'}"
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
        {{ t('field.sections.details') }}
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
            <div class="flex flex-row gap-x-5">
              <div>
                <div
                  class="w-32 border rounded-md"
                  :class="{ 'h-full': !avatarPreview }"
                >
                  <img
                    class="w-full"
                    :src="avatarPreview"
                    v-if="avatarPreview"
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="mb-2 w-full">{{ t('generics.form.file.select_a_image') }}</div>
                <input
                  ref="avatarInput"
                  type="file"
                  className="input-file mb-4"
                  style="width: 160px;"
                  accept="image/*"
                  @change="changeAvatarHandler"
                />
                <button
                  class="btn btn-secondary"
                  @click.prevent="avatarRemoveHandler"
                >
                  {{ t('generics.form.file.remove_image') }}
                </button>
              </div>
            </div>
          </div>

          <TextElement
            name="dni"
            :label="t('field.form.dni.label')"
            :field-name="t('field.form.dni.name')"
            rules="required|max:255"
          />

          <TextElement
            name="name"
            :label="t('field.form.name.label')"
            :field-name="t('field.form.name.name')"
            rules="required|max:255"
          />

          <TextElement
            name="last_name"
            :label="t('field.form.last_name.label')"
            :field-name="t('field.form.last_name.name')"
            rules="required|max:255"
          />

          <TextElement
            name="email"
            :label="t('field.form.email.label')"
            :field-name="t('field.form.email.name')"
            rules="required|email|max:255"
          />

          <TextElement
            name="phone"
            :label="t('field.form.phone.label')"
            :field-name="t('field.form.phone.name')"
            rules="required|max:17"
          />

          <TextElement
            name="password"
            input-type="password"
            :label="t('field.form.password.label')"
            :field-name="t('field.form.password.name')"
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
        {{ t('field.sections.roles') }}
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
            :label="t('field.form.role.label')"
            :field-name="t('field.form.role.name')"
            :items="['Super Admin', 'Administrador', 'Técnico', 'Agricultor']"
          />
        </Vueform>
      </div>
    </div>
  </section>
</template>
