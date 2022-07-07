/* eslint-disable global-require */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import i18n from './i18n';
import './vee-validate-config';
import './vue-fontawesome-config';
import 'bootstrap/dist/js/bootstrap.bundle';
import './scss/custom.scss';
import currency from './filters/currency';

Vue.filter('currency', currency);

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#retail-payment-summary');
