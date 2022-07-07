<template>
  <div
    class="row justify-content-center bg-tertiary-20 g-0 py-5">
    <div class="col-11 col-md-10">
      <h4 class="pb-4 m-0 fw-500 text-primary">
        {{ $t('recent-payments.title') }}
      </h4>
    </div>
    <div class="col-11 col-md-10 table-responsive">
      <table class="table table-borderless align-middle fs-5">
        <thead>
          <tr>
            <th scope="col" />
            <th
              scope="col"
              class="p-0">
              <span class="fs-6 fw-500 text-dark d-block text-end">{{ $t('recent-payments.amount') }}</span>
            </th>
            <th
              scope="col"
              class="p-0">
              <span class="fs-6 fw-500 text-dark d-block text-end">{{ $t('recent-payments.date') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(company, index) in companies"
            :key="index">
            <td>
              <span class="fs-6 fw-500 text-dark me-1 text-nowrap">{{ company.name }}</span>
              <span class="text-secondary-60 d-none d-sm-none d-md-none d-xxl-inline-block fs-8">
                - {{ company.department }}</span>
            </td>
            <td class="px-0">
              <span class="fs-6 fw-light text-dark d-block text-end">
                {{ company.recentPayment.amount | currency(currencyFormatAmount) }}
              </span>
            </td>
            <td class="px-0">
              <span class="fs-6 fw-light text-dark d-block text-end">{{ company.recentPayment.date }}</span>
            </td>
            <td>
              <button class="btn bg-white px-2 py-1">
                <font-awesome-icon
                  class="fs-5"
                  icon="download" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: 'RecentPayments',
  computed: {
    companies() {
      return this.$store.state.companies;
    },
    currencyFormatAmount() {
      return this.$t('currency.format');
    },
  },
};
</script>
<style scoped>

table {
  border-spacing: .5em 0;
  border-collapse: separate;
}

td .btn {
  display: block;

  margin: auto;
}
</style>
