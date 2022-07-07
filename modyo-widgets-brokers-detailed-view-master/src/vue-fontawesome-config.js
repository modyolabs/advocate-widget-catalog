/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';
// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Solid icons
import {
  faUpload,
  faCircle,
  faLightbulb,
  faTint,
  faFireAlt,
  faDoorOpen,
  faCheckCircle,
  faDownload,
  faAngleDoubleDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faUpload,
  faCircle,
  faLightbulb,
  faTint,
  faFireAlt,
  faDoorOpen,
  faCheckCircle,
  faDownload,
  faAngleDoubleDown,
  faEye,
);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
