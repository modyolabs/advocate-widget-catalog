import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faChevronRight, faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import { } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronRight, faChevronDown);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
