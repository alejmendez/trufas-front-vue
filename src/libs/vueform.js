import Vueform from '@vueform/vueform'
import vueformConfig from '@/../vueform.config'

export const initVueform = app => {
  app.use(Vueform, vueformConfig)
}
