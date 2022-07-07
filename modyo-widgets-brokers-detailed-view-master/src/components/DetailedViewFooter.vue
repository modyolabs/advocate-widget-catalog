<template>
  <footer
    id="detailed-view-footer"
    class="bg-primary py-lg-2 py-lg-4">
    <div class="container-md px-4 px-lg-3  d-flex justify-content-between justify-content-lg-end align-items-center">
      <a
        href="#"
        class="detailed-view-footer__exit-btn btn btn-link pl-0 py-3 py-lg-2 pr-md-5 pr-4 w-auto
        rounded-0 text-white d-lg-none text-uppercase"
        @click="$emit('on-exit')">
        <font-awesome-icon
          icon="door-open"
          class="mr-2" />
        {{ $t('header.exit') }}
      </a>
      <button
        class="btn btn-link pl-3 pr-0 rounded-0 text-white"
        @click="$emit('footer-btn-click')">
        <font-awesome-icon
          :icon="actionIcon"
          class="mr-2" />
        {{ actionText }}
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DetailedViewFooter',
  props: {
    actionText: {
      type: String,
      required: true,
    },
    actionIcon: {
      type: String,
      required: false,
      default: 'upload',
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

@media (max-width: 991.98px) {
  .detailed-view-footer__exit-btn {
    border-right: 1px solid transparentize($primary-80, .5);
  }
}
</style>
