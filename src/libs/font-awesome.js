import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const initFontAwesome = app => {
  library.add(faBars)

  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
