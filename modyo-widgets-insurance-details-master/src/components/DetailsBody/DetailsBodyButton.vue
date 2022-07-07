<template>
  <button
    class="details-body__button btn btn-block p-4"
    @click="$emit('click')">
    <div class="d-flex align-items-center justify-content-between">
      <div class="details-body__button-content d-flex align-items-center text-left">
        <slot />
      </div>
      <font-awesome-icon icon="chevron-right" />
    </div>
  </button>
</template>
<script>
export default {
  name: 'DetailsBodyButton',
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

.details-body__button {
  font-size: 1em;

  border: 1px solid $secondary-20;
  border-radius: 0;
}

.details-body__button-content {
  > div + div {
    &::before {
      width: 1px;
      height: auto;
      margin-right: 2rem;
      margin-left: 2rem;

      content: "";

      background-color: $primary-20;
    }
  }
}
</style>
