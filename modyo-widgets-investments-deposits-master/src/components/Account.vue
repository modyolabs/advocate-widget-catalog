<template>
  <div
    :data-account="account.id"
    class="account py-4 py-lg-3 px-lg-2 px-3">
    <div
      :class="account.class.toLowerCase()"
      class="account__container my-lg-2">
      <div class="account__info p-lg-4 p-3 w-100 h-100 text-center d-flex flex-column justify-content-between">
        <div class="mt-2">
          <p class="h5 mb-1 account__name text-capitalize text-primary font-weight-bold ">
            {{ account.name }}
          </p>
          <p class="h6 mb-0 account__number">
            Nº {{ account.id }}
          </p>
        </div>

        <div class="mt-4">
          <p
            v-for="accountCurrency in account.currencies"
            :key="accountCurrency.id"
            class="h5 mb-0 account__available-amount text-primary font-weight-bold mb-2">
            {{ accountCurrency.amount.originValueString }}
          </p>
          <small class="account__available-text d-block mt-4 text-muted">
            {{ $t('accounts-slider.available-balance') }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

export default {
  name: 'Account',
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
      status: this.account.status,
      currencyFormat: this.$t('currency.format'),
    };
  },
};
</script>

<style lang="scss" scoped>
.account__container {
  position: relative;

  max-width: 320px;
  margin: 0 auto;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .2);

  .account__info {
    position: relative;
    z-index: 100;
  }

  .account__number {
    font-size: 16px;
    letter-spacing: .1em;
    white-space: nowrap;
  }
}
</style>
