<template>
  <div class="dashboard-filter__search">
    <v-popover
      offset="4">
      <button
        type="button"
        class="btn px-3 py-3 btn-outline-lg-tertiary border-md-right rounded-md-0">
        <font-awesome-icon
          :icon="['fas','search']"
          size="lg"
          class="mr-2" />
        {{ $t('search-by.title') }}
      </button>

      <template slot="popover">
        <div class="search-step text-secondary">
          <p class="search-step__number ">
            <span class="d-inline-block border rounded-circle">1</span>
          </p>
          <p>{{ $t('search-by.step-one') }}</p>

          <div class="search-step__radios mt-5 mb-4 d-flex justify-content-between align-items-center text-center">
            <div
              v-for="option in searchOptions"
              :key="option.name"
              class="custom-control custom-radio custom-control-inline-block">
              <input
                :id="option.name"
                v-model="searchBy"
                :value="option"
                type="radio"
                :name="option.name"
                class="custom-control-input">
              <label
                class="custom-control-label custom-control-label--block"
                :for="option.name">{{ $t(`search-by.${option.name}`) }}</label>
            </div>
          </div>
        </div>

        <div class="search-step text-secondary">
          <p class="search-step__number ">
            <span class="d-inline-block border rounded-circle">2</span>
          </p>

          <div class="form-group">
            <i18n
              path="search-by.step-two"
              tag="label"
              for="formGroupExampleInput">
              <template #option>
                {{ $t(`search-by.${searchBy.name}`) }}
              </template>
            </i18n>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span
                  id="basic-addon1"
                  class="input-group-text"><font-awesome-icon :icon="['fas', 'search']" /></span>
              </div>
              <input
                v-model="query"
                type="text"
                class="form-control"
                :placeholder="$t('search-by.search-btn')"
                :aria-label="$t('search-by.search-btn')"
                aria-describedby="basic-addon1">
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <button
            v-close-popover
            type="button"
            class="btn btn-link px-2 py-3"
            @click="clearSearch">
            {{ $t('search-by.clean-btn') }}
          </button>
          <button
            v-close-popover
            type="button"
            class="btn btn-primary px-5 py-2"
            @click="performSearch">
            {{ $t('search-by.search-btn') }}
          </button>
        </div>
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
  name: 'SearchBy',
  directives: {
    tooltip: VTooltip,
    'close-popover': VClosePopover,
  },
  components: {
    VPopover,
  },
  props: {
    searchOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchBy: { name: 'quote-id', value: 'quoteId' },
      query: '',
    };
  },
  methods: {
    performSearch() {
      const payload = {
        field: this.searchBy,
        query: this.query.trim(),
      };
      this.$emit('search', payload);
    },

    clearSearch() {
      this.query = '';
      this.searchBy = { name: 'quote-id', value: 'quoteId' };

      const payload = {
        field: this.searchBy,
        query: this.query.trim(),
      };
      this.$emit('clear-search', payload);
    },
  },
};

</script>

<style lang="scss" scoped>
@import "../scss/variables";

.search-step__number {
  position: relative;

  span {
    width: 32px;
    height: 32px;

    line-height: 30px;

    text-align: center;
  }

  &::before {
    position: absolute;
    top: 50%;

    right: 0;
    left: 32px;
    z-index: 10;

    display: block;

    height: 1px;

    content: "";

    background-color: $border-color;
  }
}

</style>
