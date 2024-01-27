import { initPinia } from './pinia'
import { initRouter } from './router'
import { initFontAwesome } from './font-awesome'
import { initVueform } from './vueform'
import { initToast } from './toast'
import { initI18n } from './i18n'

export const initLibs = (app) => {
  initPinia(app)
  initRouter(app)
  initFontAwesome(app)
  initVueform(app)
  initToast(app)
  initI18n(app)
}
