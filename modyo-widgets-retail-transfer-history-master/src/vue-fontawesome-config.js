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
  faPencilAlt, faTrashAlt, faChevronDown, faFilePdf, faChevronRight, faChevronLeft, faPlusCircle,
  faCalendar, faBan, faSearch, faExclamationTriangle, faArrowLeft, faUser, faTimes,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPencilAlt,
  faTrashAlt,
  faChevronDown,
  faFilePdf,
  faChevronRight,
  faChevronLeft,
  faPlusCircle,
  faCalendar,
  faBan,
  faSearch,
  faExclamationTriangle,
  faArrowLeft,
  faUser,
  faTimes);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
