// import "devextreme/dist/css/dx.common.css";
// import "devextreme/dist/css/dx.light.css";
// import "@fortawesome/fontawesome-free/css/all.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import pinia from "./store";
import "./style/tailwind.css";
import "./permission";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(pinia);

app.mount("#app");
