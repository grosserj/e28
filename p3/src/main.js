import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate'
import App from '@/App.vue'
import store from '@/common/store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import HomePage from '@/components/pages/HomePage.vue'
import CreatePage from '@/components/pages/CreatePage.vue'
import CategoryPage from '@/components/pages/CategoryPage.vue'
import AdminPage from '@/components/pages/AdminPage'





Vue.use(VueRouter);
Vue.use(Vuelidate)

// Install BootstrapVue & BootstrapVue icon components
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/create', component: CreatePage, name: 'create' },
  { path: '/category/:slug', component: CategoryPage, name: 'category', props: true },
  { path: '/admin', component: AdminPage },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
