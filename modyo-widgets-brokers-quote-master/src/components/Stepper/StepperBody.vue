<template>
  <div
    id="stepper-body"
    class="overflow-hidden flex-fill d-flex flex-column">
    <div class="stepper-body__steps-title-wrapper">
      <div class="container px-4 px-sm-3">
        <div class="mt-4 mx-auto px-0 px-md-5 col-md-8 col-lg-6 col-xl-5">
          <step-title
            :step-number="currentIndex+1"
            :step-title="steps[currentIndex].title" />
          <step-indicator
            v-if="steps.length>1"
            :steps="steps.length"
            :current-index="currentIndex"
            class="mt-3 mb-4" />
        </div>
      </div>
    </div>
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="overflow-auto flex-fill h-100"
      :class="{'d-none': index!=currentIndex}">
      <slot :name="'step-'+(index+1)" />
    </div>
  </div>
</template>
<script>
import StepTitle from './StepTitle.vue';
import StepIndicator from './StepIndicator.vue';

export default {
  name: 'StepperBody',
  components: {
    StepTitle,
    StepIndicator,
  },
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
};
</script>
