<template>
  <div>
    <p class="consumer-loan__simulation__title h5 mb-4 d-flex align-items-center text-primary">
      <button
        class="d-inline-block d-lg-none btn btn-link pl-0"
        @click="activeDetailInfo=false; showSettingsView=true;">
        <font-awesome-icon icon="arrow-left" />
      </button>
      {{ $t('main.simulation-summary.title') }}
    </p>

    <div class="d-flex justify-content-between">
      <p class="mb-0">
        {{ $t('main.simulation-summary.credit-total-cost') }}:
      </p>
      <p class="ml-3 mb-0">
        <strong>{{ totalLoanAmount | currency($t('currency.format')) }}</strong>
      </p>
    </div>

    <div
      class="consumer-loan__sumary-fees-container p-4 my-5 my-lg-4 d-flex justify-content-between rounded">
      <div
        v-if="payments > 1"
        class="consumer-loan__sumary-fees-qtty p-2 p-lg-3 d-flex flex-column align-items-center">
        <p class="h1 text-primary mb-0">
          {{ payments }}
        </p>
        <p class="mb-0 h6 font-weight-light">
          {{ $t('main.simulation-summary.fees') }}
        </p>
      </div>
      <div
        v-else
        class="p-3 d-flex flex-column align-items-center">
        <p>
          <i18n
            path="main.simulation-summary.no-fees">
            <br>
          </i18n>
        </p>
      </div>
      <div class="d-flex flex-column justify-content-center text-right">
        <p class="text-primary d-none d-lg-block h3">
          {{ monthlyAmount | currency($t('currency.format')) }}
        </p>
        <p class="text-primary d-lg-none h5">
          {{ monthlyAmount | currency }}
        </p>
        <p class="text-capitalize h6 font-weight-light">
          {{ $t('main.simulation-summary.fee-value') }}
        </p>
      </div>
    </div>

    <div class="row text-center mb-4">
      <div class="col-6">
        <p class="mb-0 h5 font-weight-light">
          <strong>
            <span class="d-block">{{ interestRate }}%</span> {{ $t('main.simulation-summary.monthly') }}
          </strong>
        </p>
        <p class="mb-0">
          {{ $t('main.simulation-summary.interest-rate') }}
        </p>
      </div>
      <div class="col-6">
        <p class="mb-0 h5 font-weight-light">
          <strong>
            <span class="d-block">{{ annualRate }}%</span> {{ $t('main.simulation-summary.yearly') }}
          </strong>
        </p>
        <p class="mb-0">
          {{ $t('main.simulation-summary.total-tax') }}
        </p>
      </div>
    </div>

    <div class="text-right d-none d-lg-block">
      <button
        class="btn mx-auto btn-link border-0 pr-0"
        @click="showSimulationDetails = true">
        {{ $t('main.simulation-summary.view-detail-btn') }}
        <font-awesome-icon
          icon="chevron-right"
          class="ml-2" />
      </button>
    </div>

    <div class="d-lg-none mt-5">
      <button
        class="btn mx-auto btn-secondary btn-lg btn-block border-0 pr-0"
        @click="showSimulationDetails = true">
        {{ $t('main.simulation-summary.view-detail-btn') }}
        <font-awesome-icon
          icon="chevron-right"
          class="ml-2" />
      </button>
    </div>

    <div class="pt-lg-4 text-center mt-3 mt-lg-4">
      <button
        class="btn btn-primary btn-lg btn-block">
        {{ $t('main.simulation-summary.request-advance-btn') }}
      </button>
    </div>
  </div>
</template>
<script>
import { currency } from '@modyo/financial-commons';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'SimulationSummary',
  filters: {
    currency,
  },
  computed: {
    ...mapState([
      'monthsGrace',
      'amount',
      'interestRate',
      'annualRate',
      'monthlyAmount',
      'totalLoanAmount',
      'cae',
      'stampTax',
      'notaryFee',
      'disgraceInsurance',
      'unemploymentInsurance',
      'account',
      'payments',
      'disgrace',
      'unemployment',
    ]),
    ...mapGetters(['isLangEn']),
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
    showSimulationDetails: {
      get() {
        return this.$store.state.showSimulationDetails;
      },
      set(value) {
        this.$store.commit('SET_SHOW_SIMULATION_DETAILS', value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.consumer-loan__sumary-fees-container {
  background-color: $tertiary-20;
}

.consumer-loan__sumary-fees-qtty {
  background-color: #fff;
}

@media (min-width: 992px) {
  .consumer-loan__sumary-fees-container {
    background-color: #fff;
  }

  .consumer-loan__sumary-fees-qtty {
    background-color: transparent;
    border: 1px solid $primary-10;
  }
}
</style>
