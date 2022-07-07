<template>
  <div class="accounts px-4 d-flex flex-column justify-content-between">
    <div class="accounts__title text-left text-lg-center order-1">
      <p class="text-primary h5 font-weight-bold pb-4">
        {{ $t('account.title') }}
      </p>
    </div>

    <div class="accounts__list order-2">
      <button
        v-for="account in accounts"
        :key="account.id"
        :class="{'active': isActiveAccount(account)}"
        class="account-button btn btn-block text-left py-3 px-4 mb-3 rounded-lg"
        type="button"
        @click="setAccount(account.id)">
        <div class="d-flex justify-content-between align-items-center">
          <div class="account-button__text text-capitalize">
            <p class="text-truncate mb-0 text-primary font-weight-bold">
              {{ account.accountType }}
            </p>
            <small
              class="d-block text-primary payment-info">
              {{ account.accountNumber }}
            </small>
          </div>

          <div class="account-button__icon">
            <font-awesome-icon
              icon="chevron-right"
              size="sm" />
          </div>
        </div>
      </button>
    </div>

    <div
      v-if="activeAccount"
      class="account__selected my-2 order-3">
      <div class="account__info py-3 px-4 text-right border rounded-lg">
        <p class="mb-0 text-secondary text-capitalize">
          {{ $t('account.balance') }} {{ activeAccount.accountType }}
        </p>
        <p class="mb-0 h5 text-primary font-weight-bold">
          {{ activeAccount.availableBalance | currency(currencyFormat) }}
        </p>
      </div>
    </div>

    <div class="payment__actions d-block d-lg-none pt-4 order-4">
      <div class="">
        <button
          :disabled="!activeAccount"
          class="btn btn-primary btn-block py-3"
          @click="handleClick">
          {{ $t('actions.continue') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

export default {
  name: 'AccountsList',
  filters: {
    currency,
  },
  data() {
    return {
      currencyFormat: this.$t('currency.format'),
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
    activeAccount() {
      return this.$store.getters.activeAccount || false;
    },
    stepper() {
      return this.$store.state.stepper;
    },
  },
  methods: {
    setAccount(id) {
      this.$store.commit('SET_ACTIVE_ACCOUNT_ID', id);
    },

    isActiveAccount(account) {
      if (this.activeAccount) {
        return account === this.activeAccount;
      }
      return false;
    },

    handleClick() {
      this.stepper.next();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.account-button {
  height: 80px;

  background-color: #fff;

  &.active {
    background-color: $tertiary-40;
  }
}

.account__info {
  height: 80px;
}
</style>
