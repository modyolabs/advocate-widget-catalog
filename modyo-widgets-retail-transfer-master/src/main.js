/* eslint-disable global-require */
import Vue from 'vue';
import { formatRut } from '@modyo/financial-commons';
import App from './App.vue';
import store from './store';
import i18n from './i18n';
import './vee-validate-config';
import './vue-fontawesome-config';
import 'bootstrap';
import './scss/custom.scss';

if (process.env.NODE_ENV === 'development') {
  const VueAxe = require('vue-axe').default;
  Vue.use(VueAxe, {
    clearConsoleOnUpdate: false,
  });
}

Vue.config.productionTip = false;

Vue.directive('rut', formatRut);

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#retail-transfer');
