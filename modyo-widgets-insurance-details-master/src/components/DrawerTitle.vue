<template>
  <div class="drawer-title d-flex justify-content-between flex-grow-1">
    <div class="d-none d-md-flex">
      <div class="drawer-title__item-title drawer-title__item d-flex align-items-center">
        <span
          class="drawer-title__icon-container
            d-flex justify-content-center align-items-center rounded-circle mr-2">
          <font-awesome-icon
            class="text-tertiary"
            :icon="title.icon" />
        </span>
        {{ title.name }}
      </div>
      <div
        v-for="(item,index) in details"
        :key="index"
        class="drawer-title__item d-flex align-items-center">
        <p>{{ item.name }} <strong>{{ item.bold }}</strong></p>
      </div>
    </div>
    <div class="d-md-none flex-grow-1">
      <div class="drawer-title__item-title d-flex align-items-center justify-content-between">
        <span class="d-flex align-items-center">
          <span
            class="drawer-title__icon-container
            d-flex justify-content-center align-items-center rounded-circle mr-2">
            <font-awesome-icon
              class="text-tertiary"
              :icon="title.icon" />
          </span>
          {{ title.name }}
        </span>
        <button
          class="btn-icon btn d-md-none"
          @click="$emit('close')">
          <font-awesome-icon
            icon="times"
            size="2x" />
        </button>
      </div>
      <div
        class="mt-3"
        :class="fullMobile ? 'd-flex' : 'd-none'">
        <div
          v-for="(item,index) in details"
          :key="index"
          class="drawer-title__item d-flex flex-fill align-items-center">
          <p class="pl-3">
            {{ item.name }} <strong>{{ item.bold }}</strong>
          </p>
        </div>
      </div>
    </div>
    <button
      class="btn-icon btn d-none d-md-flex"
      @click="$emit('close')">
      <font-awesome-icon
        icon="times"
        size="2x" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'DrawerTitle',
  props: {
    title: {
      type: Object,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
    fullMobile: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.drawer-title__item {
  font-size: .875rem;

  + .drawer-title__item::before {
    display: block;

    padding: 0 .5rem;

    font-weight: 200;

    color: $tertiary-60;

    content: "|";
  }

  &:first-child {
    font-size: 1.125rem;
  }

  p {
    margin: 0;
  }
}

.drawer-title__icon-container {
  width: 40px;
  height: 40px;

  font-size: 1.125rem;

  background-color: $tertiary-10;
}

@media (max-width: 767.98px) {
  .drawer-title__item-title {
    font-size: 1.125rem;
  }

  .drawer-title__item {
    font-size: .875rem;

    &:first-child {
      font-size: .875rem;
    }

    + .drawer-title__item::before {
      width: 1px;
      height: 100%;
      padding: 0;

      content: "";

      background-color: $tertiary-60;
    }
  }
}
</style>
