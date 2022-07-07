<template>
  <div
    id="credit-cards-payment-app"
    class="py-lg-4 py-xl-5 h-100">
    <div
      class="container-lg credit-cards-payment h-100">
      <div
        class="row no-gutters h-100">
        <!-- add condition no accounts -->
        <div
          v-if="false"
          class="col-12 d-flex align-items-center justify-content-center text-center bill-payment">
          <div>
            <h3 class="text-primary">
              {{ $t('commons.empty') }}
            </h3>
            <p>
              {{ $t('account.add-title') }}
            </p>
            <button class="btn btn-primary btn-block py-2 px-4 mt-4">
              {{ $t('actions.add-bill') }}
            </button>
          </div>
        </div>
        <div
          v-else
          class="bill-payment col-12"
          :class="{'bg-white' : currentStep === 'selectAccount'}">
          <component :is="mainComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BillSummary from './components/BillSummary.vue';
import BillConfirm from './components/BillConfirm.vue';
import BillVoucher from './components/BillVoucher.vue';
import SelectAccount from './components/SelectAccount.vue';

export default {
  name: 'App',
  components: {
    BillSummary,
    BillConfirm,
    BillVoucher,
    SelectAccount,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    mainComponent() {
      return this.$store.getters.mainComponent;
    },
    currentStep() {
      return this.$store.state.stepAction;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },
};
</script>

<style src="./scss/fonts.css"></style>

<style lang="scss" scoped>
@import "scss/variables";

.bill-payment {
  background-color: $tertiary-20;
}
</style>
