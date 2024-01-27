import { createI18n } from 'vue-i18n'

export const initI18n = (app) => {
  app.use(
    createI18n({
      // something vue-i18n options here ...
    })
  )
}
