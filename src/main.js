import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { store } from './store/store';

window.eventBus = new Vue();

library.add(faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
