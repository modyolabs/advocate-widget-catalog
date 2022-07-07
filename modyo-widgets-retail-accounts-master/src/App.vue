<template>
  <div
    id="accounts-app"
    clasS="accounts container-fluid container-lg px-0 py-lg-4 py-xl-5 h-100">
    <div class="row no-gutters h-100">
      <div class="accounts__sidebar d-flex flex-column col-12 col-lg-5 h-100 overflow-auto">
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
          v-else
          class="accounts__slider-wrapper pb-4">
          <div
            ref="accounts-slider"
            class="accounts__slider">
            <account
              v-for="account in accounts"
              ref="accounts-slide"
              :key="`account-${account.id}`"
              :account="account"
              class="accounts__slide" />
          </div>
          <div class="accounts-slider__indicators px-4 d-flex justify-content-center h-100">
            <span
              v-for="(account, index) in accounts"
              :key="`indicator-${index}`"
              class="indicator"
              :class="{'active': accountsSlider.currentSlide == index}"
              @click="sliderGoTo(index)" />
          </div>
        </div>

        <account-info
          v-if="!apiStatus && activeAccount"
          :account="activeAccount" />
      </div>
      <account-movements />
    </div>
  </div>
</template>

<script>
import Siema from 'siema';
import { getURLParams, MResponseControl } from '@modyo/financial-commons';

import Account from './components/Account.vue';
import AccountInfo from './components/AccountInfo.vue';
import AccountMovements from './components/AccountMovements.vue';

export default {
  name: 'App',
  components: {
    Account,
    AccountInfo,
    AccountMovements,
    MResponseControl,
  },
  data() {
    return {
      accountsSlider: {},
      apiStatus: false,
    };
  },
  computed: {
    activeAccount() {
      return this.$store.getters.activeAccount;
    },
    accounts() {
      return this.$store.state.accounts;
    },
  },
  watch: {
    activeAccounts() {
      this.$store.dispatch('GET_TRANSACTIONS');
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    const client = parseInt(getURLParams('client'), 10) || 1;
    const account = parseInt(getURLParams('account'), 10) || 1;
    this.$store.commit('SET_PARAM_CLIENT_ID', client);
    this.$store.commit('SET_PARAM_ACCOUNT_ID', account);
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
        this.initAccountsSlider();
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },
  methods: {
    initAccountsSlider() {
      this.$nextTick(() => {
        this.accountsSlider = new Siema({
          selector: '.accounts__slider',
          onChange: this.setActiveAccount,
        });
      });
    },

    sliderGoTo(index) {
      this.accountsSlider.goTo(index);
    },

    setActiveAccount() {
      const accounts = this.$refs['accounts-slide'];
      this.$store.commit('SET_FILTER_BY', { name: this.$t('transactions-list.filters.all'), value: 'all' });
      this.$store.commit('SET_ACTIVE_ACCOUNT_ID', accounts[this.accountsSlider.currentSlide].$el.dataset.account);
      this.$store.commit('SET_ACTIVE_TAB', 'movements');
      this.$store.dispatch('GET_TRANSACTIONS');
      accounts.forEach((slide, i) => {
        if (i === this.accountsSlider.currentSlide) {
          accounts[i].$el.classList.add('active');
        } else {
          accounts[i].$el.classList.remove('active');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "scss/variables";

#accounts-app {
  .accounts__sidebar {
    position: relative;

    background-color: $tertiary-20;
  }

  .accounts__slider-wrapper {
    background-color: #fff;
  }

  .accounts-slider__indicators {
    .indicator {
      width: 60px;
      height: 8px;
      margin: 0 5px;

      cursor: pointer;

      background-color: $primary-20;
      border-radius: 8px;

      &.active {
        background-color: $primary-100;
      }
    }
  }

}

@media (min-width: 992px) {
  #accounts-app {
    .accounts__sidebar {
      background-color: #fff;
    }

    .accounts__slider-wrapper {
      border-bottom: 1px solid $secondary-20;
    }
  }
}
</style>
