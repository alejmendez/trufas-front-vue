<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import HeaderCrud from '@/components/crud/HeaderCrud.vue'
import UserService from '@/services/user'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const id = route.params.id;

const avatarInput = ref(null)
const avatarPreview = ref(null)
const avatarRemove = ref(false)
const form = ref(null)
const form$ = ref(null)
const formRole = ref(null)
const formRole$ = ref(null)
const formLoginEmail = ref(null)
const formLoginEmail$ = ref(null)
const formLoginPassword = ref(null)
const formLoginPassword$ = ref(null)

const loading = ref(false)

onMounted(async() => {
  try {
    const user = await UserService.getOne(id)
    avatarPreview.value = user.avatar
    form$.value.load(user)
    formRole$.value.load({
      role: user.role.name
    })
    formLoginEmail$.value.load({
      email: user.email
    })
  } catch (error) {
    toast.warning(t('generics.messages.entity_not_found'))
    router.push({
      name: 'user.list'
    })
  }
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

    const data = {
      avatar: avatarInput.value,
      avatarRemove: avatarRemove.value,
      ...form.value,
      ...formRole.value,
    }

    await UserService.update(id, data)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'user.list'
    })
  } catch (error) {
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const submitEmailHandler = async () => {
  try {
    loading.value = true

    await UserService.updateEmail(id, formLoginEmail.value.email)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'user.list'
    })
  } catch (error) {
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const submitPasswordHandler = async () => {
  try {
    loading.value = true

    await UserService.updatePassword(id, formLoginPassword.value.password)
    toast.success(t('generics.messages.saved_successfully'))

    router.push({
      name: 'user.list'
    })
  } catch (error) {
    const message = error?.response?.data?.message
    toast.error(message ? message : t('generics.errors.trying_to_save'))
  } finally {
    loading.value = false
  }
}

const previewImage = (e) => {
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
    :breadcrumbs="[{ to: { name: 'user.list' }, text: 'Usuarios' }, { text: t('generics.actions.edit') }]"
    :title="t('user.titles.edit')"
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
                  @change="previewImage"
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
            :label="t('user.form.dni.label')"
            :field-name="t('user.form.dni.name')"
            rules="required|max:255"
          />

          <TextElement
            name="name"
            :label="t('user.form.name.label')"
            :field-name="t('user.form.name.name')"
            rules="required|max:255"
          />

          <TextElement
            name="last_name"
            :label="t('user.form.last_name.label')"
            :field-name="t('user.form.last_name.name')"
            rules="required|max:255"
          />

          <TextElement
            name="phone"
            :label="t('user.form.phone.label')"
            :field-name="t('user.form.phone.name')"
            rules="required|max:17"
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
        {{ t('user.sections.login') }}
      </h3>
    </header>
    <div class="border-t border-gray-200 dark:border-white/10">
      <div class="p-6">
        <Vueform
          ref="formLoginEmail$"
          v-model="formLoginEmail"
          :endpoint="false"
          @submit="submitHandler"
          :columns="{ container: 6, label: 12, wrapper: 12 }"
          :display-errors="false"
        >
          <TextElement
            name="email"
            :label="t('user.form.email.label')"
            :field-name="t('user.form.email.name')"
            rules="required|email|max:255"
          />

          <div class="form-text col-span-6 form-text-type">
            <button
              class="float-right mt-8 btn btn-secondary"
              @click="submitEmailHandler"
            >
              {{ t('user.buttons.change_e_mail') }}
            </button>
          </div>
        </Vueform>
        <Vueform
          ref="formLoginPassword$"
          v-model="formLoginPassword"
          :endpoint="false"
          @submit="submitHandler"
          :columns="{ container: 6, label: 12, wrapper: 12 }"
          :display-errors="false"
        >
          <TextElement
            name="password"
            input-type="password"
            :label="t('user.form.password.label')"
            :field-name="t('user.form.password.name')"
            rules="required|min:6"
          />
          <div class="form-text col-span-6 form-text-type">
            <button
              class="float-right mt-8 btn btn-secondary"
              @click="submitPasswordHandler"
            >
              {{ t('user.buttons.resend_password') }}
            </button>
          </div>
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
            open-direction="top"
            :label="t('user.form.role.label')"
            :field-name="t('user.form.role.name')"
            :items="['Super Admin', 'Administrador', 'Técnico', 'Agricultor']"
          />
        </Vueform>
      </div>
    </div>
  </section>
</template>
