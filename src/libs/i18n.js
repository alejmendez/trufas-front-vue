import { createI18n } from 'vue-i18n'
import es from '@/lang/es.json'

export const initI18n = (app) => {
  app.use(
    createI18n({
      legacy: false,
      locale: 'es',
      messages: {
        es,
      }
    })
  )
}
