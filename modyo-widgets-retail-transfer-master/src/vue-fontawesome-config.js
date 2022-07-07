/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';
// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Free Regular icons
import { } from '@fortawesome/free-regular-svg-icons';

// Solid icons
import {
  faChevronRight, faCheck, faChevronLeft, faArrowLeft, faCheckCircle, faCalendar, faSearch, faUser,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCcVisa, faCcMastercard, faChevronRight,
  faChevronLeft, faCheck, faCheckCircle, faArrowLeft,
  faCalendar, faSearch, faUser);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
