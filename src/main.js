import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { store } from './store/store';
import routes from './routes';

import Master from './components/layouts/Master';

// Third-parties used
Vue.use(BootstrapVue);
Vue.use(VueRouter);

// Font-awesome icons
library.add(faTrash);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Events bus
// window.eventBus = new Vue();

Vue.config.productionTip = false;

// Router
const router = new VueRouter({
    routes,
    mode: 'history'
});

// Init app
new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<Master/>',
  components: { Master }
})
