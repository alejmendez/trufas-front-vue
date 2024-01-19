import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { initLibs } from './libs'

const app = createApp(App)

initLibs(app)

app.mount('#app')
