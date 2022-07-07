/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';
// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Free Regular icons
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

// Solid icons
import {
  faCircleNotch, faCalendar, faArrowLeft, faSearch, faChevronDown, faChevronUp, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCircleNotch, faCalendar, faArrowLeft, faSearch, faChevronDown,
  faChevronUp, faExclamationTriangle, faFilePdf);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
