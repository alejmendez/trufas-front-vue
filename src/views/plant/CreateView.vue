<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import VInputFile from '@/components/form/VInputFile.vue'
import plantService from '@/services/plant'

const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const blueprint = ref(null)
const form = ref(null)
const form$ = ref(null)
const formLocation = ref(null)
const formLocation$ = ref(null)

const loading = ref(false)

const submitHandler = async () => {
  try {
    loading.value = true

    await form$.value.validate()
    await formLocation$.value.validate()

    if (form$.value.invalid || formLocation$.value.invalid) {
      return
    }

    const data = {
      blueprint: blueprint.value,
      ...form.value,
      ...formLocation.value,
    }

    await plantService.create(data)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'plant.list'
    })
  } catch (error) {
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const changeFileHandler = (e) => {
  blueprint.value = e.fileInput
}
</script>

<template>
  <HeaderCrud
    :breadcrumbs="[{ to: { name: 'plant.list' }, text: t('plant.titles.entity_breadcrumb') }, { text: t('generics.actions.create') }]"
    :title="t('plant.titles.create')"
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
        :to="{ name: 'plant.list'}"
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
            :label="t('plant.form.name.label')"
            :plant-name="t('plant.form.name.name')"
            rules="required|alpha|min:3|max:255"
          />

          <TextElement
            name="type"
            :label="t('plant.form.type.label')"
            :plant-name="t('plant.form.type.name')"
            rules="required|max:255"
          />

          <TextElement
            name="age"
            :label="t('plant.form.age.label')"
            :plant-name="t('plant.form.age.name')"
            rules="required|max:255"
          />
          <TextElement
            name="planned_at"
            :label="t('plant.form.planned_at.label')"
            :plant-name="t('plant.form.planned_at.name')"
            rules="required|max:255"
          />
          <TextElement
            name="manager"
            :label="t('plant.form.manager.label')"
            :plant-name="t('plant.form.manager.name')"
            rules="required|alpha|min:3|max:255"
          />
          <TextElement
            name="code"
            :label="t('plant.form.code.label')"
            :plant-name="t('plant.form.code.name')"
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
        {{ t('plant.sections.location') }}
      </h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <Vueform
          ref="formLocation$"
          v-model="form"
          :endpoint="false"
          @submit="submitHandler"
          :columns="{ container: 6, label: 12, wrapper: 12 }"
          :display-errors="false"
        >
          <SelectElement
            name="field_id"
            :search="true"
            :native="false"
            input-type="search"
            autocomplete="disabled"
            :label="t('quarter.form.field_id.label')"
            :field-name="t('quarter.form.field_id.name')"
            :items="['Super Admin', 'Administrador', 'Técnico', 'Agricultor']"
          />

          <SelectElement
            name="quarter_id"
            :search="true"
            :native="false"
            input-type="search"
            autocomplete="disabled"
            :label="t('plant.form.quarter_id.label')"
            :field-name="t('plant.form.quarter_id.name')"
            :items="['Super Admin', 'Administrador', 'Técnico', 'Agricultor']"
          />

          <TextElement
            name="location"
            :label="t('plant.form.location.label')"
            :plant-name="t('plant.form.location.name')"
            rules="required|max:255"
          />

          <TextElement
            name="location_xy"
            :label="t('plant.form.location_xy.label')"
            :plant-name="t('plant.form.location_xy.name')"
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
        {{ t('plant.sections.blueprint') }}
      </h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <div class="form-text col-span-12 form-text-type">
          <VInputFile
            @change="changeFileHandler"
          />
        </div>
      </div>
    </div>
  </section>
</template>
