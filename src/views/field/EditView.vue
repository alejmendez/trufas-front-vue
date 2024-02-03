<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import fieldService from '@/services/field'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const id = route.params.id;

const blueprintInput = ref(null)
const blueprintRemove = ref(false)
const form = ref(null)
const form$ = ref(null)

const loading = ref(false)

onMounted(async() => {
  try {
    const field = await fieldService.getOne(id)
    form$.value.load(field)
  } catch (error) {
    toast.warning(t('generics.messages.entity_not_found'))
    router.push({
      name: 'field.list'
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
      blueprint: blueprintInput.value,
      blueprintRemove: blueprintRemove.value,
      ...form.value,
    }

    await fieldService.update(id, data)
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
    :breadcrumbs="[{ to: { name: 'field.list' }, text: t('field.titles.entity_breadcrumb') }, { text: t('generics.actions.edit') }]"
    :title="t('field.titles.edit')"
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

          <TextElement
            name="number_of_trees"
            :label="t('field.form.number_of_trees.label')"
            :disabled="true"
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
                style="width: 160px;"
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
