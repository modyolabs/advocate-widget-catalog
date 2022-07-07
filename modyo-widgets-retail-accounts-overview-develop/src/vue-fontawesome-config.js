/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */
import Vue from 'vue';

// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Free Regular icons
import {
  faLightbulb,
  faEye,
  faEyeSlash,
  faCalendar,
  faCircle as farCircle,
} from '@fortawesome/free-regular-svg-icons';

// Solid icons
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faSearch,
  faExclamationTriangle,
  faCircle,
  faEllipsisV,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faArrowDown,
  faArrowUp,
  faEquals,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faLightbulb,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faArrowDown,
  faArrowUp,
  faEye,
  faEyeSlash,
  faSearch,
  faExclamationTriangle,
  faCircle,
  farCircle,
  faEllipsisV,
  faEquals,
  faCalendar,
  faCheck,
);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
