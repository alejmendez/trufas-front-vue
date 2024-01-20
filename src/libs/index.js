import { initPinia } from './pinia'
import { initRouter } from './router'
import { initFontAwesome } from './font-awesome'
import { initVueform } from './vueform';

export const initLibs = app => {
  initPinia(app)
  initRouter(app)
  initFontAwesome(app)
  initVueform(app)
}
