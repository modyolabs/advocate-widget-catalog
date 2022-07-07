<template>
  <div
    id="stepper"
    class="d-flex flex-column justify-content-between h-100">
    <stepper-header
      :main-title="mainTitle"
      v-on="$listeners['on-save'] ? { 'on-save': ()=>$emit('on-save') } : null"
      @on-exit="$emit('on-exit')" />
    <stepper-body
      :steps="steps"
      :current-index="currentIndex">
      <template
        v-for="(step, index) in steps"
        :slot="'step-'+(index+1)">
        <slot :name="'step-'+(index+1)" />
      </template>
    </stepper-body>
    <stepper-footer
      :steps="steps"
      :current-index="currentIndex"
      :show-custom-submit-mobile="showCustomSubmitMobile"
      @go-to-previous-step="$listeners['on-previous'] ? $emit('on-previous') : previousStep()"
      @go-to-next-step="$listeners['on-next'] ? $emit('on-next') : nextStep()"
      @on-submit="$emit('on-submit')"
      @on-exit="$emit('on-exit')">
      <template
        v-if="$slots['custom-submit']"
        slot="submit">
        <slot name="custom-submit" />
      </template>
    </stepper-footer>
  </div>
</template>

<script>
import StepperHeader from './StepperHeader.vue';
import StepperBody from './StepperBody.vue';
import StepperFooter from './StepperFooter.vue';

export default {
  name: 'Stepper',
  components: {
    StepperHeader,
    StepperBody,
    StepperFooter,
  },
  props: {
    mainTitle: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
    showCustomSubmitMobile: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    stepIndex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    stepIndex(newValue) {
      this.currentIndex = newValue;
    },
  },
  methods: {
    previousStep() {
      if (this.currentIndex > 0) this.currentIndex -= 1;
    },
    nextStep() {
      if (this.currentIndex < this.steps.length - 1) this.currentIndex += 1;
    },
  },
};
</script>
