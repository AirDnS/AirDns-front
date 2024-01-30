import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import routers from "./routers";
import axios from 'axios'
import "@/scss/style.scss";
import VueCookies from 'vue-cookies'
import mitt from 'mitt'
import Vuelidate from 'vuelidate';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'


loadFonts()

const emitter = mitt();
const app = createApp(App)
app.use(routers)
app.use(vuetify)
app.use(VueCookies)
app.use(Vuelidate)
app.use(VueSweetalert2);
app.use(PerfectScrollbar);
app.config.globalProperties.$axios = axios
app.config.globalProperties.emitter = emitter
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')
