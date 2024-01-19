import { createPinia } from 'pinia'

export const initPinia = app => {
    app.use(createPinia())
}