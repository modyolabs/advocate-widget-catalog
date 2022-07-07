<template>
  <div
    :data-account="account.id"
    class="account pt-4 pb-2 px-3 px-sm-0">
    <div
      :class="account.accountType.toLowerCase()"
      class="account__container mb-3">
      <div class="account__info p-4 w-100 h-100 text-center d-flex flex-column justify-content-between">
        <div class="mt-2">
          <p class="h5 mb-1 account__name text-capitalize text-primary font-weight-bold ">
            {{ account.accountType }}
          </p>
          <p class="h6 mb-0 account__number">
            Nº {{ account.accountNumber }}
          </p>
        </div>

        <div class="mb-2">
          <p class="h3 mb-0 account__available-amount text-primary font-weight-bold">
            {{ account.availableBalance | currency(currencyFormat) }}
          </p>
          <p class="mb-0 account__available-text">
            {{ $t('account.available') }}
          </p>
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
  height: 200px;
  margin: 0 auto;

  background: #fff;

  border-radius: 20px;

  box-shadow: 0 0 15px rgba(0, 0, 0, .2);

  .account__info {
    position: relative;
    z-index: 100;
  }

  .account__number {
    font-size: 16px;
    letter-spacing: 1px;
    white-space: nowrap;
  }
}
</style>
