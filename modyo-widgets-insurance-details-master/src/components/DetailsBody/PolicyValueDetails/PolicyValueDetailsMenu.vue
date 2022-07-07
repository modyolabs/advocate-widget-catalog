<template>
  <div class="policy-value-details-menu py-3 py-md-4 px-4 px-md-0">
    <h4 class="details-body__section-title">
      {{ $t('body.policy-value-details') }} *
    </h4>
    <div class="details-body__button-group mt-4">
      <details-body-button @click="openView('PolicyBalance')">
        <div class="d-none d-md-flex flex-column align-items-start">
          {{ $t('commons.last-balance') }}
          <span class="policy-value-details-menu__secondary-text">
            {{ $t('commons.at-date', {date: policy.date }) }}
          </span>
        </div>
        <div class="d-none d-md-flex">
          {{ $t('commons.total') }}
          <span
            v-for="(lastValueCurrency, index) in policy.lastValue"
            :key="index"
            class="policy-value-details-menu__currency-value text-uppercase ml-1">
            {{ lastValueCurrency.currency }}
            {{ lastValueCurrency.amount | currency(currencyFormat) }}
          </span>
        </div>
        <span class="d-md-none">
          {{ $t('commons.last-balance') }}
        </span>
      </details-body-button>
      <details-body-button @click="openView('PolicyValueHistory')">
        <div class="d-none d-md-flex flex-column align-items-start">
          {{ $t('policy.historical-value') }}
          <span class="policy-value-details-menu__secondary-text">
            {{ $t('commons.last-balance-at', {date: policy.historicalValue.lastBalance.date} ) }}
          </span>
        </div>
        <span class="d-md-none">
          {{ $t('policy.historical-value') }}
        </span>
      </details-body-button>
    </div>
  </div>
</template>
<script>
import { currency } from '@modyo/financial-commons';
import DetailsBodyButton from '../DetailsBodyButton.vue';

export default {
  name: 'PolicyValueDetailsMenu',
  filters: {
    currency,
  },
  components: {
    DetailsBodyButton,
  },
  data() {
    return {
      currencyFormat: {
        decimal: ',',
        formatWithSymbol: false,
        precision: 2,
        separator: '.',
      },
    };
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
    policy() {
      return this.$store.state.policy;
    },
  },
  methods: {
    openView(view) {
      this.bodyView = view;
      let subMenu = '';
      switch (view) {
        case 'PolicyBalance':
          subMenu = this.$t('commons.last-balance');
          break;
        case 'PolicyValueHistory':
          subMenu = this.$t('policy.historical-value');
          break;
        default: break;
      }
      this.$store.commit('setBodyTitleMobile', [this.$t('body.policy-value-details'), subMenu]);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.policy-value-details-menu__secondary-text {
  font-size: .875em;
}

.policy-value-details-menu__currency-value {
  + .policy-value-details-menu__currency-value {
    &::before {
      display: inline-block;

      padding-right: .5rem;
      padding-left: .5rem;

      color: inherit;

      content: "/";
    }
  }
}
</style>
