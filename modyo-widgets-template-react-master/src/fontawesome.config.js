/* Config file for Fontawesome icons */
/* Import the icons you need to use. */
/* DOCUMENTATION: https://github.com/FortAwesome/vue-fontawesome#introduction */

// CORE LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';

// Free Regular icons
import { faComment } from '@fortawesome/free-regular-svg-icons';

// Solid icons
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Brands icons
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';

library.add(faCcVisa, faComment, faHeart);
