<template>
  <div
    id="loans-app"
    class="py-lg-5 h-100">
    <div class="container-lg bg-white">
      <m-response-control
        v-if="apiStatus"
        class="accounts__container container-lg text-center py-5"
        :status="apiStatus">
        <template #loading>
          <div
            class="loading spinner-border"
            role="status">
            <span class="sr-only">{{ $t('commons.loading') }}</span>
          </div>
        </template>
        <template #error>
          <div class="d-flex flex-column justify-content-center p-4 h-100">
            <h5 class="text-center">
              {{ $t('commons.try-again') }}
            </h5>
          </div>
        </template>
        <template #empty>
          <div class="d-flex flex-column justify-content-center p-4 h-100">
            <h5 class="text-center">
              {{ $t('commons.empty') }}
            </h5>
          </div>
        </template>
      </m-response-control>
      <div
        v-if="loans && !apiStatus"
        class="row">
        <div
          class="col-lg-4 p-4 p-xl-5 d-lg-block"
          :class="selectedLoan ? 'd-none' : ''">
          <h1 class="h5 loans__title text-primary mb-4">
            {{ $t('main.title') }}
          </h1>
          <div
            id="loans-tab"
            class="loans__nav nav flex-column nav-pills"
            role="tablist"
            aria-orientation="vertical">
            <a
              v-for="(loan,index) in loans"
              :id="`nav-loans-${loan.id}`"
              :key="loan.id"
              class="loans__nav-link nav-link d-flex justify-content-between align-items-center"
              :class="{'active': index==0, 'mb-3': index!=loans.length-1}"
              data-toggle="pill"
              :href="`#loan-summary-${loan.id}`"
              role="tab"
              aria-controls="v-pills-home"
              :aria-selected="index==0"
              @click="selectLoan(loan)">
              <span>
                {{ loan.name }}
                <small class="d-block text-tertiary">Nº {{ loan.operationNumber }}</small>
              </span>
              <font-awesome-icon icon="chevron-right" />
            </a>
          </div>
        </div>
        <div
          :class="selectedLoan ? '' : 'd-none'"
          class="loans__item-content
          col-lg-8 d-lg-block p-4 p-xl-5">
          <div
            v-if="loans.length>0"
            id="loans-summary"
            class="tab-content">
            <div
              v-for="(loan,index) in loans"
              :id="`loan-summary-${loan.id}`"
              :key="loan.id"
              class="tab-pane fade"
              :class="index==0 ? 'show active' : false"
              role="tabpanel"
              :aria-labelledby="`nav-loans-${loan.id}`">
              <loan-item
                :key="loan.id"
                :loan="loan"
                :loan-type="loan.loanType" />
            </div>
          </div>
          <div
            v-else
            class="align-middle">
            <i18n
              path="main.pre-approved-loan"
              tag="h4">
              <strong class="text-primary">{{ $t('main.pre-approved-loan-strong') }}</strong>
            </i18n>
            {{ preAprov | currency(currencyFormat) }}
            <p>{{ $t('main.pre-approved-loan-sub-msg') }}</p>
            <a
              href="#"
              class="btn btn-primary">{{ $t('main.request-btn') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency, getURLParams, MResponseControl } from '@modyo/financial-commons';

import LoanItem from './components/LoanItem.vue';

export default {
  name: 'App',
  filters: {
    currency,
  },
  components: {
    LoanItem,
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    selectedLoan() {
      return this.$store.state.selectedLoan;
    },
    loans() {
      return this.$store.state.loans;
    },
    isLoadingLoans() {
      return this.$store.state.isLoadingLoans;
    },
    isLangEn() {
      return this.$store.state.lang === 'en-US';
    },
    preAprov() {
      if (this.isLangEn) {
        return 100000;
      }
      return 20000000;
    },
    currencyFormat() {
      if (this.isLangEn) {
        return this.$t('currency.format.standar');
      }
      return this.$t('currency.format.uf');
    },
  },

  created() {
    this.apiStatus = 'isLoading';
    const client = parseInt(getURLParams('client'), 10) || 1;
    this.$store.commit('SET_PARAM_CLIENT_ID', client);
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },

  methods: {
    selectLoan(loan) {
      this.$store.commit('SET_SELECTED_LOAN', loan);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

#loans-app {
  background-color: #fff;
}

.loans__item-content {
  background-color: #fff;
}

@media (min-width: 992px) {
  #loans-app {
    height: auto;

    background-color: transparent;
  }

  .loans__item-content {
    background-color: $tertiary-20;
  }
}
</style>
