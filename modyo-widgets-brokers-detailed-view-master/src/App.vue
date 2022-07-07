<template>
  <div class="h-100">
    <component :is="currentView" />
    <email-modal />
  </div>
</template>
<script>

import DetailedView from './components/DetailedView.vue';
import EmailSentView from './components/EmailSentView.vue';
import EmailModal from './components/EmailModal.vue';

export default {
  name: 'DetailedViewManager',
  components: {
    DetailedView,
    EmailSentView,
    EmailModal,
  },
  computed: {
    currentView() {
      if (this.$store.state.signEmailSent) return 'EmailSentView';
      return 'DetailedView';
    },
  },
};
</script>
