import { createApp, App as Application } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { plugin, defaultConfig } from '@formkit/vue'

import App from '@/App.vue'
import router from "@/router/index.ts"

import '~formkit/themes/dist/genesis/theme.css'

const i18n = createI18n({
  locale: 'nl',
  messages
})

const app: Application = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(plugin, defaultConfig)

app.mount('#app')
