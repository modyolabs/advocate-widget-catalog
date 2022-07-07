<template>
  <m-response-control
    v-if="apiStatus"
    class="h-100 w-100 d-flex justify-content-center align-items-center"
    :status="apiStatus">
    <template #loading>
      <div
        class="loading spinner-border"
        role="status">
        <span class="sr-only">{{ $t('commons.loading') }}</span>
      </div>
    </template>
    <template #error>
      <div class="d-flex flex-column justify-content-center p-4 h-100 ">
        <h5 class="text-center">
          {{ $t('commons.try-again') }}
        </h5>
      </div>
    </template>
    <template #empty>
      <div class="d-flex flex-column justify-content-center p-4 h-100 transfer__card card rounded-sm border">
        <h5 class="text-center">
          {{ $t('account-list.no-currency-msg') }}
        </h5>
      </div>
    </template>
  </m-response-control>
  <div
    v-else
    class="transfer__card card rounded-sm border">
    <div class="card-header border-bottom p-3">
      <div class="align-items-center row no-gutters">
        <div class="col-8">
          <slot name="title" />
        </div>
        <div
          v-if="hasFilter"
          class="col pl-2 pl-xl-4">
          <multiselect
            v-model="currencyFilter"
            :options="currencies"
            :multiple="false"
            label="name"
            class="d-block"
            :searchable="false"
            select-label=""
            deselect-label=""
            selected-label=""
            :allow-empty="false" />
        </div>
      </div>
    </div>
    <div
      v-if="!filteredAccounts.length"
      class="accounts-list__empty h-100 d-flex align-items-center animated pulse">
      <div class="text-center p-4">
        <h4 v-if="accountType === 'from'">
          {{ $t('account-list.no-currency-msg') }}
        </h4>
        <h4 v-else>
          {{ $t('account-list.no-account-msg') }}
        </h4>
      </div>
    </div>
    <div
      v-else
      :class="{'no_footer': accountType === 'to'}"
      class="card-body p-0 overflow-auto">
      <div
        v-for="account in filteredAccounts"
        :key="account.id">
        <button
          v-if="!isUnselectableAccount(account)"
          :class="{'active text-white':isActiveAccount(account)}"
          class="account-list__account-btn btn btn-block
          border-bottom m-0 text-left rounded-0 py-2 animated fadeIn"
          @click="setAccount(account)">
          <span class="media align-items-center">
            <span
              class="account-list__account-type mr-3 rounded-circle d-flex
              justify-content-center align-items-center"
              :class="isActiveAccount(account)?'bg-white text-primary':'bg-light'">
              <span v-if="account.class === 'investment'">
                {{ $t('account-list.account-class.investment-abbr') }}
              </span>
              <span v-if="account.class === 'bank'">
                {{ $t('account-list.account-class.bank-abbr') }}
              </span>
            </span>
            <span class="media-body">
              {{ account.name }}
              <small
                v-if="account.class === 'bank'"
                class="d-block">
                {{ account.number }}
              </small>
            </span>
          </span>
        </button>
      </div>
    </div>
    <div
      v-if="accountType !== 'to' && balance.originValueString"
      class="card-footer d-none d-lg-block border-top">
      <div class="text-right">
        <div>
          <p class="mb-0">
            {{ $t('account-list.balance') }}
          </p>
          <h4 class="mb-0">
            <strong>{{ balance.originValue | currency(currencyFormat) }}</strong>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency, MResponseControl } from '@modyo/financial-commons';
import Multiselect from 'vue-multiselect';

export default {
  name: 'AccountsList',
  components: {
    Multiselect,
    MResponseControl,
  },
  filters: {
    currency,
  },
  props: {
    accountType: { type: String, required: true },
    hasFilter: { type: Boolean, default: false },
    balance: { type: Object, default: () => {} },
  },
  data() {
    return {
      filteredAccounts: [],
    };
  },
  computed: {
    accounts() {
      if (this.accountType === 'from') {
        return this.$store.getters.originAccounts;
      }
      return this.$store.getters.targetAccounts;
    },
    fromAccount: {
      get() {
        return this.$store.state.fromAccount;
      },
      set(value) {
        return this.$store.commit('SET_FROM_ACCOUNT', value);
      },
    },
    toAccount: {
      get() {
        return this.$store.state.toAccount;
      },
      set(value) {
        return this.$store.commit('SET_TO_ACCOUNT', value);
      },
    },
    selectedAccount() {
      if (this.accountType === 'from') {
        return this.fromAccount;
      }
      return this.toAccount;
    },
    currencyFilter: {
      get() {
        return this.$store.state.currencyFilter;
      },
      set(value) {
        this.$store.commit('SET_CURRENCY_FILTER', value);
      },
    },
    currencies() {
      return this.$store.state.currencies;
    },
    currencyFormat() {
      const format = this.$t('currency.format');
      if (this.currencyFilter.value !== 'Peso') {
        format.precision = 2;
      } else {
        format.precision = 0;
      }

      return format;
    },
    apiStatus() {
      return this.$store.state.apiStatus;
    },
  },
  watch: {
    accounts: 'filterAccounts',
    currencyFilter: 'filterAccounts',
    fromAccount(value) {
      if (value === this.toAccount) {
        this.toAccount = false;
      }
      this.$store.commit('SET_AMOUNT', 0);
    },
  },
  methods: {
    filterAccounts() {
      const vm = this;

      this.fromAccount = null;
      this.toAccount = null;
      this.$store.commit('SET_AMOUNT', 0);

      if (this.hasFilter) {
        this.filteredAccounts = this.accounts
          .filter((account) => account.currencies
            .find((aco) => aco.name === vm.currencyFilter.value && aco.amount.value > 0));
      } else {
        this.filteredAccounts = this.accounts;
      }
    },
    setAccount(account) {
      if (this.accountType === 'from') {
        this.fromAccount = account;
      }
      if (this.accountType === 'to') {
        this.toAccount = account;
      }
    },
    isUnselectableAccount(account) {
      if (this.accountType === 'to') {
        return this.fromAccount === account;
      }
      return false;
    },
    isActiveAccount(account) {
      if (this.accountType === 'to') {
        return account === this.toAccount;
      }
      return account === this.fromAccount;
    },
  },
};
</script>

<style src="animate.css/animate.min.css"></style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables";

.account-list__account-type {
  width: 40px;
  height: 40px;
}

.account-list__account-btn {
  &.active {
    background-color: $primary-80;
  }
}
</style>
