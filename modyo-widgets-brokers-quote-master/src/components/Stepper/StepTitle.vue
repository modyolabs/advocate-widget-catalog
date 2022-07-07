<template>
  <div id="step-title">
    <h4 class="step-title__title d-flex align-items-center font-weight-normal">
      <span
        class="step-title__number d-flex justify-content-center align-items-center
        text-white rounded-circle mr-3">
        {{ stepNumber }}
      </span>
      {{ stepTitle }}
    </h4>
  </div>
</template>
<script>
export default {
  name: 'StepId',
  props: {
    stepNumber: {
      type: Number,
      required: true,
    },
    stepTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.step-title__number {
  width: 2.25rem;
  height: 2.25rem;

  font-size: .7em;

  background-color: $primary-80;
}

.step-title__title {
  color: $primary-80;
}
</style>
