/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';
// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Solid icons
import {
  faSave,
  faDoorOpen,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faLightbulb,
  faTint,
  faFireAlt,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSave,
  faDoorOpen,
  faArrowLeft,
  faArrowRight,
  faCheck, faLightbulb,
  faTint,
  faFireAlt,
  faCalendar);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
