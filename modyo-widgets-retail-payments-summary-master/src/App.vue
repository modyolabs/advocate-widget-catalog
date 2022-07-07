<template>
  <div
    id="payments-summary-app"
    class="py-lg-4 py-xl-5 h-100">
    <div
      class="container-lg payments-summary bg-white px-0 py-sm-3 p-sm-4">
      <div
        class="row mx-3 mx-sm-5">
        <div
          class="col-12 d-flex flex-column flex-sm-row justify-content-between
            align-items-center align-items-sm-end my-4 p-0">
          <h2 class="text-primary">
            {{ $t('payments.summary') }}
          </h2>
          <div class="d-flex gap-4">
            <button class="btn btn-secondary px-4">
              {{ $t('payments.add-bill') }}
            </button>
            <button class="btn btn-primary px-4">
              {{ $t('payments.pay-bill') }}
            </button>
          </div>
        </div>
        <div class="col-12">
          <activity-summary />
        </div>
        <div class="col-12 col-md-6 p-0 mb-4 ps-sm-0 pe-md-3">
          <upcoming-payments />
        </div>
        <div class="col-12 col-md-6 p-0 p-sm-0 ps-md-3 mb-4">
          <recent-payments />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpcomingPayments from './components/UpcomingPayments.vue';
import RecentPayments from './components/RecentPayments.vue';
import ActivitySummary from './components/ActivitySummary.vue';

export default {
  name: 'App',
  components: {
    RecentPayments,
    UpcomingPayments,
    ActivitySummary,
  },
  created() {
    this.$store.dispatch('INITIALIZE_DATA');
  },
};
</script>
