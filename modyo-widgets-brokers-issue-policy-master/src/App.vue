<template>
  <div id="issue-policy">
    <stepper
      :main-title="$tc('quote.ref-number', qouteNumber)"
      :steps="steps"
      :show-custom-submit-mobile="false"
      @on-save="save"
      @on-exit="exit"
      @on-submit="submit">
      <template slot="step-1">
        <issue-policy-step1 class="pb-3 pb-sm-4 pb-md-5" />
      </template>
      <template slot="step-2">
        <issue-policy-step2 @emit-policy="testCustomSubmit" />
      </template>
      <template slot="custom-submit">
        <div class="quote__custom-submit d-flex align-items-center flex-column flex-sm-row pl-0 pl-md-4">
          <p class="text-white mb-0 font-weight-light d-none d-md-block">
            {{ $t('quote.amount-to-be-paid') }}:
          </p>
          <p class="mb-0 ml-2 h5 text-white font-weight-normal mr-2 mr-md-3 mr-lg-4 d-none d-md-block">
            {{ amount | currency($t('currency.format')) }}
          </p>
          <button
            class="insurance-qoute__submit-btn btn rounded-lg font-weight-light px-sm-3 p-lg-3"
            :disabled="!confirmed"
            @click="testCustomSubmit">
            {{ $t('issue-policy.emit') }}
          </button>
        </div>
      </template>
    </stepper>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

import Stepper from './components/Stepper';
import IssuePolicyStep1 from './components/IssuePolicyStep1.vue';
import IssuePolicyStep2 from './components/IssuePolicyStep2.vue';

export default {
  name: 'IssuePolicy',
  filters: {
    currency,
  },
  components: {
    Stepper,
    IssuePolicyStep1,
    IssuePolicyStep2,
  },
  data() {
    return {
      qouteNumber: '100023',
    };
  },
  computed: {
    amount() {
      return this.$store.state.amount;
    },
    steps() {
      return [{
        title: this.$t('issue-policy.step1.title'),
        valid: this.$store.state.step1.valid,
      }, {
        title: this.$t('issue-policy.step2.title'),
      }];
    },
    confirmed() {
      return this.$store.state.confirmed;
    },
  },
  methods: {
    save() {
    },
    exit() {
    },
    testCustomSubmit() {
    },
    submit() {
    },
    customPrevious() {
      // this.stepIndex -= 1;
    },
    customNext() {
      // this.stepIndex += 2;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

#issue-policy {
  height: 100%;
}

.quote__custom-submit {
  color: #fff;
}

.insurance-qoute__submit-btn {
  width: auto;
  padding: .25rem;

  color: #fff;
  text-transform: uppercase;

  background-color: $primary-100;
  border: 1px solid #fff;

  &.disabled {
    color: $primary-80;

    opacity: 1;

    &:hover,
    &:focus {
      color: $primary-80;

      border: 1px solid #fff;
    }
  }

  &:hover,
  &:focus {
    color: $primary-20;

    background-color: $primary-dark;

    border-color: $primary-20;
  }
}
</style>
