<template>
  <div
    class="row bg-tertiary-dark border border-1 m-0 p-3 px-sm-2 py-sm-4 text-white rounded-3 h-100"
    :class="{
      'px-md-2': currentView === 'general',
      'px-md-4': currentView === 'single'}">
    <div
      class="d-none d-md-flex"
      :class="{
        'col-2 flex-column align-items-center gap-1 justify-content-center': currentView === 'general',
        'col-12 flex-row align-items-center gap-2 justify-content-start': currentView === 'single'}">
      <font-awesome-icon
        class="d-none d-sm-flex fs-3"
        :icon="['far', 'lightbulb']" />
      <div
        class="d-none d-md-flex"
        :class="{
          'flex-column align-items-center': currentView === 'general',
          'flex-column-reverse align-items-start': currentView === 'single'}">
        <span class="d-block fw-normal fs-8 up">{{ $t('insights.name') }}</span>
        <span class="d-block fw-normal fs-8 opacity-50 fadeIn">{{ index }}/{{ totalItems }}</span>
      </div>
    </div>
    <div
      class="col-8 my-1 d-flex align-items-start justify-content-center flex-column fadeIn"
      :class="{
        'my-sm-0': currentView === 'general',
        'my-sm-4 col-md-12': currentView === 'single'}">
      <span class="fs-7 fw-bold">{{ data.title }}</span>
      <p class="fs-8 m-0 mt-2 mt-sm-0 mb-sm-3">
        {{ data.desc }}
      </p>
    </div>
    <div
      class="col-2 justify-content-center text-center flex-column border-start border-opacity-30 fadeIn"
      :class="{
        'd-none d-md-flex ': currentView === 'general',
        'd-none': currentView === 'single'}">
      <div class="row">
        <div class="col-12 pl-3">
          <span
            v-for="(el, idx) in onlyTwoActions"
            :key="idx"
            class="d-block">
            <a
              class="fs-7 fw-normal text-white actions"
              :href="el.url">{{ el.text }}</a>
            <hr
              v-if="idx === 0"
              class="mx-0 my-2 p-0">
          </span>
        </div>
      </div>
    </div>
    <div
      class="d-flex col-4 col-md-12 justify-content-center align-items-end
      align-items-md-center pe-3 pe-md-0 flex-column g-0 fadeIn"
      :class="{
        'd-md-none ': currentView === 'general'}">
      <div class="row">
        <div class="col-12 m-0 p-0 g-0">
          <select
            v-model="actionSelected"
            class="actions border-0 fs-7 text-end text-md-center"
            aria-label="Select of actions">
            <option
              disabled
              value="">
              {{ $t('insights.actions') }}
            </option>
            <option
              v-for="(item, idx) in data.callToActions"
              :key="idx"
              :value="item.url">
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InsightItem',
  props: {
    index: {
      type: Number,
      required: false,
      default: 0,
    },
    totalItems: {
      type: Number,
      required: false,
      default: 0,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    actionSelected: '',
  }),
  computed: {
    onlyTwoActions() {
      const actions = this.data.callToActions;
      return actions.length > 2 ? actions.slice(0, 2) : actions;
    },
    currentView() {
      return this.$store.state.currentView.overview;
    },
  },
};
</script>
<style lang="scss">

.actions {
  width: auto;

  color: #fff;

  background: transparent;
  opacity: .3;

  text-decoration: none !important;
  transition: .3s ease-in-out;

  &:hover, &:focus {
    opacity: 1;
    cursor: pointer;
  }
}

.border-start.border-opacity-30 {
  border-left-color: rgba($color: #fff, $alpha: .3) !important;
}

</style>
