import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import pinia from './store';
import "./style/tailwind.css";

const app = createApp(App)
app.use(router)
app.use(pinia);

app.mount('#app')