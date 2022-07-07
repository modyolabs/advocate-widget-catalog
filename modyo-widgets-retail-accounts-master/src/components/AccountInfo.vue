<template>
  <div
    class="account__info d-flex flex-column justify-content-between h-100">
    <div class="account__summary py-4 border-bottom">
      <div class="px-4 px-xl-5">
        <div class="d-flex justify-content-between">
          <p class="text-secondary">
            {{ $t('account.charges') }}
          </p>
          <p class="text-secondary font-weight-bold ">
            {{ account.totalCharges | currency(currencyFormat) }}
          </p>
        </div>

        <div class="d-flex justify-content-between">
          <p class="mb-0 text-secondary">
            {{ $t('account.deposits') }}
          </p>
          <p class="mb-0 text-secondary font-weight-bold ">
            {{ account.totalIncomes | currency(currencyFormat) }}
          </p>
        </div>
      </div>
    </div>

    <div class="account__actions px-4 px-xl-5 py-4">
      <div class="mb-2 mb-lg-0">
        <a
          href=""
          class="btn btn-primary btn-block font-weight-bold py-3"
          @click.prevent="">
          {{ $t('account.transfer') }}
        </a>
      </div>

      <div class="d-lg-none">
        <button
          class="btn btn-secondary btn-block py-3"
          @click="showMovements = true">
          {{ $t('account.view-transactions') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

export default {
  name: 'AccountInfo',
  filters: {
    currency,
  },

  props: {
    account: {
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
    percentageCLP() {
      return Math.floor((this.account.usedQuotaCLP / this.account.totalQuotaCLP) * 100);
    },
    showMovements: {
      get() {
        return this.$store.state.showMovements;
      },
      set(val) {
        this.$store.commit('SET_SHOW_MOVEMENTS', val);
      },
    },
  },
};
</script>
