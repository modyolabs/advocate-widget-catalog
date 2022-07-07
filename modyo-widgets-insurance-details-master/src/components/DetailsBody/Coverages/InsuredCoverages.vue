<template>
  <div class="insured-coverages px-4 px-md-0">
    <div class="insured-coverages__title d-none d-md-block">
      <span class="font-weight-bold">
        {{ $t('body.coverages-main') }}
      </span>
      <span>
        <font-awesome-icon
          icon="chevron-right"
          class="text-success mx-3" />
      </span>
      <span>{{ $t('body.coverages') }}</span>
    </div>
    <div class="insured-coverages__content rounded mt-md-4 px-md-4">
      <ul class="list-unstyled mb-0">
        <li
          v-for="(coverage,index) in coverages"
          :key="index"
          class="insured-coverage__coverage-item d-flex align-items-md-center py-md-4"
          :class="{
            'py-4':index!==0&&index!==coverages.length-1,
            'pb-4':index===0,
            'pt-4':index===coverages.length-1}">
          <font-awesome-icon
            icon="shield-alt"
            class="text-success mr-3 mt-1 mt-md-0" />
          <div class="row no-gutters w-100">
            <span
              v-for="(item,itemIndex) in coverage"
              :key="itemIndex"
              class="col-md-4 flex-fill d-flex align-items-md-center mt-md-0">
              {{ (typeof item === 'string') ? item : item.text }}
              <button class="insured-coverage__coverage-item-tooltip btn p-0 ml-md-auto ml-3">
                <font-awesome-icon
                  v-if="(typeof item === 'object') && item.tooltip"
                  icon="info-circle"
                  class="insured-coverage__coverage-item-tooltip-icon d-md-none" />
                <font-awesome-icon
                  v-if="(typeof item === 'object') && item.tooltip"
                  icon="info-circle"
                  class="d-none d-md-block" />
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InsuredCoverages',
  computed: {
    coverages() {
      return this.$store.state.policy.mainBeneficiary.detailedCoverages;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.insured-coverages__title {
  font-size: 1.125em;
}

.insured-coverage__coverage-item {
  + .insured-coverage__coverage-item {
    border-top: 1px solid $secondary-10;
  }

  span {
    &:first-child {
      font-weight: 500;
    }

    &:not(:first-child) {
      color: $secondary;
    }

    + span {
      margin-top: .25rem;
    }
  }
}

.insured-coverage__coverage-item-tooltip {
  font-size: 1.5rem;

  &:hover,
  &:focus {
    color: $primary-dark;
  }

  .svg-inline--fa {
    vertical-align: top;
  }
}

@media (min-width: 768px) {
  .insured-coverages__content {
    border: 1px solid $secondary-10;
  }

  .insured-coverage__coverage-item {
    span {
      &:first-child {
        font-weight: 400;
      }
    }

    span + span {
      &::before {
        display: block;

        width: 1px;
        height: 2rem;
        margin: 0 2rem;

        content: "";

        background-color: $primary-20;
      }
    }
  }

  .insured-coverage__coverage-item-tooltip {
    font-size: 1em;

    .svg-inline--fa {
      vertical-align: middle;
    }
  }
}
</style>
