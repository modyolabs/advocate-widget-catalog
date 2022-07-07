<template>
  <div class="details-body-title px-4 px-md-0">
    <div class="row">
      <div class="col-sm-8">
        <div class="d-flex">
          <span
            class="details-body-title__title-ic d-flex justify-content-center
          align-items-center rounded-circle mr-3">
            <font-awesome-icon
              :icon="icon" />
          </span>
          <h1 class="details-body-title__title font-weight-normal m-0">
            {{ policy.title }}
          </h1>
        </div>
        <div class="details-body-title__subtitle d-flex mt-md-1 mt-sm-0 mt-4">
          <div
            class="details-body-title__subtitle-item details-body-title__status d-flex align-items-center"
            :class="statusClass">
            <font-awesome-icon
              icon="circle"
              class="mr-2"
              size="xs" />
            {{ $t(`status.${policy.status}`) }}
          </div>
          <div class="details-body-title__subtitle-item d-flex text-secondary">
            {{ $t('policy.policy-number',{number: policy.number}) }}
          </div>
        </div>
      </div>
      <div class="col-sm-4 d-md-flex justify-content-md-end align-items-center mt-2 mt-sm-0">
        <span class="details-body-title__label d-block rounded-lg px-4 py-2 text-sm-right">
          {{ $t('commons.permanency') }}
          <strong>{{ $tc('commons.years', policy.permanency.years) }}</strong>,
          {{ $tc('commons.months', policy.permanency.months) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailsBodyTitle',
  data() {
    return {
      icon: 'hand-holding-usd',
    };
  },
  computed: {
    statusClass() {
      switch (this.policy.status) {
        case 'valid':
          return 'text-success';
        default: return 'text-primary';
      }
    },
    policy() {
      return this.$store.state.policy;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.details-body-title__title {
  font-size: 1.5em;
  line-height: 1.5em;
}

.details-body-title__title-ic {
  width: 40px;
  height: 40px;

  font-size: initial;

  background-color: $tertiary-20;
}

.details-body-title__label {
  font-size: .875em;
  color: $gray-700;

  background-color: $tertiary-10;

  strong {
    font-weight: 500;
  }
}

.details-body-title__status {
  font-size: .875em;
}

.details-body-title__subtitle-item {
  + .details-body-title__subtitle-item {
    &::before {
      align-self: center;

      width: 1px;
      height: 1rem;
      margin-right: 1rem;
      margin-left: 1rem;

      content: "";

      background-color: $primary-20;
    }
  }
}

@media (min-width: 576px) {
  .details-body-title__subtitle {
    padding-left: calc(40px + 1rem);
  }
}

@media (min-width: 768px) {
  .details-body-title__title {
    font-size: 2.25em;
    line-height: 1.125em;
  }
}
</style>
