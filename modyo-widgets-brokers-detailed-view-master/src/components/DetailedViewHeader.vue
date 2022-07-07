<template>
  <header
    id="detailed-view-header"
    class="detailed-view-header py-2 py-lg-4">
    <div class="container-md px-4 px-lg-3 d-flex justify-content-between align-items-center">
      <p class="font-weight-normal m-0 flex-fill">
        <strong>{{ mainTitle }}</strong>
      </p>
      <a
        v-if="$listeners['on-download']!=null"
        href="#"
        class="detailed-view-header__download-btn btn btn-link pr-lg-3 pl-3 pr-0 rounded-0"
        @click="$emit('on-download')">
        <font-awesome-icon
          icon="download"
          class="mr-2" />
        {{ $t('header.download') }}
      </a>
      <a
        href="#"
        class="detailed-view-header__exit-btn btn btn-link pl-3 pr-0 rounded-0 d-none d-lg-block"
        @click="$emit('on-exit')">
        <font-awesome-icon
          icon="door-open"
          class="mr-2" />
        {{ $t('header.exit') }}
      </a>
    </div>
  </header>
</template>
<script>
export default {
  name: 'DetailedViewHeader',
  props: {
    mainTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.detailed-view-header {
  border-bottom: 1px solid $tertiary-40;
}

.detailed-view-header__download-btn {
  border-left: 1px solid $primary-20;
}

@media (min-width: 992px) {
  .detailed-view-header__download-btn {
    border-left: none;
  }
}
</style>
