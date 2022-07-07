<template>
  <div class="bg-tertiary-20 py-5">
    <div class="row justify-content-center gap-4 g-0">
      <div class="col-10 p-0 text-primary">
        <h4 class="pb-4 fw-500 m-0">
          {{ $t('upcoming-payments.title') }}
        </h4>
      </div>
      <upcoming-item
        v-for="(company, index) in companies"
        :key="index"
        :company="company" />
    </div>
  </div>
</template>

<script>
import UpcomingItem from './UpcomingItem.vue';

export default {
  name: 'UpcomingPayments',
  components: { UpcomingItem },
  computed: {
    companies() {
      return this.$store.state.companies;
    },
  },
};
</script>
