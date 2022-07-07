<template>
  <div
    id="credit-cards-payment-app"
    clasS="py-lg-4 py-xl-5">
    <m-response-control
      v-if="apiStatus"
      class="container-lg credit-cards-payment p-5 bg-white"
      :status="apiStatus">
      <template #loading>
        <div class="text-center">
          <div
            class="loading spinner-border"
            role="status">
            <span class="sr-only">{{ $t('commons.loading') }}</span>
          </div>
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
      class="container-lg credit-cards-payment px-0">
      <div class="row no-gutters">
        <div class="credit-cards-payment__sidebar d-flex flex-column col-12 col-lg-4">
          <component
            :is="sidebarComponent"
            :stepper="$refs.stepper" />
        </div>

        <m-stepper
          v-if="mainComponent !== 'PaymentVoucher'"
          ref="stepper"
          v-model="step"
          class="credit-cards-payment__stepper col-12 d-lg-none px-4 pt-4 pb-3"
          :steps="stepsCount" />

        <div class="credit-cards-payment__main col-12 col-lg-8">
          <component :is="mainComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { MStepper, getURLParams, MResponseControl } from '@modyo/financial-commons';

import PaymentCardSelector from './components/PaymentCardSelector.vue';
import PaymentSummary from './components/PaymentSummary.vue';
import PaymentSelector from './components/PaymentSelector.vue';
import PaymentConfirm from './components/PaymentConfirm.vue';
import PaymentVoucher from './components/PaymentVoucher.vue';

export default {
  name: 'App',
  components: {
    MResponseControl,
    PaymentCardSelector,
    PaymentSummary,
    PaymentSelector,
    PaymentConfirm,
    PaymentVoucher,
    MStepper,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    // isLoading() {
    //   return this.$store.state.isLoading;
    // },

    stepsCount() {
      return this.$store.state.stepsCount;
    },

    step: {
      get() {
        return this.$store.state.step;
      },
      set(step) {
        this.$store.commit('SET_CURRENT_STEP', step);
      },
    },

    sidebarComponent() {
      return this.$store.getters.sidebarComponent;
    },

    mainComponent() {
      return this.$store.getters.mainComponent;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    const client = parseInt(getURLParams('client'), 10) || 1;
    const card = parseInt(getURLParams('card'), 10) || 1;
    this.$store.commit('SET_PARAM_CLIENT_ID', client);
    this.$store.commit('SET_PARAM_CARD_ID', card);
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },
  updated() {
    this.$store.commit('SET_STEPPER', this.$refs.stepper);
  },
};
</script>

<style src="./scss/fonts.css"></style>

<style lang="scss" scoped>
@import "scss/variables";

#credit-cards-payment-app {
  .credit-cards-payment__sidebar {
    position: relative;

    overflow: hidden;

    background-color: #fff;
  }

  .credit-cards-payment__stepper {
    overflow: hidden;

    background-color: $tertiary-20;
  }

  .credit-cards-payment__main {
    background-color: $tertiary-20;
  }
}

@media (max-width: 991.98px) {
  .credit-cards__payment-header {
    width: 100%;

    background: #fff;

    p {
      font-size: 18px;
    }

    button {
      position: absolute;
      top: -4px;
      left: 0;
    }
  }
}
</style>
