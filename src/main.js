import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import routers from "./routers";
import axios from 'axios'

loadFonts()

const app = createApp(App)
app.use(routers)
app.use(vuetify)
app.config.globalProperties.$axios = axios
app.mount('#app')