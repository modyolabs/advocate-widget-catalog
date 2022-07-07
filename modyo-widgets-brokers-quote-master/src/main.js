/* eslint-disable global-require */
import $ from 'jquery';
import Vue from 'vue';
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

Vue.directive('tooltip', (el, binding) => {
  $(el).tooltip({
    title: binding.value,
    placement: binding.arg,
    trigger: 'hover',
  });
});

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#brokers-quote');
