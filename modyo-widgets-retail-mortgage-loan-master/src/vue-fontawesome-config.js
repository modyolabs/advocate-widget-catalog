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
  faArrowLeft, faChevronRight, faChevronLeft, faArrowCircleLeft, faBan, faCheck,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowLeft, faChevronRight, faChevronLeft, faArrowCircleLeft, faBan, faCheck);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
