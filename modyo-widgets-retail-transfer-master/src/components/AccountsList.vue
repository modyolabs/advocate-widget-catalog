<template>
  <div class="accounts px-4 d-flex flex-column justify-content-between">
    <div class="accounts__list">
      <button
        v-for="account in accounts"
        :key="account.id"
        :class="{'active': isToAccount(account)}"
        :disabled="isFromAccount(account)"
        class="account-button btn btn-block text-left py-3 px-4 mb-3 rounded-lg"
        type="button"
        @click="setToAccount(account.id)">
        <div class="d-flex justify-content-between align-items-center">
          <div class="account-button__text text-capitalize">
            <p class="text-truncate mb-0 font-weight-bold">
              {{ account.accountType }}
            </p>
            <small
              class="d-block payment-info">
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
      v-if="toAccount"
      class="account__selected my-2 ">
      <div class="account__info py-3 px-4 text-right border rounded-lg">
        <p class="mb-0 text-secondary text-capitalize">
          {{ $t('account.balance') }} {{ toAccount.accountType }}
        </p>
        <p class="mb-0 h5 text-primary font-weight-bold">
          {{ toAccount.availableBalance | currency(currencyFormat) }}
        </p>
      </div>
    </div>

    <div class="account__actions d-block d-lg-none pt-4">
      <div class="">
        <button
          :disabled="!toAccount || fromAccount == toAccount"
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
    fromAccount() {
      return this.$store.getters.fromAccount || false;
    },
    toAccount() {
      return this.$store.getters.toAccount || false;
    },
    stepper() {
      return this.$store.state.stepper;
    },
  },
  methods: {
    setToAccount(account) {
      this.$store.commit('SET_TO_ACCOUNT_ID', account);
    },

    isFromAccount(account) {
      if (this.fromAccount) {
        return account === this.fromAccount;
      }
      return false;
    },

    isToAccount(account) {
      if (this.toAccount) {
        return account === this.toAccount;
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

  color: $primary-100;

  background-color: #fff;

  p {
    color: $primary-100;
  }

  &.active {
    color: #fff;

    background-color: $primary-100;

    p {
      color: #fff;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.account__info {
  height: 80px;
}
</style>
