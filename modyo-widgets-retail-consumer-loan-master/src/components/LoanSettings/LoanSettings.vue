<template>
  <div
    v-if="showSettingsView"
    class="p-4 p-sm-5 d-flex flex-column d-lg-block">
    <h2 class="h5 mb-4 text-primary">
      {{ $t('main.title') }}
    </h2>
    <div class="form-group">
      <label for="amount">{{ $t('main.credit-amount') }}</label>
      <money
        id="amount"
        v-model="amount"
        v-bind="moneyOptions"
        class="d-block form-control"
        @input="calculateLoan" />
      <small class="d-block mt-2">
        {{ $t('main.minimum-credit-msg', {amount: currency(minAmount, currencyFormat)}) }}
      </small>
      <div
        v-if="showMaxMessage"
        class="mt-3 bg-light px-4 py-3 d-lg-none">
        <i18n
          path="main.credit-amount-exceeds-msg"
          tag="p"
          class="text-danger mb-0">
          <span />
          <strong class="text-primary">{{ currency(available, currencyFormat) }}</strong>
        </i18n>
        <i18n
          path="main.credit-quote-increase-request"
          tag="p"
          class="mt-1 mb-0">
          <a href="#">{{ $t('main.credit-quote-increase-request-link') }}
            <strong class="consumer-loan__request-quota-increase-link-strong">
              {{ $t('main.credit-quote-increase-request-link-strong') }}
            </strong>
          </a>
        </i18n>
      </div>
    </div>

    <div class="form-group">
      <label for="">{{ $t('main.deposit-to-account') }}:</label>
      <multiselect
        v-model="account"
        :show-no-results="false"
        :show-labels="false"
        :searchable="false"
        :options="accounts"
        :custom-label="accountLabel"
        :allow-empty="false"
        track-by="id"
        label="accountType"
        :placeholder="$t('main.select-to-account')">
        <template
          slot="option"
          slot-scope="props">
          <span class="text-capitalize">{{ props.option.accountType }} -
            <small>{{ props.option.accountNumber }}</small>
          </span>
        </template>
      </multiselect>
    </div>

    <div class="form-group">
      <label
        id="payments-lbl"
        for="payments">{{ $t('main.fees') }}</label>
      <vue-slider
        id="payments"
        v-model.number="payments"
        class="mb-5"
        :disabled="isRangeDisabled"
        :marks="paymentSteps"
        :min="1"
        :max="36"
        :dot-attrs="{ 'aria-label': $t('main.fees') }"
        tooltip="always"
        tooltip-placement="bottom"
        @change="calculateLoan" />
    </div>

    <div class="form-group">
      <label
        id="monthsGrace-lbl"
        for="monthsGrace">{{ $t('main.months-of-grace') }}</label>
      <vue-slider
        id="monthsGrace"
        v-model.number="monthsGrace"
        class="mb-5"
        :disabled="isRangeDisabled"
        :marks="monthsGraceSteps"
        :min="0"
        :max="6"
        :dot-attrs="{ 'aria-label': $t('main.months-of-grace') }"
        tooltip="always"
        tooltip-placement="bottom"
        @change="calculateLoan" />
    </div>
    <div class="form-group">
      <label for="">{{ $t('main.no-payment-dates') }}</label>
      <months-selector
        v-model="monthsNoPayment"
        :max-selectables="maxMonthsNoPayment">
        <div slot="header">
          {{ $t('main.select-month-of-no-payment',{max:maxMonthsNoPayment}) }}
        </div>
      </months-selector>
    </div>

    <div class="mb-4">
      <label>{{ $t('main.insurances') }}</label>
      <div
        class="d-flex flex-column flex-sm-row flex-lg-column flex-xl-row
              flex-fill mt-2 justify-content-start">
        <div class="checkbox-pill mb-2 mx-1">
          <input
            id="disgrace"
            v-model="disgrace"
            :disabled="isRangeDisabled"
            type="checkbox"
            @input="calculateLoan">
          <span class="checkbox-icon" />
          <label
            for="disgrace"
            class="d-flex align-items-center flex-fill justify-content-between">
            {{ $t('main.disencumbrance') }}
            <font-awesome-icon
              icon="check" />
          </label>
        </div>

        <div class="checkbox-pill mb-2 mx-1">
          <input
            id="unemployment"
            v-model="unemployment"
            :disabled="isRangeDisabled"
            type="checkbox"
            @input="calculateLoan">
          <span class="checkbox-icon" />
          <label
            for="unemployment"
            class="d-flex align-items-center flex-fill justify-content-between">
            {{ $t('main.unemployment') }}
            <font-awesome-icon
              icon="check" />
          </label>
        </div>
      </div>
    </div>

    <div class="form-group d-lg-none">
      <button
        :disabled="showMinMessage || showMaxMessage || !account"
        class="btn btn-primary btn-lg btn-block"
        @click="activeDetailInfo = true; showSettingsView=false">
        {{ $t('main.simulate') }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

import Multiselect from 'vue-multiselect';
import VueSlider from 'vue-slider-component';
import { Money } from 'v-money-no-negative';

import { currency, debounce } from '@modyo/financial-commons';
import MonthsSelector from './MonthsSelector.vue';

export default {
  name: 'LoanSettings',
  components: {
    Money,
    VueSlider,
    MonthsSelector,
    Multiselect,
  },
  filters: {
    currency,
  },
  data() {
    return {
      paymentSteps: [
        1,
        6,
        12,
        18,
        24,
        30,
        36,
      ],
      monthsGraceSteps: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
      ],
      monthsNoPayment: '',
      maxMonthsNoPayment: 2,
      currencyFormat: this.$t('currency.format'),
    };
  },
  computed: {
    ...mapState(['accounts']),
    ...mapGetters([
      'isLangEn',
      'showMinMessage',
      'showMaxMessage',
      'minAmount',
      'available',
    ]),
    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        this.$store.commit('SET_AMOUNT', value);
      },
    },
    account: {
      get() {
        return this.$store.state.account;
      },
      set(value) {
        this.$store.commit('SET_ACCOUNT', value);
      },
    },
    payments: {
      get() {
        return this.$store.state.payments;
      },
      set(value) {
        this.$store.commit('SET_PAYMENTS', value);
      },
    },
    monthsGrace: {
      get() {
        return this.$store.state.monthsGrace;
      },
      set(value) {
        this.$store.commit('SET_MONTHS_GRACE', value);
      },
    },
    disgrace: {
      get() {
        return this.$store.state.disgrace;
      },
      set(value) {
        this.$store.commit('SET_DISGRACE', value);
      },
    },
    unemployment: {
      get() {
        return this.$store.state.unemployment;
      },
      set(value) {
        this.$store.commit('SET_UNEMPLOYMENT', value);
      },
    },
    activeDetailInfo: {
      get() {
        return this.$store.state.activeDetailInfo;
      },
      set(value) {
        this.$store.commit('SET_ACTIVE_DETAIL_INFO', value);
      },
    },
    showSettingsView: {
      get() {
        return this.$store.state.showSettingsView;
      },
      set(value) {
        this.$store.commit('SET_SHOW_SETTINGS_VIEW', value);
      },
    },
    moneyOptions() {
      if (this.isLangEn) {
        return {
          prefix: '$',
          decimal: '.',
          thousands: ',',
          precision: 2,
          maxlength: this.amountMaxLength + 3,
        };
      }
      return {
        prefix: '$',
        decimal: ',',
        thousands: '.',
        precision: 0,
        maxlength: this.amountMaxLength,
      };
    },
    amountMaxLength() {
      if (this.available) {
        const availableBalanceLength = Math.round(parseFloat(this.available)).toString().length;
        const dots = Math.round(availableBalanceLength / 3); // each thousands is a dot
        return availableBalanceLength + dots;
      }
      return 9;
    },
    isRangeDisabled() {
      return (this.amount < this.minAmount);
    },
  },
  watch: {
    monthsNoPayment() {
      this.calculateLoan();
    },
  },
  methods: {
    accountLabel(account) {
      return `${account.accountType} - ${account.accountNumber}`;
    },
    calculateLoan: debounce(function getLoans() {
      const payload = {
        amount: this.amount,
        payments: this.payments,
        monthGrace: this.monthsGrace,
        monthsNoPayment: this.monthsNoPayment,
        disgrace: this.disgrace,
        unemployment: this.unemployment,
      };
      if (this.amount >= this.minAmount && this.payments > 0) {
        this.$store.dispatch('GET_LOANS', payload);
      }
    }, 200),
    currency,
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../../scss/variables";

.consumer-loan__request-quota-increase-link-strong {
  color: $primary;
  text-decoration: underline;
}
</style>
