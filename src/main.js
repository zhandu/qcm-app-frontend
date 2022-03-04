import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueToast from 'vue-toast-notification'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/toast.css'

createApp(App).use(store).use(router).use(VueToast).mount("#app");
