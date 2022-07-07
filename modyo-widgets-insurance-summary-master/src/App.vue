<template>
  <div
    id="app"
    class="p-0 px-md-5 pt-md-5 pb-md-4">
    <div class="container-md">
      <h4 class="text-secondary font-weight-normal d-none d-md-block">
        {{ $t('main.my-insurance') }}
      </h4>
      <div class="row pt-4 px-2 px-md-0">
        <div
          v-for="(item,index) in items"
          :key="index"
          class="col-md-6 col-lg-4 mb-4">
          <summary-card
            :title="item.title"
            :items="item.items"
            :insurance-type="item.insuranceType"
            :insurance-id="item.insuranceId"
            :status="item.status"
            :icon="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SummaryCard from './components/SummaryCard.vue';

export default {
  name: 'App',
  components: {
    SummaryCard,
  },
  computed: {
    items() {
      return this.$t('_data');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./scss/variables";

#app {
  min-height: 100%;

  background-color: $tertiary-20;
}
</style>
