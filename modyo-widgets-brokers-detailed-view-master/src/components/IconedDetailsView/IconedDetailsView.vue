<template>
  <div class="iconed-details-view p-4">
    <div class="d-flex no-gutters justify-content-between align-items-center">
      <div>
        <p class="iconed-details-view__label mb-2">
          <strong>{{ label }}</strong>
        </p>
        <small class="iconed-details-view__description mb-0">
          {{ description }}
        </small>
      </div>
      <div class="pl-4">
        <font-awesome-icon
          class="iconed-details-view__icon"
          :icon="faIcon"
          size="2x" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IconedDetailsView',
  props: {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    faIcon: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.iconed-details-view {
  background-color: $tertiary-10;
  border-radius: .25rem;
}

.iconed-details-view__detail {
  color: $primary-80;

  opacity: .9;
}

.iconed-details-view__icon {
  color: $tertiary-80;
}
</style>
