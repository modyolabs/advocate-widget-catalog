<template>
  <div class="summary-card card border-0 shadow-sm h-100">
    <div class="summary-card__body card-body d-flex flex-column">
      <h5 class="summary-card__title card-title d-flex align-items-center pb-3 mb-0">
        <span class="summary-card__title-ic mr-2">
          <font-awesome-icon
            :icon="icon" />
        </span>
        {{ title }}
      </h5>
      <div class="d-flex justify-content-between align-items-center mt-4">
        <p class="mb-0 text-secondary">
          {{ $t('main.insurance-types')[insuranceType] }} <strong>#{{ insuranceId }}</strong>
        </p>
        <span
          v-if="status===1"
          class="d-flex align-items-center text-success"><font-awesome-icon
            icon="circle"
            size="xs"
            class="mr-2" />{{ $t('main.status.valid') }}</span>
      </div>
      <summary-card-item
        v-for="(item,index) in items"
        :key="index"
        :title="item.title"
        :subtitle="item.subtitle"
        :value="item.value"
        :class="{
          'mt-4': index===0,
          'mt-2': index!==0,
          'mb-3': index===items.length-1
        }" />
      <button
        class="summary-card__details-btn btn btn-primary btn-block d-flex justify-content-between align-items-center
        mt-3 px-3 py-2 mt-auto">
        {{ $t('summary-card.view-insurance') }}
        <font-awesome-icon
          icon="chevron-right"
          size="sm"
          class="summary-card__details-btn--icon" />
      </button>
    </div>
  </div>
</template>
<script>
import SummaryCardItem from './SummaryCardItem.vue';

export default {
  name: 'SummaryCard',
  components: {
    SummaryCardItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    insuranceType: {
      type: Number,
      required: true,
    },
    insuranceId: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: 'hand-holding-usd',
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.summary-card {
  font-size: .875rem;
  line-height: .875rem;

  border-radius: .5rem;
}

.summary-card__body {
  padding: 1.125rem;
}

.summary-card__title {
  font-size: 1.125rem;
  line-height: 1.125rem;

  border-bottom: 1px solid $primary-10;
}

.summary-card__title-ic {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 54px;
  height: 54px;

  background-color: $tertiary-20;
  border-radius: 50%;
}

.summary-card__details-btn {
  height: 3rem;

  font-size: 1rem;
  line-height: 1rem;

  border-radius: 5px;

  .summary-card__details-btn--icon {
    color: $tertiary;
  }
}
</style>
