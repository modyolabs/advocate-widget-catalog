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
  faPen,
  faTrash,
  faCheckCircle,
  faReceipt,
  faTint,
  faCar,
  faRoad,
  faSchool,
  faFileInvoice,
  faBolt,
  faGasPump,
  faBuilding,
  faHospital,
  faShieldAlt,
  faCircle,
  faChevronRight,
  faWallet,
  faCreditCard,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPen,
  faTrash,
  faCheckCircle,
  faReceipt,
  faTint,
  faCar,
  faRoad,
  faSchool,
  faFileInvoice,
  faBolt,
  faGasPump,
  faBuilding,
  faHospital,
  faShieldAlt,
  faCircle,
  faChevronRight,
  faWallet,
  faCreditCard,
  faCalendar);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
