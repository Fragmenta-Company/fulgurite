import { createWebHistory, createRouter } from 'vue-router'

import GalaxySelect from '../pages/GalaxySelect.vue';
import Options from '../pages/Options.vue';

const routes = [
  { path: '/', component: GalaxySelect },
  { path: '/options', component: Options },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
