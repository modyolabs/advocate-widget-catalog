<template>
  <div class="funds-details-menu pt-3 pb-4 pt-md-4 px-4 px-md-0">
    <h4 class="details-body__section-title">
      {{ $t('body.funds-details') }}
    </h4>
    <p class="funds-details-menu__subtitle text-secondary">
      <span class="funds-details-menu__subtitle-item">
        {{ $t('funds.risk-profile') }}: {{ $t('funds.types.increase') }}
      </span>
      <span class="funds-details-menu__subtitle-item">
        {{ $t('funds.dynamic-fund') }}: {{ $t('funds.types.balanced') }}
      </span>
    </p>
    <div class="details-body__button-group mt-4">
      <details-body-button @click="openView('FundsCurrentPortfolio')">
        {{ $t('body.current-portfolio') }}
      </details-body-button>
      <details-body-button @click="openView('FundsChangeHistory')">
        {{ $t('funds.change.history') }}
      </details-body-button>
      <details-body-button @click="openView('FundsBalance')">
        {{ $t('funds.available-funds') }}
      </details-body-button>
    </div>
  </div>
</template>
<script>
import DetailsBodyButton from '../DetailsBodyButton.vue';

export default {
  name: 'FundsDetailsMenu',
  components: {
    DetailsBodyButton,
  },
  computed: {
    bodyView: {
      get() {
        return this.$store.state.bodyView;
      },
      set(value) {
        this.$store.commit('setBodyView', value);
      },
    },
  },
  methods: {
    openView(view) {
      this.bodyView = view;
      let subMenu = '';
      switch (view) {
        case 'FundsCurrentPortfolio':
          subMenu = this.$t('body.current-portfolio');
          break;
        case 'FundsChangeHistory':
          subMenu = this.$t('funds.change.history');
          break;
        case 'FundsBalance':
          subMenu = this.$t('funds.available-funds');
          break;
        default: break;
      }
      this.$store.commit('setBodyTitleMobile', [this.$t('body.funds-details'), subMenu]);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.funds-details-menu__subtitle-item {
  + .funds-details-menu__subtitle-item {
    &::before {
      padding: 0 .5rem;

      content: "/";
    }
  }
}
</style>
