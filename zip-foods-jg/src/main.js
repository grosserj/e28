import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import ProductsPage from './components/pages/ProductsPage.vue';
import ProductPage from './components/pages/ProductPage.vue';
import ProductCreatePage from './components/pages/ProductCreatePage.vue';
import CategoriesPage from './components/pages/CategoriesPage.vue';
import AdminPage from './components/pages/AdminPage.vue';


Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/products', component: ProductsPage, name: 'products' },
  { path: '/products/:slug', component: ProductPage, name: 'product', props: true },
  { path: '/categories', component: CategoriesPage, name: 'categories' },
  { path: '/create', component: ProductCreatePage, name: 'add product' },
  { path: '/admin', component: AdminPage, name: 'admin' },

]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
