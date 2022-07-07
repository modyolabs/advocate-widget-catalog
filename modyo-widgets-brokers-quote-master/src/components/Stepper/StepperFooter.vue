<template>
  <footer
    id="stepper-footer"
    class="bg-primary py-2 py-lg-4">
    <div class="container-md d-flex justify-content-between align-items-center px-4 px-sm-3">
      <a
        href="#"
        class="stepper__footer-exit-btn btn pl-0 pr-3 rounded-0 d-lg-none text-uppercase"
        @click="$emit('on-exit')">
        <font-awesome-icon
          icon="door-open"
          class="mr-2" />
        {{ $t('stepper.exit') }}
      </a>
      <div class="stepper__footer-controls d-flex justify-content-between align-items-center">
        <a
          href="#"
          class="stepper__footer-previous-btn btn pl-3 pl-lg-0 text-uppercase"
          :class="{'disabled': !canReturn}"
          @click="$emit('go-to-previous-step')">
          <font-awesome-icon
            icon="arrow-left"
            class="mr-2" />
          {{ $t('stepper.previous') }}
        </a>
        <a
          href="#"
          class="stepper__footer-next-btn btn pr-0 text-uppercase"
          :class="{
            'disabled': !canContinue,
            'd-none': showSubmit && evaluateShowCustomSubmitMobile,
            'd-md-none': showSubmit && !evaluateShowCustomSubmitMobile,
            'd-md-block': !showSubmit
          }"
          @click="$emit('go-to-next-step')">
          {{ $t('stepper.next') }}
          <font-awesome-icon
            icon="arrow-right"
            class="ml-2" />
        </a>
        <span
          :class="{
            'd-none': !showSubmit || !evaluateShowCustomSubmitMobile,
            'd-md-block': showSubmit
          }">
          <slot name="submit">
            <a
              href="#"
              class="stepper__footer-next-btn btn pr-0 text-uppercase"
              :class="{'disabled': !canContinue}"
              @click="$emit('on-submit')">
              {{ $t('stepper.finish') }}
              <font-awesome-icon
                icon="check"
                class="ml-2" />
            </a>
          </slot>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'StepperFooter',
  props: {
    steps: {
      type: Array,
      required: false,
      default: undefined,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    showCustomSubmitMobile: {
      type: Boolean,
      required: false,
      default: undefined,
    },
  },
  computed: {
    canReturn() {
      return this.currentIndex > 0;
    },
    canContinue() {
      if ((this.steps && this.steps[this.currentIndex].valid !== undefined)
        || this.currentIndex === this.steps.length - 1) {
        return this.steps[this.currentIndex].valid;
      }
      return true;
    },
    showSubmit() {
      return this.currentIndex === this.steps.length - 1;
    },
    evaluateShowCustomSubmitMobile() {
      return this.showCustomSubmitMobile === undefined || this.showCustomSubmitMobile;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.stepper__footer-exit-btn,
.stepper__footer-previous-btn,
.stepper__footer-next-btn {
  font-size: .75em;
  color: #fff;

  &.disabled {
    color: $primary-80;

    opacity: 1;

    &:hover {
      color: $primary-80;
    }
  }

  &:hover {
    color: $primary-20;
  }
}

.stepper__footer-exit-btn {
  border-right: 1px solid $primary-80;
}

@media (max-width: 340px) {
  .stepper__footer-previous-btn {
    padding-right: .5rem;
  }

  .stepper__footer-next-btn {
    padding-left: .5rem;
  }

  .stepper__footer-exit-btn,
  .stepper__footer-previous-btn,
  .stepper__footer-next-btn {
    font-size: .75em;
  }
}

@media (min-width: 576px) {
  .stepper__footer-previous-btn {
    padding-right: 1rem;
  }

  .stepper__footer-next-btn {
    padding-left: 1rem;
  }

  .stepper__footer-exit-btn,
  .stepper__footer-previous-btn,
  .stepper__footer-next-btn {
    font-size: 1em;
  }
}

@media (min-width: 992px) {
  .stepper__footer-controls {
    flex: 1 1 auto;
  }
}
</style>
