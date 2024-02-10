<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import VInputFile from '@/components/form/VInputFile.vue'
import fieldService from '@/services/field'
import quarterService from '@/services/quarter'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const id = route.params.id;

const blueprint = ref(null)
const blueprintPreview = ref(null)
const blueprintRemove = ref(false)
const form = ref(null)
const form$ = ref(null)
const fieldSelect = ref({})

const loading = ref(false)

onMounted(async() => {
  try {
    const results = await Promise.all([
      quarterService.getOne(id),
      fieldService.getListSelect()
    ])

    const quarter = results[0]
    fieldSelect.value = results[1]

    blueprintPreview.value = quarter.blueprint
    form$.value.load(quarter)
  } catch (error) {
    toast.warning(t('generics.messages.entity_not_found'))
    router.push({
      name: 'quarter.list'
    })
  }
})

const submitHandler = async () => {
  try {
    await form$.value.validate()

    if (form$.value.invalid) {
      return
    }

    loading.value = true

    const data = {
      blueprint: blueprint.value,
      blueprintRemove: blueprintRemove.value,
      ...form.value,
    }

    await quarterService.update(id, data)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'quarter.list'
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
  blueprint.value = e.fileInput
  blueprintRemove.value = e.fileRemove
}
</script>

<template>
  <HeaderCrud
    :breadcrumbs="[{ to: { name: 'quarter.list' }, text: t('quarter.titles.entity_breadcrumb') }, { text: t('generics.actions.edit') }]"
    :title="t('quarter.titles.edit')"
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
        {{ t('generics.buttons.save_edit') }}
      </button>
      <router-link
        :to="{ name: 'quarter.list'}"
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
            :label="t('quarter.form.name.label')"
            :field-name="t('quarter.form.name.name')"
            :rules="['required', 'min:3', 'max:255', 'regex:/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/']"
          />

          <TextElement
            name="location"
            :label="t('quarter.form.location.label')"
            :field-name="t('quarter.form.location.name')"
            rules="required|max:255"
          />

          <TextElement
            name="area"
            :label="t('quarter.form.area.label')"
            :field-name="t('quarter.form.area.name')"
            rules="required|max:255"
          />

          <DateElement
            name="planned_at"
            :label="t('quarter.form.planned_at.label')"
            :field-name="t('quarter.form.planned_at.name')"
            rules="required"
          />

          <TextElement
            name="number_of_trees"
            :label="t('quarter.form.number_of_trees.label')"
            :disabled="true"
          />

          <SelectElement
            name="field_id"
            :search="true"
            :native="false"
            input-type="search"
            autocomplete="disabled"
            :label="t('quarter.form.field_id.label')"
            :field-name="t('quarter.form.field_id.name')"
            :items="fieldSelect"
            rules="required"
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
        {{ t('quarter.sections.blueprint') }}
      </h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <div class="form-text col-span-12 form-text-type">
          <VInputFile
            :imagePreview="true"
            :image="blueprintPreview"
            @change="changeFileHandler"
          />
        </div>
      </div>
    </div>
  </section>
</template>
