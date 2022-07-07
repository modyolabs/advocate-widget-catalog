/* eslint-disable global-require */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import i18n from './i18n';
import 'bootstrap';
import './vee-validate-config';
import './vue-fontawesome-config';
import './scss/custom.scss';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  const VueAxe = require('vue-axe').default;
  Vue.use(VueAxe, {
    clearConsoleOnUpdate: false,
  });
}

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#brokers-detailed-view');
