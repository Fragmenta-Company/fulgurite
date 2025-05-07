import { createApp } from "vue";
import router from "./helpers/router.ts";
import "./index.css";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
