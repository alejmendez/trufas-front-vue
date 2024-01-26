import { initPinia } from './pinia'
import { initRouter } from './router'
import { initFontAwesome } from './font-awesome'
import { initVueform } from './vueform';
import { initToast } from './toast';

export const initLibs = app => {
  initPinia(app)
  initRouter(app)
  initFontAwesome(app)
  initVueform(app)
  initToast(app)
}
