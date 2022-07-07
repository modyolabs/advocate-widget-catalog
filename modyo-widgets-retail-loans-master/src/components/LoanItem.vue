<template>
  <div>
    <div
      v-if="!viewDetails && !viewInsurancesDetails">
      <div class="d-lg-none">
        <button
          class="btn btn-link p-0 mb-4"
          @click="back">
          <font-awesome-icon
            size="sm"
            class="mr-1"
            icon="chevron-left" />
          {{ $t('loan-item.back') }}
        </button>
      </div>
      <div
        class="loans__item-summary__hero d-flex flex-lg-row flex-column justify-content-between align-items-center
        align-items-lg-end p-4 rounded">
        <div>
          <p class="h5 mb-3 text-primary text-center text-lg-left">
            {{ loan.name }}
            <small class="d-block">
              Nº {{ loan.operationNumber }}
            </small>
          </p>
          <p class="mb-0 text-center text-lg-left mt-4 mt-lg-0">
            {{ $t('loan-item.outstanding-balance') }}
          </p>
          <p class="h4 text-primary text-center text-lg-left mb-0">
            {{ loan.balance | currency(currencyFormat) }}
          </p>
        </div>
        <button
          class="btn btn-link pr-0 pt-0 mt-3 mt-lg-0"
          @click="viewDetails = true">
          {{ $t('loan-item.view-details') }}
          <font-awesome-icon
            size="sm"
            icon="chevron-right"
            class="ml-1" />
        </button>
      </div>
      <div class="py-3">
        <div v-if="loan.paidPeriods > 0">
          <m-progress-bar
            class="my-3"
            :percentage="(loan.paidPeriods * 100) / loan.periodsNumber"
            border-color="#34495e"
            height="16px">
            <template #inside>
              <span>{{ loan.paidPeriods }} / {{ loan.periodsNumber }}</span>
            </template>
          </m-progress-bar>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>{{ $t('loan-item.grant-date') }}</span>
          <span>{{ loan.beginDate | date(date.long, date.lang) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>{{ $t('loan-item.end-date') }}</span>
          <span>{{ loan.endDate | date(date.long, date.lang) }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <span>
          {{ $t('loan-item.current-fee') }}
          <small class="mb-0 text-muted d-block">
            {{ loan.paymentDate | date(date.long, date.lang) }}
          </small>
        </span>
        <span>
          <strong>{{ loan.paymentAmount | currency(currencyFormat) }}</strong>
        </span>
      </div>
      <div
        v-if="!loan.paymenPayed"
        class="d-flex flex-column justify-content-center align-items-center mt-4">
        <a
          href="#"
          class="btn btn-primary col-6 btn-block">{{ $t('loan-item.pay-fee') }}</a>
      </div>
      <div
        v-else
        class="loans__item-summary__alert-msg rounded
        d-flex flex-column flex-lg-row justify-content-center align-items-center mt-4 p-3">
        <font-awesome-icon
          class="text-primary mr-lg-4 mb-2 mb-lg-0"
          :icon="['far', 'check-circle']"
          size="2x" />
        <p class="h5 m-0 font-weight-lighter text-center text-lg-left">
          {{ $t('loan-item.month-fee-payed') }}
        </p>
      </div>
    </div>

    <div
      v-if="viewDetails && !viewInsurancesDetails">
      <div class="row no-gutters d-flex justify-content-between mb-4">
        <div class="d-flex align-items-center">
          <button
            class="btn btn-link p-0"
            @click="viewDetails = false">
            <font-awesome-icon
              class="mr-1"
              size="sm"
              icon="chevron-left" /> {{ $t('loan-item.summary.title') }}
          </button>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <button
            v-if="insurances.length"
            class="btn btn-link p-0 text-right"
            @click="viewInsurancesDetails = true">
            {{ $t('loan-item.summary.view-contracted-insurances') }} ({{ insurances.length }})
            <font-awesome-icon
              size="sm"
              icon="chevron-right"
              class="ml-1" />
          </button>
        </div>
      </div>
      <div>
        <div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.product-name') }}</span>
            <span>{{ loan.name }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.operation-number') }}</span>
            <span>{{ loan.operationNumber }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.outstanding-credit-term') }}</span>
            <span>{{ $tc('loan-item.summary.months',loan.pendingPeriods) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.granted-gross-amount') }}</span>
            <span>{{ loan.grossAmount | currency(currencyFormat) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.credit-balance') }}</span>
            <span>{{ loan.balance | currency(currencyFormat) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span v-if="loan.loanType === $t('loan-item.type.personal')">
              {{ $t('loan-item.summary.fee-value') }}
            </span>
            <span v-else-if="loan.loanType === $t('loan-item.type.mortgage')">
              {{ $t('loan-item.summary.dividend-value') }}
            </span>
            <span>{{ loan.paymentAmount | currency(currencyFormat) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.next-payment-date') }}</span>
            <span>{{ loan.paymentDate | date(date.long, date.lang) }}</span>
          </div>
          <div
            v-if="loan.loanType === $t('loan-item.type.personal')"
            class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.annual-interest-rate') }}</span>
            <span>{{ (loan.interestRate * 12).toFixed(2).replace('.', ',') }}%</span>
          </div>
          <div
            v-if="loan.loanType === $t('loan-item.type.personal')"
            class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.equivalent-annual-load') }}</span>
            <span>{{ loan.cae.replace('.', ',') }}%</span>
          </div>
          <div
            v-if="loan.loanType === $t('loan-item.type.mortgage') && !isLangEn"
            class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.current-equivalent-annual-load') }}</span>
            <span>{{ loan.caev.replace('.', ',') }}%</span>
          </div>
          <div
            v-if="loan.loanType === $t('loan-item.type.mortgage')"
            class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.current-guarantees') }}</span>
            <span>{{ loan.currentGuarantees }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.automatic-charge-in') }}</span>
            <span class="text-right">{{ loan.automaticCharge }} <br> {{ loan.chargeProductNumber }}</span>
          </div>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-between mb-2">
            <span v-if="loan.loanType === $t('loan-item.type.personal')">
              {{ $t('loan-item.summary.payed-fees-number') }}
            </span>
            <span v-else-if="loan.loanType === $t('loan-item.type.mortgage')">
              {{ $t('loan-item.summary.payed-dividends-number') }}
            </span>
            <span><strong>{{ loan.paidPeriods }}/{{ loan.periodsNumber }}</strong></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span v-if="loan.loanType === $t('loan-item.type.personal')">
              {{ $t('loan-item.summary.outstanding-fees-number') }}
            </span>
            <span v-else-if="loan.loanType === $t('loan-item.type.mortgage')">
              {{ $t('loan-item.summary.outstanding-dividends-number') }}
            </span>
            <span><strong>{{ loan.unpaidPeriods }}</strong></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.overdue-amount') }} <span v-if="!isLangEn">(UF)</span></span>
            <span><strong>{{ loan.overdueAmount | currency(currencyFormat) }}</strong></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.delayed-payment-amount') }}</span>
            <span><strong>{{ loan.delayedPaymentAmount | currency(currencyFormat) }}</strong></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.collection') }}</span>
            <span><strong>{{ loan.collectionCosts | currency(currencyFormat) }}</strong></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>{{ $t('loan-item.summary.total-delayed-payment-amount') }}</span>
            <span><strong>{{ loan.totalDelayedPaymentAmount | currency(currencyFormat) }}</strong></span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="viewInsurancesDetails">
      <button
        class="btn btn-link p-0"
        @click="viewInsurancesDetails = false">
        <font-awesome-icon
          class="mr-1"
          size="sm"
          icon="chevron-left" /> {{ $t('loan-item.summary.insurances-details-btn') }}
      </button>
      <div class="mt-4">
        <a
          v-for="insurance in insurances"
          :key="insurance.id"
          href="#"
          class="loans__item-details__download-insurance-file
          btn btn-link d-flex justify-content-between mt-3 p-3">
          <span>{{ insurance.name }}</span>
          <span>
            <span class="d-none d-lg-inline-block mr-2">{{ $t('loan-item.summary.insurances.download-btn') }}</span>
            <font-awesome-icon :icon="['far', 'file-pdf']" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { MProgressBar, currency, date } from '@modyo/financial-commons';

export default {
  name: 'LoanItem',
  filters: {
    currency,
    date,
  },
  components: {
    MProgressBar,
  },
  props: {
    loan: {
      type: Object,
      required: true,
    },
    loanType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      insurances: [],
      viewDetails: false,
      viewInsurancesDetails: false,
      date: this.$t('date.format'),
    };
  },
  computed: {
    isLangEn() {
      return this.$store.state.lang === 'en-US';
    },
    currencyFormat() {
      if (this.loanType === 'hipotecario') {
        return this.$t('currency.format.uf');
      }
      return this.$t('currency.format.standar');
    },
  },
  created() {
    this.getInsurances();
  },
  methods: {
    getInsurances() {
      this.insurances = [];
      const vm = this;
      const loanData = {
        id: this.loan.id,
      };
      this.$store.dispatch('GET_LOAN_DATA', loanData)
        .then((loan) => {
          vm.insurances = loan.data;
        }, (err) => err);
    },
    back() {
      this.$store.commit('SET_SELECTED_LOAN', null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.loans__item-summary__hero,
.loans__item-summary__alert-msg,
.loans__item-details__download-insurance-file {
  background-color: $tertiary-20;
}
@media (min-width: 992px) {
  .loans__item-summary__hero,
  .loans__item-summary__alert-msg,
  .loans__item-details__download-insurance-file {
    background-color: #fff;
  }
}
</style>
