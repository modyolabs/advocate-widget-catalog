/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faSave,
  faDoorOpen,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faInfoCircle,
  faCalendar,
  faLightbulb,
  faTint,
  faFireAlt,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSave,
  faDoorOpen,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faInfoCircle,
  faCalendar,
  faLightbulb,
  faTint,
  faFireAlt,
);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
