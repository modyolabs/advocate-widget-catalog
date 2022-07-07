<template>
  <div
    class="credit-card__info d-flex flex-column justify-content-start">
    <div class="credit-card__debt px-4 pt-4 px-xl-5">
      <div
        v-if="!isLangEn"
        class="custom-control custom-radio mb-4">
        <input
          :id="`card-${card.id}-national`"
          v-model="selectedDebt"
          value="national"
          type="radio"
          class="custom-control-input">
        <label
          class="custom-control-label d-flex justify-content-between"
          :for="`card-${card.id}-national`">

          <p class="mb-0">
            {{ $t('card.national-debt') }}
          </p>

          <p class="mb-0">
            <strong>{{ card.usedQuotaCLP | currency(currencyFormat) }}</strong>
          </p>
        </label>
      </div>

      <div class="custom-control custom-radio">
        <input
          :id="`card-${card.id}-international`"
          v-model="selectedDebt"
          value="international"
          type="radio"
          class="custom-control-input">
        <label
          class="custom-control-label d-flex justify-content-between"
          :for="`card-${card.id}-international`">

          <p class="mb-0">
            {{ $t('card.international-debt') }}
          </p>

          <p class="mb-0">
            <strong>{{ card.usedQuotaUSD | currency(currencyFormat) }}</strong>
          </p>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

export default {
  name: 'CreditCardInfo',
  filters: {
    currency,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currencyFormat: this.$t('currency.format'),
    };
  },
  computed: {
    selectedDebt: {
      get() {
        return this.$store.state.selectedDebt;
      },
      set(value) {
        this.$store.commit('SET_SELECTED_DEBT', value);
        this.$store.commit('SET_ACTIVE_ACCOUNT_ID', null);
        this.$store.commit('SET_AMOUNT_OPTION', null);
        this.$store.commit('SET_AMOUNT', 0);
        this.$emit('resetStepper');
      },
    },
    last4numbers() {
      return this.card.cardNumber.substr(-4, 4);
    },

    isLangEn() {
      return this.$store.state.lang === 'en';
    },
  },
};
</script>

<style lang="scss" scoped>
  .credit-card__info {
    height: 100%;
    overflow: auto;
  }
</style>
