import { createApp } from "vue";
import { abilitiesPlugin } from "@casl/vue";
import ability from "./casl.js";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import PrimeVue from "primevue/config";
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css  ";
import "primeicons/primeicons.css ";
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Password from 'primevue/password';
import '/node_modules/primeflex/primeflex.css'
import DataView from 'primevue/dataview';
import Dropdown  from 'primevue/dropdown'
import 'primeicons/primeicons.css';
import Badge from 'primevue/badge';

createApp(App)
  .use(PrimeVue)
  .use(abilitiesPlugin, ability, { useGlobalProperties: true })
  .use(store)
  .use(router)
  .component("Button",Button)
  .component("DataTable",DataTable)
  .component("Column",Column)
  .component("InputText",InputText)
  .component("Checkbox",Checkbox)
  .component("Menubar",Menubar)
  .component("Card",Card)
  .component("Password",Password)
  .component("DataView",DataView)
  .component("Dropdown",Dropdown)
  .component("Badge",Badge)

  .mount("#app");
