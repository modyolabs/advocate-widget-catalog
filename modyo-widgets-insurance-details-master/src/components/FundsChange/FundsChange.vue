<template>
  <div
    id="funds-change"
    class="position-relative"
    :class="[drawerSelectorOpen ? 'selector-opened' : false]">
    <header
      class="funds-change__header sticky-top bg-white py-3 py-md-4 px-4 px-md-5
      border-bottom d-flex justify-content-between align-items-center">
      <drawer-title
        :title="{icon: 'chart-line', name: $t('funds.change.title')}"
        :details="[
          {name: $t('funds.risk-profile'), bold: $t('funds.types.increase')},
          {name: $t('funds.dynamic-fund'), bold: $t('funds.types.balanced')}
        ]"
        @close="drawer.closeDrawer" />
    </header>
    <main class="p-4 p-md-5">
      <component
        :is="fundsChange.screen"
        v-bind="{ ...successScreen }"
        @close="drawer.closeDrawer" />
    </main>
  </div>
</template>

<script>
import DrawerTitle from '../DrawerTitle.vue';
import FundsChangeSelector from './FundsChangeSelector.vue';
import FundsChangeConfirmation from './FundsChangeConfirmation.vue';
import SuccessMessage from '../SuccessMessage.vue';

export default {
  name: 'FundsChange',
  components: {
    DrawerTitle,
    FundsChangeSelector,
    FundsChangeConfirmation,
    SuccessMessage,
  },
  props: {
    drawer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    drawerSelectorOpen() {
      return this.$store.state.drawer.selectorOpen;
    },
    fundsChange() {
      return this.$store.state.fundsChange;
    },
    successScreen() {
      return {
        title: this.$t('funds.change.request.title'),
        message: this.$t('funds.change.request.message', { email: this.fundsChange.receiptEmail }),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

#funds-change {
  min-height: 100%;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 45;

    display: block;

    height: 100%;

    pointer-events: none;

    content: "";

    opacity: 0;

    transition: opacity .33s ease-in-out;
  }

  &.selector-opened {
    &::before {
      pointer-events: all;

      background-color: rgb(0, 0, 0);
      opacity: .35;
    }
  }
}

.funds-change__header {
  z-index: 25;
}
</style>
