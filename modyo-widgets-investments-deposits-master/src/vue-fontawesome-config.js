import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faCircleNotch, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCheck, faCircleNotch, faArrowLeft);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
