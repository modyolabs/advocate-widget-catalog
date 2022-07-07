<template>
  <div class="filters__group d-flex align-items-center">
    <div class="d-md-none mr-lg-2">
      <button
        type="button"
        class="btn"
        data-toggle="modal"
        data-target="#filtersModal">
        <font-awesome-icon
          :icon="['fas', 'filter']" />
        <span class="mx-2">{{ $t('filter-by.icon-legend') }}</span>
      </button>
    </div>

    <div class="filter__status d-none d-md-block mr-2 pl-2 pl-lg-0">
      <label class="small font-weight-bold mb-1 d-none d-lg-block">{{ $t('filter-by.status') }}</label>
      <multiselect
        v-model="selectedOption"
        track-by="value"
        :options="statusOptions"
        :close-on-select="true"
        :show-labels="false"
        :allow-empty="false"
        :searchable="false"
        class="multiselect--transparent"
        @input="setFilters">
        <template
          slot="option"
          slot-scope="{ option }">
          {{ $t(`quote.status.${option.name}`) }}
        </template>
        <template
          slot="singleLabel"
          slot-scope="{ option }">
          {{ $t(`quote.status.${option.name}`) }}
        </template>
      </multiselect>
    </div>

    <div class="filter__date d-none d-md-block ml-2 border-md-left rounded-md-0">
      <label class="small font-weight-bold mb-1 d-none d-lg-block">{{ $t('filter-by.date') }}</label>
      <vue-date-picker
        v-model="fromToDates"
        :format="dateFormats.short"
        :max-date="maxDate"
        :locale="{lang: dateFormats.lang}"
        :name="dateFormats.range"
        :format-header="dateFormats.long"
        color="#5d6d7e"
        fullscreen-mobile
        validate
        range
        no-input
        @input="setFilters">
        <template #activator="{ date }">
          <button
            ref="activator"
            class="filters-date__btn btn btn-outline-lg-tertiary px-3 py-3"
            type="button">
            {{ date }}
            <font-awesome-icon
              :icon="['far', 'calendar']"
              size="lg"
              class="ml-3" />
          </button>
        </template>
      </vue-date-picker>
    </div>

    <div
      id="filtersModal"
      class="filters-modal modal fade"
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="filtersModalLabel"
      aria-hidden="true">
      <div class="filters-modal__dialog modal-dialog m-0 h-100">
        <div class="filters-modal__content modal-content h-100 rounded-0">
          <div class="filters-modal__header modal-header mb-2 py-3 text-center d-block border-bottom position-relative">
            <h4 class="mb-0 text-primary font-weight-normal">
              Filtrar
            </h4>

            <div class="filters-modal__close">
              <button
                class="btn btn-link"
                data-dismiss="modal">
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  size="lg" />
              </button>
            </div>
          </div>

          <div class="filters-modal__body modal-body p-0">
            <div class="filter__status px-4 mb-4">
              <label class="small font-weight-bold mb-2">{{ $t('filter-by.status') }}</label>
              <multiselect
                v-model="selectedOption"
                track-by="value"
                :options="statusOptions"
                :close-on-select="true"
                :show-labels="false"
                :allow-empty="false"
                :searchable="false">
                <template
                  slot="option"
                  slot-scope="{ option }">
                  {{ $t(`quote.status.${option.name}`) }}
                </template>
                <template
                  slot="singleLabel"
                  slot-scope="{ option }">
                  {{ $t(`quote.status.${option.name}`) }}
                </template>
              </multiselect>
            </div>

            <div class="filter__date border-md-left">
              <label class="small font-weight-bold mb-2 px-4">{{ $t('filter-by.date') }}</label>
              <vue-date-picker
                v-model="fromToDates"
                class="vd-picker-mobile-modal"
                :format="dateFormats.short"
                :max-date="maxDate"
                :locale="{lang: dateFormats.lang}"
                color="#5d6d7e"
                :name="dateFormats.range"
                no-header
                inline
                range />
            </div>
          </div>

          <div class="filters-modal__footer modal-footer p-4 border-0 justify-content-between">
            <button
              class="btn btn-link col py-3"
              data-dismiss="modal"
              @click="resetFilters">
              {{ $t('filter-by.remove-filters') }}
            </button>
            <button
              class="btn btn-primary col py-3"
              data-dismiss="modal"
              @click="setFilters">
              {{ $t('filter-by.filter-action') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
  name: 'FilterBy',
  components: {
    Multiselect,
    VueDatePicker,
  },
  props: {
    statusOptions: {
      type: Array,
      required: true,
    },
    maxDate: {
      type: [
        Date,
        String,
        Number,
      ],
      default: new Date(),
    },
    startDate: {
      type: [
        Date,
        String,
        Number,
      ],
      required: true,
    },
    endDate: {
      type: [
        Date,
        String,
        Number,
      ],
      required: true,
    },
  },
  data() {
    return {
      localMaxDate: this.maxDate,
      localStartDate: this.startDate,
      localEndDate: this.endDate,
      dateFormats: this.$t('date.format'),
      selectedOption: this.statusOptions[0],
    };
  },
  computed: {
    fromToDates: {
      get() {
        return {
          start: this.localStartDate,
          end: this.localEndDate,
        };
      },
      set(values) {
        const { start, end } = values;
        this.localStartDate = start;
        this.localEndDate = end;
      },
    },
  },
  methods: {
    setFilters() {
      const payload = {
        status: this.selectedOption,
        start: this.localStartDate,
        end: this.localEndDate,
      };
      this.$emit('set-filters', payload);
    },

    resetFilters() {
      [this.selectedOption] = this.statusOptions;
      this.localStartDate = new Date((new Date()).setDate((new Date()).getDate() - 30));
      this.localEndDate = new Date();

      this.setFilters();
    },
  },
};

</script>

<style src="@mathieustan/vue-datepicker/dist/vue-datepicker.min.css"></style>

<style lang="scss" scoped>

.filter__status {
  min-width: 150px;
}

.filters-modal__close {
  position: absolute;
  top: 12px;
  right: 20px;
}

.filters-modal__body {
  flex: 1 0 auto;
}

.filters-modal__header,
.filters-modal__footer {
  flex: 0 0 auto;
}

@media (min-width: 992px) {
  .filter__status {
    min-width: 200px;
  }
}

</style>
