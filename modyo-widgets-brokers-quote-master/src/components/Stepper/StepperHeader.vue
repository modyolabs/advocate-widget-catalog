<template>
  <header
    id="stepper-header"
    class="stepper-header py-2 py-lg-4">
    <div class="container-md px-4 px-sm-3 d-flex justify-content-between align-items-center">
      <p class="font-weight-normal m-0 flex-fill d-lg-none">
        <strong>{{ mainTitle }}</strong>
      </p>
      <p class="font-weight-normal m-0 flex-fill d-none d-lg-block">
        {{ mainTitle }}
      </p>
      <a
        v-if="$listeners['on-save']!=null"
        href="#"
        class="stepper__header-save-btn btn btn-link pr-lg-3 pl-3 pr-0 rounded-0"
        @click="$emit('on-save')">
        <font-awesome-icon
          icon="save"
          class="mr-2" />
        {{ $t('stepper.save') }}
      </a>
      <a
        href="#"
        class="stepper__header-exit-btn btn btn-link pl-3 pr-0 rounded-0 d-none d-lg-block"
        @click="$emit('on-exit')">
        <font-awesome-icon
          icon="door-open"
          class="mr-2" />
        {{ $t('stepper.exit') }}
      </a>
    </div>
  </header>
</template>
<script>
export default {
  name: 'StepperHeader',
  props: {
    mainTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.stepper-header {
  background-color: $primary-10;
  border-bottom: 1px solid $tertiary-40;
}

.stepper__header-save-btn {
  border-left: 1px solid $primary-20;
}

@media (min-width: 992px) {
  .stepper__header-save-btn {
    border-left: none;
  }
}
</style>
