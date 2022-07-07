<template>
  <div
    id="step-indicator"
    class="d-flex justify-content-bettween">
    <span
      v-for="(step,index) in steps"
      :key="index"
      class="step-indicator__item d-flex flex-fill"
      :class="{'active': index <= currentIndex }" />
  </div>
</template>
<script>
export default {
  name: 'StepIndicator',
  props: {
    steps: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.step-indicator__item {
  height: 6px;
  margin-right: .25rem;
  margin-left: .25rem;

  background-color: $primary-10;
  border-radius: 6px;

  &:first-child {
    margin-right: .5rem;
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
    margin-left: .5rem;
  }

  &.active {
    background-color: $primary-80;
  }
}
</style>
