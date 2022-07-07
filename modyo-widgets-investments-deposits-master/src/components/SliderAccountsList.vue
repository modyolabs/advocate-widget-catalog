<template>
  <div
    id="slider-account-list"
    class="accounts__sidebar d-flex flex-column">
    <m-response-control
      v-if="apiStatus"
      class="accounts__loading h-100 d-flex justify-content-center align-items-center"
      :status="apiStatus">
      <template #loading>
        <div
          class="loading spinner-border m-4"
          role="status">
          <span class="sr-only">{{ $t('commons.loading') }}</span>
        </div>
      </template>
      <template #error>
        <div class="d-flex flex-column justify-content-center p-4 h-100">
          <p class="text-center">
            {{ $t('commons.try-again') }}
          </p>
        </div>
      </template>
      <template #empty>
        <div class="d-flex flex-column justify-content-center p-4 h-100">
          <p class="text-center">
            {{ $t('commons.empty') }}
          </p>
        </div>
      </template>
    </m-response-control>
    <!-- <div
      v-if="isLoadingAccounts"
      class="accounts__loading h-100 d-flex justify-content-center align-items-center">
      <font-awesome-icon
        icon="circle-notch"
        size="5x"
        spin />
    </div> -->

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
      <div class="accounts-slider__indicators mt-4 mt-lg-2 px-4 d-flex justify-content-center">
        <span
          v-for="(account, index) in accounts"
          :key="`indicator-${index}`"
          class="indicator"
          :class="{'active': accountsSlider.currentSlide == index}"
          @click="sliderGoTo(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import Siema from 'siema';
import { MResponseControl } from '@modyo/financial-commons';
import Account from './Account.vue';

export default {
  name: 'SliderAccountList',
  components: {
    Account,
    MResponseControl,
  },
  data() {
    return {
      accountsSlider: {},
      apiStatus: false,
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.depositAccounts;
    },
    isLoadingAccounts() {
      return this.$store.state.isLoadingAccounts;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.dispatch('GET_ACCOUNTS')
      .then(() => {
        this.apiStatus = false;
        this.initAccountsSlider();
      })
      .catch(() => {
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
      this.$store.commit('SET_FROM_ACCOUNT', accounts[this.accountsSlider.currentSlide].account);
      accounts.forEach((slide, i) => {
        if (i === this.accountsSlider.currentSlide) {
          accounts[i].$el.classList.add('active');
        } else {
          accounts[i].$el.classList.remove('active');
        }
      });
      this.$store.commit('SET_TO_ACCOUNT', null);
      this.$store.commit('SET_AMOUNT', 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#slider-account-list {
  height: 100%;

  .accounts {
    height: 100%;

    > .row {
      height: 100%;
    }
  }

  .accounts__sidebar {
    position: relative;

    height: 100%;
    overflow: hidden;

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

@media (min-width: 992) {
  #slider-account-list {
    .accounts__sidebar {
      background-color: #fff;
    }
  }
}
</style>
