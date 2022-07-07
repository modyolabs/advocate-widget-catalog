import Vue from 'vue';

import { Chart, registerables } from 'chart.js';
import VComp from '@vue/composition-api';
import { currency } from '@fc-filters';

import App from './App.vue';
import store from './store';
import i18n from './i18n';
import './vee-validate-config';
import './vue-fontawesome-config';
import 'bootstrap';
import './scss/custom.scss';

Chart.register(...registerables);
Vue.use(VComp);
Vue.filter('currency', currency);

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#retail-accounts-overview');
