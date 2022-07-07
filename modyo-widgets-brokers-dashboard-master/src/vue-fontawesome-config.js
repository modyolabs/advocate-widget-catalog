/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

import Vue from 'vue';
// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Regular icons
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

// Solid icons
import {
  faChevronLeft, faChevronDown, faBell, faSearch, faFilter, faSortAmountDownAlt,
  faPencilAlt, faCircle, faEllipsisV, faUpload, faEye, faTimes,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft, faChevronDown, faBell, faSearch, faFilter, faCalendar, faSortAmountDownAlt,
  faPencilAlt, faCircle, faEllipsisV, faUpload, faEye, faTimes);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
