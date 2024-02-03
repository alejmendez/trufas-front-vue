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

const blueprintInput = ref(null)
const blueprintRemove = ref(false)
const form = ref(null)
const form$ = ref(null)

const loading = ref(false)

const submitHandler = async () => {
  try {
    loading.value = true

    await form$.value.validate()

    if (form$.value.invalid) {
      return
    }

    const data = {
      blueprint: blueprintInput.value,
      ...form.value,
    }

    await fieldService.create(data)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'field.list'
    })
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const changeBlueprintHandler = (e) => {
  const [file] = e.target.files
  if (file) {
    blueprintRemove.value = false
  }
}

const blueprintRemoveHandler = () => {
  blueprintRemove.value = true
  blueprintInput.value.value = null
}
</script>

<template>
  <HeaderCrud
    :breadcrumbs="[{ to: { name: 'field.list' }, text: t('field.titles.entity_breadcrumb') }, { text: t('generics.actions.create') }]"
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
          <TextElement
            name="name"
            :label="t('field.form.name.label')"
            :field-name="t('field.form.name.name')"
            rules="required|max:255"
          />

          <TextElement
            name="location"
            :label="t('field.form.location.label')"
            :field-name="t('field.form.location.name')"
            rules="required|max:255"
          />

          <TextElement
            name="size"
            :label="t('field.form.size.label')"
            :field-name="t('field.form.size.name')"
            rules="required|max:255"
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
        {{ t('field.sections.blueprint') }}
      </h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <div class="form-text col-span-12 form-text-type">
          <div class="flex flex-row gap-x-5">
            <div class="w-full">
              <div class="mb-2 w-full">{{ t('generics.form.file.select_a_image') }}</div>
              <input
                ref="blueprintInput"
                type="file"
                className="input-file mb-4"
                accept="image/*"
                @change="changeBlueprintHandler"
              />
              <button
                class="btn btn-secondary"
                @click.prevent="blueprintRemoveHandler"
              >
                {{ t('generics.form.file.remove_image') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
