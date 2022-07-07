import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircle, faChevronRight, faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCircle, faChevronRight, faChevronLeft);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
