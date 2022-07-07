/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

/* Config file for VeeValidate */
/* Import and extend the rules you need to use. */

import {
  extend,
  configure,
} from 'vee-validate';
import {
  min,
  required,
  min_value,
  max_value,
} from 'vee-validate/dist/rules';

import i18n from './i18n';

configure({
  defaultMessage: (_, values) => i18n.t(`validations.${values._rule_}`, values),
});

extend('min', min);
extend('min_value', min_value);
extend('max_value', max_value);
extend('required', required);
