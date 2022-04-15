import { createApp } from "vue";
import { abilitiesPlugin } from "@casl/vue";
import ability from "./casl.js";
import App from "./App.vue";
import router from "./router";
import store from './store/index'
createApp(App)
  .use(abilitiesPlugin, ability, { useGlobalProperties: true })
  .use(store)
  .use(router)
  .mount("#app");
