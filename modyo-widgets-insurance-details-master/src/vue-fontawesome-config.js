/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';
// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Regular icons
import { } from '@fortawesome/free-regular-svg-icons';

// Solid icons
import {
  faArrowLeft,
  faChartLine,
  faFileAlt,
  faFileDownload,
  faTimes,
  faPlus,
  faCheckCircle,
  faCalendar,
  faDownload,
  faEnvelope,
  faHandHoldingUsd,
  faCircle,
  faInfoCircle,
  faChevronRight,
  faChevronDown,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faArrowLeft,
  faChartLine,
  faFileAlt,
  faFileDownload,
  faTimes,
  faPlus,
  faCheckCircle,
  faCalendar,
  faDownload,
  faEnvelope,
  faHandHoldingUsd,
  faCircle,
  faInfoCircle,
  faChevronRight,
  faChevronDown,
  faShieldAlt,
);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
