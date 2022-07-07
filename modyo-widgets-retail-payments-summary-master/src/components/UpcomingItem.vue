<template>
  <div
    v-if="company.hasOwnProperty('upcomingPayment')"
    class="col-10 col-sm-5 px-3 py-4 bg-white rounded-2 shadow-sm">
    <h5 class="text-dark fs-18 mb-1">
      {{ company.name }}
    </h5>
    <p class="mb-2 text-secondary-60 fs-9">
      {{ company.department }}
    </p>
    <div class="row">
      <div class="col-6 text-start">
        <span class="fs-8">{{ company.upcomingPayment.date }}</span>
      </div>
      <div class="col-6 text-end">
        <span class="text-dark fw-bold fs-7">
          {{ company.upcomingPayment.amount | currency(currencyFormatAmount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UpcomingItem',
  props: {
    company: {
      type: Object,
      default: () => [],
    },
  },
  computed: {
    currencyFormatAmount() {
      return this.$t('currency.format');
    },
  },
};
</script>
