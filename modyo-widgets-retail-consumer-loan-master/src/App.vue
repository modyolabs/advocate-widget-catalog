<template>
  <div
    id="consumer-loan"
    class="consumer-loan py-lg-5"
    :class="{'h-100': !showSettingsView}">
    <div class="consumer-loan__container container-lg">
      <m-response-control
        v-if="apiStatus"
        class="container-lg text-center py-5"
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
        class="consumer-loan__row row">
        <loan-settings
          class="col-lg-6" />
        <simulation
          v-if="activeDetailInfo || (!showMinMessage && !showMaxMessage && account)"
          class="col-lg-6" />
        <initial-message
          v-else-if="!showMaxMessage && !activeDetailInfo"
          class="col-lg-6" />
        <max-quota-message
          v-else-if="showMaxMessage"
          class="col-lg-6" />
      </div>
    </div>
  </div>
</template>

<script>
import { getURLParams, MResponseControl } from '@modyo/financial-commons';
import { mapState, mapGetters } from 'vuex';
import LoanSettings from './components/LoanSettings/LoanSettings.vue';
import InitialMessage from './components/LoanMessages/InitialMessage.vue';
import MaxQuotaMessage from './components/LoanMessages/MaxQuotaMessage.vue';
import Simulation from './components/LoanSimulation/Simulation.vue';

export default {
  name: 'App',
  components: {
    LoanSettings,
    InitialMessage,
    MaxQuotaMessage,
    Simulation,
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    ...mapState(['account']),
    ...mapGetters(['showMinMessage', 'showMaxMessage']),
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
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

.consumer-loan__container {
  background-color: #fff;
}

@media (max-width: 991.98px) {
  .consumer-loan {
    background-color: #fff;
  }
}
</style>
