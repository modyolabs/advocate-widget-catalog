<template>
  <div>
    <div class="text-center d-md-none py-4">
      <div class="container-md px-4">
        <div class="step3__submit px-4 py-3 rounded">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <p class="mb-0 font-weight-light">
              {{ $t('quote.amount-to-be-paid') }}:
            </p>
            <p class="mb-0 font-weight-bold">
              {{ amount | currency($t('currency.format')) }}
            </p>
          </div>
          <button
            class="btn btn-primary btn-block rounded-lg font-weight-light mb-4"
            @click="$emit('submit')">
            {{ $t('quote.generate') }}
          </button>
        </div>
      </div>
    </div>
    <detailed-view />
    <div class="step3__submit text-center d-md-none pb-5">
      <div class="container-md px-4">
        <div class="bg-white px-4 py-3 rounded">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <p class="mb-0 font-weight-light">
              {{ $t('quote.amount-to-be-paid') }}:
            </p>
            <p class="mb-0 font-weight-bold">
              {{ amount | currency($t('currency.format')) }}
            </p>
          </div>
          <button
            class="btn btn-primary btn-block rounded-lg font-weight-light mb-4"
            @click="$emit('submit')">
            {{ $t('quote.generate') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

/**
 *  Temporary
 *  Note: Update with commons component
 */
import DetailedView from './DetailedView/components/DetailedView.vue';

export default {
  name: 'QuoteStep3',
  components: {
    DetailedView,
  },
  filters: {
    currency,
  },
  computed: {
    amount() {
      return this.$store.state.amount;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.step3__submit {
  background-color: $primary-10;
}

</style>
