<template>
  <div>
    <div class="container-md text-center d-md-none pb-4 mb-sm-0 mt-4 px-4">
      <div class="step-2__checkbox px-4 py-3 rounded">
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
          :disabled="!confirmed"
          @click="$emit('emit-policy')">
          {{ $t('issue-policy.emit') }}
        </button>
        <div class="custom-control custom-checkbox">
          <input
            id="termsConfirmationCheckbox"
            v-model="termsCheckbox"
            type="checkbox"
            class="custom-control-input">
          <i18n
            path="issue-policy.step2.confirmation-checkbox"
            tag="label"
            class="custom-control-label text-secondary"
            for="termsConfirmationCheckbox">
            <a
              href="www.google.com"
              class="issue-policy__confirmation-terms font-weight-bold"
              target="_blank">{{ $t('issue-policy.step2.confirmation-terms') }}</a>
          </i18n>
        </div>
      </div>
    </div>
    <detailed-view />
    <div class="step-2__checkbox text-center d-md-none pb-5">
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
            :disabled="!confirmed"
            @click="$emit('emit-policy')">
            {{ $t('issue-policy.emit') }}
          </button>
          <div class="custom-control custom-checkbox">
            <input
              id="termsConfirmationCheckbox2"
              v-model="termsCheckbox"
              type="checkbox"
              class="custom-control-input">
            <i18n
              path="issue-policy.step2.confirmation-checkbox"
              tag="label"
              class="custom-control-label text-secondary"
              for="termsConfirmationCheckbox2">
              <a
                href="www.google.com"
                class="issue-policy__confirmation-terms font-weight-bold"
                target="_blank">{{ $t('issue-policy.step2.confirmation-terms') }}</a>
            </i18n>
          </div>
        </div>
      </div>
    </div>
    <div class="step-2__checkbox d-none d-md-block pb-5">
      <div class="container text-center">
        <div class="custom-control custom-checkbox">
          <input
            id="termsConfirmationCheckbox2"
            v-model="termsCheckbox"
            type="checkbox"
            class="custom-control-input">
          <i18n
            path="issue-policy.step2.confirmation-checkbox"
            tag="label"
            class="custom-control-label text-secondary"
            for="termsConfirmationCheckbox2">
            <a
              href="www.google.com"
              class="issue-policy__confirmation-terms font-weight-bold"
              target="_blank">{{ $t('issue-policy.step2.confirmation-terms') }}</a>
          </i18n>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

import DetailedView from './DetailedView/DetailedView.vue';

export default {
  name: 'IssuePolicyStep2',
  components: {
    DetailedView,
  },
  filters: {
    currency,
  },
  data() {
    return {
      termsCheckbox: false,
    };
  },
  computed: {
    amount() {
      return this.$store.state.amount;
    },
    confirmed() {
      return this.$store.state.confirmed;
    },
  },
  watch: {
    termsCheckbox: {
      handler: 'canSubmit',
    },
  },
  methods: {
    canSubmit(checked) {
      this.$store.commit('SET_CONFIRMATION', checked);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.step-2__checkbox {
  background-color: $primary-10;
}

.issue-policy__confirmation-terms {
  color: $secondary;
  text-decoration: underline;

  &:hover,
  &:focus {
    color: $primary;
  }
}
</style>
