<template>
  <div class="contractor-detail pt-4 pb-3 pb-md-4 px-4 px-md-0">
    <h4 class="details-body__section-title d-md-block d-none">
      {{ $t('commons.contractor') }}
    </h4>
    <div class="contractor-details__details p-4 mt-md-4">
      <div class="row no-gutters">
        <div class="contractor-details__details-basic col-sm-4 pb-4 pb-md-0">
          <p class="contractor-details__details-bold text-primary mb-1">
            {{ contractor.name }}
          </p>
          <p class="text-secondary mb-0">
            {{ contractor.email }}
          </p>
          <p class="text-secondary mb-0">
            {{ contractor.id }}
          </p>
        </div>
        <div class="col-6 col-sm-4 mt-4 mt-sm-0">
          <p class="contractor-details__details-bold text-primary mb-1">
            {{ policy.value }}
          </p>
          <div class="d-flex align-items-center">
            <div class="mr-2 mr-md-0">
              <p class="text-secondary mb-0 mr-md-4 mr-2">
                {{ $t('policy.policy-value') }}
              </p>
              <p class="text-secondary mb-0">
                {{ $t('commons.at-date', {date:policy.date}) }}
              </p>
            </div>
            <font-awesome-icon
              icon="info-circle"
              class="d-none d-md-block" />
            <font-awesome-icon
              icon="info-circle"
              class="d-md-none mr-2"
              size="lg" />
          </div>
        </div>
        <div class="col-6 col-sm-4 mt-4 mt-sm-0">
          <p class="contractor-details__details-bold text-primary mb-1">
            {{ policy.coverageValue }}
          </p>
          <p class="text-secondary mb-0">
            {{ $t('commons.insured-capital') }}
          </p>
          <p class="text-secondary mb-0">
            {{ $t('insurance.coverage-types.death') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContractorDetails',
  computed: {
    contractor() {
      return this.$store.state.contractor;
    },
    policy() {
      return this.$store.state.policy;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.contractor-details__details {
  background-color: $tertiary-10;
  border-radius: .5rem;
}

.contractor-details__details-bold {
  font-weight: 500;
}

@media (max-width: 767.98px) {
  .contractor-details__details-basic {
    border-bottom: 1px solid $tertiary-40;
  }

  .contractor-details__details {
    .col-6 {
      p:not(.contractor-details__details-bold) {
        font-size: .875em;
      }
    }
  }
}
</style>
