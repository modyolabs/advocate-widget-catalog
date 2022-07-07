<template>
  <div
    id="mortgage-loan"
    class="mortgage-loan py-lg-5"
    :class="{'h-100': !showSettingsView}">
    <div class="mortgage-loan__container container-lg">
      <div class="mortgage-loan__row row">
        <div
          v-if="showSettingsView"
          class="col-lg-6 p-4 p-sm-5 d-flex flex-column d-lg-block">
          <h2 class="h5 mb-4 text-primary">
            {{ $t('main.title') }}
          </h2>

          <div class="form-group">
            <label for="amount">{{ $t('main.loan-amount') }}</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  {{ isLangEn ? '$' : 'UF' }}
                </span>
              </div>
              <money
                id="amount"
                v-model="amount"
                class="form-control"
                v-bind="moneyOptions"
                @input="calculateLoan" />
            </div>
            <small
              v-if="amount < minAmount"
              class="d-block">
              {{ $t('main.minimum-amount-msg',
                    {amount: currency(minAmount, currencyFormat)}) }}
            </small>
          </div>

          <div class="form-group">
            <label for="downPayment">{{ $t('main.foot') }}</label>
            <div
              class="input-group mb-2"
              :class="isRangeDisabled ? 'disabled' : ''">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  {{ isLangEn ? '$' : 'UF' }}
                </span>
              </div>
              <money
                id="downPayment"
                v-model="downPayment"
                class="form-control"
                v-bind="moneyOptions"
                :disabled="isRangeDisabled"
                @input="calculateLoan" />
            </div>
            <small
              v-if="downPayment < minDownPayment"
              class="d-block">
              {{ $t('main.minimum-foot-amount-msg',
                    {amount: currency(minDownPayment,currencyFormat)}) }}
            </small>
            <small
              v-if="downPayment >= amount"
              class="d-block">{{ $t('main.foot-exceeded-msg') }}</small>
          </div>
          <div class="form-group mb-4">
            <label for="">{{ $t('main.housing-type-title') }}</label>
            <div class="radio-pills-group d-flex mt-2">
              <span class="radio-pill flex-fill">
                <input
                  id="inlineRadio0"
                  v-model="housingType"
                  type="radio"
                  value="house"
                  @input="calculateLoan">
                <label
                  for="inlineRadio0"
                  class="text-capitalize px-5 d-block text-center">
                  {{ $t('main.housing-types.house') }}
                </label>
              </span>
              <span class="radio-pill flex-fill">
                <input
                  id="inlineRadio1"
                  v-model="housingType"
                  type="radio"
                  value="department"
                  @input="calculateLoan">
                <label
                  for="inlineRadio1"
                  class="text-capitalize d-block text-center">
                  {{ $t('main.housing-types.department') }}
                </label>
              </span>
            </div>
          </div>
          <div class="form-group">
            <label for="">{{ $t('main.terms-in-years') }}</label>
            <vue-slider
              v-model.number="loanTerm"
              class="mb-5"
              :disabled="isRangeDisabled"
              :marks="loanTermOptions"
              :min="5"
              :max="25"
              :interval="5"
              tooltip="always"
              tooltip-placement="bottom"
              :dot-attrs="{ 'aria-label': $t('main.terms-in-years') }"
              @change="calculateLoan" />
          </div>
          <div class="form-group">
            <label for="">{{ $t('main.months-of-grace') }}</label>
            <vue-slider
              v-model.number="gracePeriod"
              class="mb-5"
              :disabled="isRangeDisabled"
              :marks="gracePeriodOptions"
              :min="0"
              :max="6"
              :dot-attrs="{ 'aria-label': $t('main.months-of-grace') }"
              tooltip="always"
              tooltip-placement="bottom"
              @change="calculateLoan" />
          </div>
          <div class="mb-4">
            <label>{{ $t('main.insurances') }}</label>
            <div
              class="d-flex flex-column flex-sm-row flex-lg-column flex-xl-row
              flex-fill mt-2 justify-content-start">
              <div class="checkbox-pill mb-2 mx-1">
                <input
                  id="termLifeInsurance"
                  v-model="termLifeInsurance"
                  :disabled="isRangeDisabled"
                  type="checkbox"
                  @input="calculateLoan">
                <span class="checkbox-icon" />
                <label
                  for="termLifeInsurance"
                  class="d-flex align-items-center flex-fill justify-content-between">
                  {{ $t('main.insurances-types.term-life-insurance') }}
                  <font-awesome-icon
                    icon="check" />
                </label>
              </div>
              <div class="checkbox-pill mb-2 mx-1">
                <input
                  id="homeownersInsurance"
                  v-model="homeownersInsurance"
                  :disabled="isRangeDisabled"
                  type="checkbox"
                  @input="calculateLoan">
                <span class="checkbox-icon" />
                <label
                  for="homeownersInsurance"
                  class="d-flex align-items-center flex-fill justify-content-between">
                  {{ $t('main.insurances-types.homeowners-insurance') }}
                  <font-awesome-icon
                    icon="check" />
                </label>
              </div>

              <div class="checkbox-pill mb-2 mx-1">
                <input
                  id="unemploymentInsurance"
                  v-model="unemploymentInsurance"
                  :disabled="isRangeDisabled"
                  type="checkbox"
                  @input="calculateLoan">
                <span class="checkbox-icon" />
                <label
                  for="unemploymentInsurance"
                  class="d-flex align-items-center flex-fill justify-content-between">
                  {{ $t('main.insurances-types.unemployment-insurance') }}
                  <font-awesome-icon
                    icon="check" />
                </label>
              </div>
            </div>
          </div>

          <div class="form-group d-lg-none">
            <button
              :disabled="showMinMessage || showMaxMessage"
              class="btn btn-primary btn-lg btn-block"
              @click="activeDetailInfo = true; showSettingsView=false">
              {{ $t('main.simulate-btn') }}
            </button>
            <div
              v-if="showMaxMessage"
              class="mt-3">
              <p class="mb-0 text-muted text-center small">
                <i18n
                  path="main.maximum-loan-amount-msg">
                  <span class="d-block">
                    {{ $t('main.maximum-loan-amount-msg-inner',
                          {amount:currency(available,currencyFormat)}) }}
                  </span>
                </i18n>
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="activeDetailInfo || (!showMinMessage && !showMaxMessage)"
          class="mortgage-loan__summary col-lg-6 p-4 p-sm-5 d-lg-block"
          :class="{'d-none': showSettingsView}">
          <div v-if="!activeInfo">
            <p class="h5 mortgage-loan__simulation__title mb-4 d-flex align-items-center text-primary">
              <button
                class="d-inline-block d-lg-none btn btn-link pl-0"
                @click="activeDetailInfo=false; showSettingsView=true;">
                <font-awesome-icon icon="arrow-left" />
              </button>
              {{ $t('main.summary.title') }}
            </p>

            <div class="d-flex justify-content-between">
              <p class="mb-0">
                {{ $t('main.summary.loan-total-cost') }}:
              </p>
              <p class="ml-3 mb-0">
                {{ totalLoanAmount | currency(currencyFormat) }}
              </p>
            </div>

            <p
              v-if="!isLangEn"
              class="text-right">
              <strong>{{ totalLoanAmount * uf | currency($t('currency.format.standar')) }}</strong>
            </p>

            <div
              class="mortgage-loan__sumary-fees-container p-4 my-5 my-lg-4 d-flex justify-content-between rounded">
              <div
                class="mortgage-loan__sumary-fees-qtty p-2 p-lg-3 d-flex flex-column align-items-center">
                <p class="h1 text-primary mb-0">
                  {{ loanTerm }}
                </p>
                <p class="mb-0 h6 font-weight-light">
                  {{ $t('main.summary.years') }}
                </p>
              </div>
              <div class="d-flex flex-column justify-content-center text-right">
                <small
                  v-if="!isLangEn"
                  class="text-primary mb-1">
                  {{ monthlyAmount | currency(currencyFormat) }}
                </small>
                <p
                  v-if="!isLangEn"
                  class="text-primary text-right h3 mb-2">
                  {{ monthlyAmount * uf | currency($t('currency.format.standar')) }}
                </p>

                <p
                  v-if="isLangEn"
                  class="text-primary text-right h3 mb-2">
                  {{ monthlyAmount | currency($t('currency.format.standar')) }}
                </p>

                <p class="text-capitalize h6 font-weight-light mb-0">
                  {{ $t('main.summary.dividend-value') }}
                </p>
              </div>
            </div>

            <div class="row no-gutters text-center mb-4">
              <div class="col-4 text-break">
                <p class="mb-0 h5 font-weight-light">
                  <strong class="d-block">
                    <span>{{ annualRate }}%</span> {{ $t('main.summary.annual') }}
                  </strong>
                </p>
                <p class="mb-0">
                  {{ $t('main.summary.total-rate') }}
                </p>
              </div>
              <div
                v-if="!isLangEn"
                class="col-4 text-break">
                <p class="mb-0 h5 font-weight-light">
                  <strong class="d-block">
                    {{ cae }}%
                  </strong>
                </p>
                <p class="mb-0">
                  {{ $t('main.summary.equivalent-annual-load-abbr') }}
                </p>
              </div>
              <div class="col-4 text-break">
                <p class="mb-0 h5 font-weight-light">
                  <strong class="d-block">
                    {{ loanPercentage }}%
                  </strong>
                </p>
                <p class="mb-0">
                  {{ $t('main.summary.funding') }}
                </p>
              </div>
            </div>

            <div class="text-right d-none d-lg-block">
              <button
                class="btn mx-auto btn-link border-0 pr-0"
                @click="activeInfo = true">
                {{ $t('main.summary.view-details-btn') }}
                <font-awesome-icon
                  icon="chevron-right"
                  class="ml-2" />
              </button>
            </div>

            <div class="d-lg-none mt-5">
              <button
                class="btn mx-auto btn-secondary btn-lg btn-block border-0 pr-0"
                @click="activeInfo = true">
                {{ $t('main.summary.view-details-btn') }}
                <font-awesome-icon
                  icon="chevron-right"
                  class="ml-2 small" />
              </button>
            </div>

            <div class="pt-lg-4 text-center mt-3 mt-lg-4">
              <button
                class="btn btn-primary btn-lg btn-block">
                {{ $t('main.summary.request-loan-btn') }}
              </button>
            </div>
          </div>
          <div
            v-if="activeInfo">
            <button
              class="btn btn-link mb-3 pl-0"
              @click="activeInfo = false">
              <font-awesome-icon
                icon="chevron-left"
                class="mr-2" /> {{ $t('main.summary.details.view-summary-btn') }}
            </button>
            <div class="mb-5 mt-lg-0 mb-lg-4">
              <div class="bg-white px-3 pt-3 pb-2 rounded">
                <div class="d-flex justify-content-between mb-2">
                  <strong>{{ $t('main.summary.details.loan-amount') }}</strong>
                  <span>{{ loanAmount | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <strong>{{ $t('main.summary.details.term') }}</strong>
                  <span>{{ $t('main.summary.details.years',{years: loanTerm}) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <strong>{{ $t('main.summary.details.foot') }}</strong>
                  <span>{{ downPayment | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <strong>{{ $t('main.summary.details.dividend-value') }}</strong>
                  <div class="text-right">
                    <p
                      v-if="isLangEn"
                      class="mb-0">
                      {{ monthlyAmount | currency($t('currency.format.standar')) }}
                    </p>
                    <p
                      v-if="!isLangEn"
                      class="mb-0">
                      {{ monthlyAmount * uf | currency($t('currency.format.standar')) }}
                    </p>
                    <small
                      v-if="!isLangEn"
                      class="d-block">
                      {{ monthlyAmount | currency(currencyFormat) }}
                    </small>
                  </div>
                </div>
              </div>

              <div class="bg-white px-3 pt-3 pb-2 rounded mt-3">
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.monthly-interest-rate') }}</span>
                  <span>{{ monthlyRate }}%</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.annual-interest-rate') }}</span>
                  <span>{{ annualRate }}%</span>
                </div>
                <div
                  v-if="!isLangEn"
                  class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.equivalent-annual-load') }}</span>
                  <span>{{ cae }}% {{ $t('main.summary.details.annual') }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.funding') }}</span>
                  <span>{{ loanPercentage }}%</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.months-of-grace') }}</span>
                  <span class="text-capitalize">{{ gracePeriod }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.property-type') }}</span>
                  <span class="text-capitalize">{{ $t('main.housing-types.'+housingType) }}</span>
                </div>
              </div>

              <div class="bg-white px-3 pt-3 pb-2 rounded mt-3">
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.appraisal') }}</span>
                  <span>{{ appraisal | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.abstract-of-title') }}</span>
                  <span>{{ abstractOfTitle | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.deed') }}</span>
                  <span>{{ deed | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.notary-fee') }}</span>
                  <span>{{ notaryFee | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.summary.details.real-state-fee') }}</span>
                  <span>{{ realStateFee | currency(currencyFormat) }}</span>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12 col-lg-6 text-center text-lg-left">
                  <p class="mortgage-loan__simulator-details-total-credit-cost h5 text-primary">
                    {{ $t('main.summary.details.loan-total-cost') }}
                  </p>
                </div>
                <div
                  v-if="!isLangEn"
                  class="col-12 col-lg-6 text-center text-lg-right font-weight-normal">
                  <p class="h5 text-primary mb-0">
                    {{ totalLoanAmount * uf | currency($t('currency.format.standar')) }}
                  </p>
                  <small class="d-block text-muted">{{ totalLoanAmount | currency(currencyFormat) }}</small>
                </div>

                <div
                  v-if="isLangEn"
                  class="col-12 col-lg-6 text-center text-lg-right font-weight-normal">
                  <p class="h5 text-primary mb-0">
                    {{ totalLoanAmount | currency(currencyFormat) }}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="btn btn-primary btn-lg btn-block mt-5">
              {{ $t('main.summary.details.request-loan-btn') }}
            </button>
          </div>
        </div>
        <div
          v-else-if="!showMaxMessage && !activeDetailInfo"
          class="col-lg-6 bg-tertiary-20 p-4 p-sm-5 d-none d-lg-flex align-items-center">
          <div>
            <span class="mortgage-loan__initial-msg-icon"><font-awesome-icon icon="arrow-circle-left" /></span>
            <i18n
              path="main.initial-msg"
              tag="h3"
              class="font-weight-light h4">
              <strong class="text-primary font-weight-bold">
                {{ $t('main.initial-msg-strong') }}
              </strong>
            </i18n>
          </div>
        </div>
        <div
          v-else-if="showMaxMessage"
          class="col-lg-6 bg-tertiary-20 p-4 p-sm-5 d-none d-lg-flex
          flex-column justify-content-center align-items-center">
          <h3 class="text-center">
            <font-awesome-icon
              icon="ban"
              class="mortgage-loan__max-amount-exceeded-icon d-block mx-auto mb-4" />
            <i18n
              path="main.max-amount-exceeded-msg"
              tag="span">
              <strong class="text-primary">
                {{ $t('main.max-amount-exceeded-msg-inner',
                      {amount:currency(available,currencyFormat)}) }}
              </strong>
            </i18n>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import { Money } from 'v-money-no-negative';

import { currency, getURLParams, debounce } from '@modyo/financial-commons';

export default {
  name: 'App',
  filters: {
    currency,
  },
  components: {
    Money,
    VueSlider,
  },
  data() {
    return {
      uf: 28540,
      amount: 0,
      activeDetailInfo: false,
      showSettingsView: true,
      downPayment: 0,
      loanTerm: 20,
      loanTermOptions: [
        5,
        10,
        15,
        20,
        25,
      ],
      gracePeriod: 0,
      gracePeriodOptions: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
      ],
      housingType: 'house',
      paramClientId: parseInt(getURLParams('client'), 10) || 1,
      activeInfo: false,
    };
  },

  computed: {
    isLangEn() {
      return this.$store.state.lang === 'en-US';
    },
    minAmount() {
      if (this.isLangEn) {
        return 10000;
      }
      return 2000;
    },
    available() {
      if (this.isLangEn) {
        return 150000;
      }
      return 25000;
    },
    currencyFormat() {
      if (this.isLangEn) {
        return this.$t('currency.format.standar');
      }
      return this.$t('currency.format.uf');
    },
    minDownPayment() {
      return this.amount * 0.2;
    },
    showMinMessage() {
      return (this.amount < this.minAmount)
      || (this.downPayment < this.minDownPayment)
      || (this.downPayment >= this.amount);
    },
    showMaxMessage() {
      return (this.amount > this.available);
    },
    isRangeDisabled() {
      return (this.amount < this.minAmount);
    },
    installment() {
      return this.$store.state.installment;
    },
    annualRate() {
      return this.$store.state.annualRate;
    },
    monthlyRate() {
      return this.$store.state.monthlyRate;
    },
    monthlyAmount() {
      return this.$store.state.monthlyAmount;
    },
    loanAmount() {
      return this.$store.state.loanAmount;
    },
    loanPercentage() {
      return this.$store.state.loanPercentage;
    },
    totalLoanAmount() {
      return this.$store.state.totalLoanAmount;
    },
    loanCosts() {
      return this.$store.state.loanCosts;
    },
    percentageLoanCosts() {
      return this.$store.state.percentageLoanCosts;
    },
    equivalentMonthlyRate() {
      return this.$store.state.equivalentMonthlyRate;
    },
    cae() {
      return this.$store.state.cae;
    },
    stampTax() {
      return this.$store.state.stampTax;
    },
    notaryFee() {
      return this.$store.state.notaryFee;
    },
    realStateFee() {
      return this.$store.state.realStateFee;
    },
    appraisal() {
      return this.$store.state.appraisal;
    },
    deed() {
      return this.$store.state.deed;
    },
    abstractOfTitle() {
      return this.$store.state.abstractOfTitle;
    },
    unemploymentInsurance: {
      get() {
        return this.$store.state.unemploymentInsurance;
      },
      set(value) {
        this.$store.commit('SET_UNEMPLOYMENT_INSURANCE', value);
      },
    },
    homeownersInsurance: {
      get() {
        return this.$store.state.homeownersInsurance;
      },
      set(value) {
        this.$store.commit('SET_HOMEOWNERS_INSURANCE', value);
      },
    },
    termLifeInsurance: {
      get() {
        return this.$store.state.termLifeInsurance;
      },
      set(value) {
        return this.$store.commit('SET_TERM_LIFE_INSURANCE', value);
      },
    },
    moneyOptions() {
      if (this.isLangEn) {
        return {
          decimal: '.',
          thousands: ',',
          precision: 2,
          maxlength: this.amountMaxLength + 3, // Comma + 2 digits for decimals
        };
      }
      return {
        decimal: ',',
        thousands: '.',
        precision: 0,
        maxlength: this.amountMaxLength,
      };
    },
    amountMaxLength() {
      if (this.available) {
        const availableBalanceLength = Math.round(parseFloat(this.available)).toString().length;
        // each thousands is a dot, removed 1 character that is for the $ sign, not needed for this case
        const dots = Math.round(availableBalanceLength / 3) - 1;
        return availableBalanceLength + dots;
      }
      return 9;
    },
  },
  methods: {
    currency,
    calculateLoan: debounce(function getLoan() {
      const payload = {
        amount: this.amount,
        downPayment: this.downPayment,
        loanTerm: this.loanTerm,
        gracePeriod: this.gracePeriod,
        termLifeInsurance: this.termLifeInsurance,
        unemploymentInsurance: this.unemploymentInsurance,
        homeownersInsurance: this.homeownersInsurance,
      };
      if (!this.showMinMessage && !this.showMaxMessage && this.downPayment >= this.minDownPayment) {
        this.$store.dispatch('GET_MORTGAGE_LOAN', payload);
      }
    }, 200),
  },
};
</script>

<style lang="scss">
.multiselect .multiselect__placeholder,
.multiselect .multiselect__single,
.multiselect .multiselect__input {
  text-transform: capitalize;
}
@media (max-width: 575.98px) {
  .multiselect .multiselect__placeholder,
  .multiselect .multiselect__single,
  .multiselect .multiselect__input {
    font-size: .8rem;
  }
}
</style>

<style lang="scss" scoped>
@import "./scss/variables";

.mortgage-loan__container {
  background-color: #fff;
}

.mortgage-loan__summary {
  background-color: #fff;
}

.mortgage-loan__sumary-fees-container {
  background-color: $tertiary-20;
}

.mortgage-loan__sumary-fees-qtty {
  background-color: #fff;
}

.mortgage-loan__simulator-details-total-credit-cost {
  font-weight: bolder;
}

.mortgage-loan__initial-msg-icon {
  position: absolute;
  top: 50%;
  left: 0;

  display: flex;

  align-items: center;

  margin-top: -24px;
  margin-left: -24px;

  font-size: 48px;
  color: $primary;

  background-color: #fff;
  border-radius: 50%;
}

.mortgage-loan__max-amount-exceeded-icon {
  font-size: 5rem;
}

.mortgage-loan__request-quota-increase-link {
  color: inherit;
}

.mortgage-loan__request-quota-increase-link:hover,
.mortgage-loan__request-quota-increase-link:focus {
  color: inherit;
  text-decoration: none;

  .mortgage-loan__request-quota-increase-link-strong {
    color: $primary-dark;
  }
}

.mortgage-loan__request-quota-increase-link-strong {
  color: $primary;
  text-decoration: underline;
}

@media (max-width: 991.98px) {
  .mortgage-loan {
    background-color: #fff;
  }

  .mortgage-loan__simulation__title {
    font-size: 1.5rem;
  }
}

@media (min-width: 992px) {
  .mortgage-loan__summary {
    background-color: $tertiary-20;
  }

  .mortgage-loan__sumary-fees-container {
    background-color: #fff;
  }

  .mortgage-loan__sumary-fees-qtty {
    background-color: transparent;
    border: 1px solid $primary-10;
  }

  .mortgage-loan__simulator-details-total-credit-cost {
    font-weight: 500;
  }
}
</style>
