<template>
  <div class="consumer-loan-months-selector">
    <div class="card text-center">
      <div class="card-header px-1">
        <slot name="header">
          Titulo
        </slot>
      </div>
      <div class="card-body py-2">
        <div class="row">
          <div
            v-for="option in options"
            :key="option.label"
            class="col-4 col-md-3 mb-1 p-1">
            <button
              :class="{ active: option.selected, 'btn-light': !option.selected }"
              :disabled="isDisabled && !option.selected"
              type="button"
              class="btn  btn-selector btn-block"
              @click="toogleSelection(option)">
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthsSelector',
  props: {
    value: { type: String, required: true },
    maxSelectables: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      options: [
        { label: this.$t('date.format.months.january'), selected: false },
        { label: this.$t('date.format.months.february'), selected: false },
        { label: this.$t('date.format.months.march'), selected: false },
        { label: this.$t('date.format.months.april'), selected: false },
        { label: this.$t('date.format.months.may'), selected: false },
        { label: this.$t('date.format.months.june'), selected: false },
        { label: this.$t('date.format.months.july'), selected: false },
        { label: this.$t('date.format.months.august'), selected: false },
        { label: this.$t('date.format.months.september'), selected: false },
        { label: this.$t('date.format.months.october'), selected: false },
        { label: this.$t('date.format.months.november'), selected: false },
        { label: this.$t('date.format.months.december'), selected: false },
      ],
    };
  },
  computed: {
    selectedOptions() {
      return this.options.filter((option) => option.selected === true).map((option) => option.label);
    },
    isDisabled() {
      return this.selectedOptions.length >= this.maxSelectables;
    },
  },
  methods: {
    toogleSelection(selectedOption) {
      const option = selectedOption;
      if (this.selectedOptions.length < this.maxSelectables) {
        option.selected = !option.selected;
      } else {
        option.selected = false;
      }
      this.$emit('input', this.selectedOptions.join());
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.consumer-loan-months-selector {
  .card {
    border: 1px solid $primary-10;
  }

  .card-header {
    padding: .75rem 1.25rem;
  }

  .btn-selector.btn-block {
    padding-right: .25rem;
    padding-left: .25rem;

    font-size: .75rem;

    &.active {
      color: #fff;

      background: $primary-100;
    }
  }

}

@media (min-width: 576px) {
  .consumer-loan-months-selector {
    .btn-selector.btn-block {
      font-size: 1rem;
    }
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .consumer-loan-months-selector {
    .btn-selector.btn-block {
      font-size: .8rem;
    }
  }
}
</style>
