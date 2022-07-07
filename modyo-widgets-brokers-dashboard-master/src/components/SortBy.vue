<template>
  <div class="filter__sort border-md-left rounded-md-0">
    <v-popover
      offset="4">
      <button
        type="button"
        class="btn btn-outline-lg-tertiary px-4 py-3">
        <font-awesome-icon
          :icon="['fas','sort-amount-down-alt']"
          size="lg"
          class="mr-2" />
        Ordenar
      </button>
      <template slot="popover">
        <div
          v-for="option in sortOptions"
          :key="option.name"
          class="custom-control custom-radio text-secondary py-3 px-5">
          <input
            :id="option.name"
            v-model="sortBy"
            type="radio"
            :name="option.name"
            :value="option"
            class="custom-control-input">
          <label
            class="custom-control-label"
            :for="option.name">{{ $t(`sort-by.${option.name}`) }}</label>
        </div>

        <button
          v-close-popover
          type="button"
          class="btn btn-block btn-primary mt-3 px-4 py-3"
          @click="sort">
          Aplicar
        </button>
      </template>
    </v-popover>
  </div>
</template>

<script>

import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';

VTooltip.options.popover.defaultClass = 'vue-popover-theme';
VTooltip.options.popover.defaultBaseClass = 'v-tooltip v-popover';
VTooltip.options.popover.defaultWrapperClass = 'v-wrapper';
VTooltip.options.popover.defaultInnerClass = 'v-tooltip-inner v-popover-inner';
VTooltip.options.popover.defaultArrowClass = 'v-tooltip-arrow v-popover-arrow';

export default {
  name: 'SortBy',
  directives: {
    tooltip: VTooltip,
    'close-popover': VClosePopover,
  },
  components: {
    VPopover,
  },
  props: {
    sortOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: this.sortOptions[0],
    };
  },
  methods: {
    sort() {
      const payload = {
        sortBy: this.sortBy,
      };
      this.$emit('sort', payload);
    },
  },
};

</script>
