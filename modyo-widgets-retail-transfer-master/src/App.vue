<template>
  <div
    id="transfer-app"
    class="py-lg-4 py-xl-5">
    <m-response-control
      v-if="apiStatus"
      class="container-lg text-center transfer bg-white py-5"
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
      class="container-lg transfer px-0">
      <div class="row no-gutters">
        <div class="transfer__sidebar d-flex flex-column col-lg-4">
          <component
            :is="sidebarComponent"
            :stepper="$refs.stepper" />
        </div>

        <m-stepper
          v-if="mainComponent !== 'TransferVoucher'"
          ref="stepper"
          v-model="step"
          class="transfer__stepper col-12 d-lg-none px-4 pt-4 pb-3"
          :steps="stepsCount" />

        <div class="transfer__main col-lg-8">
          <component :is="mainComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { MStepper, getURLParams, MResponseControl } from '@modyo/financial-commons';

import TransferAccountSelector from './components/TransferAccountSelector.vue';
import TransferSummary from './components/TransferSummary.vue';
import TransferSelector from './components/TransferSelector.vue';
import TransferConfirm from './components/TransferConfirm.vue';
import TransferVoucher from './components/TransferVoucher.vue';

export default {
  name: 'App',
  components: {
    TransferAccountSelector,
    TransferSummary,
    TransferSelector,
    TransferConfirm,
    TransferVoucher,
    MStepper,
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },

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
    const account = parseInt(getURLParams('account'), 10) || 1;
    this.$store.commit('SET_PARAM_CLIENT_ID', client);
    this.$store.commit('SET_TO_OTHERS', true);
    this.$store.commit('SET_FROM_ACCOUNT_ID', account);
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
        this.$store.commit('SET_IS_LOADING', false);
      }).catch(() => {
        this.apiStatus = 'hasError';
        this.$store.commit('SET_IS_LOADING', true);
      });
  },
  updated() {
    this.$store.commit('SET_STEPPER', this.$refs.stepper);
  },
};
</script>

<style lang="scss" scoped>
@import "scss/variables";

#transfer-app {
  .transfer__sidebar {
    position: relative;

    overflow: hidden;

    background-color: #fff;
  }

  .transfer__stepper {
    overflow: hidden;

    background-color: $tertiary-20;
  }

  .transfer__main {
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
