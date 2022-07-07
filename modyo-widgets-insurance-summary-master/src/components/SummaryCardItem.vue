<template>
  <div class="summary-card-item px-3 d-flex align-items-center justify-content-between">
    <div class="d-flex flex-column">
      <p class="summary-card-item__title mb-2 font-weight-bold">
        {{ title }}
      </p>
      <small class="summary-card-item__subtitle">
        {{ subtitle }}
      </small>
    </div>
    <p class="summary-card-item__value mb-0">
      <strong>{{ value }}</strong>
    </p>
  </div>
</template>
<script>
export default {
  name: 'SummaryCardItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.summary-card-item {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;

  border: 1px solid $tertiary-40;
  border-radius: .5rem;
}

.summary-card-item__subtitle {
  font-size: .85em;
  color: $primary-80;

  opacity: .9;
}

.summary-card-item__value {
  font-size: 1.25rem;
  font-weight: 800;
}
</style>
