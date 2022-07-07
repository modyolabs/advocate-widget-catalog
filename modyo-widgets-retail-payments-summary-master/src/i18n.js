import Vue from 'vue';
import VueI18n from 'vue-i18n';

import es from 'vee-validate/dist/locale/es.json';
import en from 'vee-validate/dist/locale/en.json';

import liquidParser from './liquid/liquidParser';

Vue.use(VueI18n);

const LANG = liquidParser.parse('{{site.language}}');

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });

  messages.es = {
    ...messages.es,
    validations: es.messages,
  };

  messages.en = {
    ...messages.en,
    validations: en.messages,
  };

  return messages;
}

export default new VueI18n({
  locale: LANG,
  globalInjection: true,
  fallbackLocale: 'es',
  messages: loadLocaleMessages(),
});
