<template>
  <div
    id="documents__filters"
    class="documents__filters">
    <div
      class="row">
      <div
        v-if="dateFilter"
        class="col col-12"
        :class="filters ? 'col-md-6 col-lg-5 col-xl-6' : false">
        <div class="form-group mb-0">
          <label
            :class="filters ? false : 'd-lg-none'"
            for="">{{ $t('commons.date') }}</label>
          <vue-date-picker
            v-model="fromToDates"
            color="#2e4553"
            :name="$t('commons.date')"
            :type="view"
            :min-date="maxFromDate"
            :max-date="new Date()"
            :fullscreen-mobile="true"
            :range="isRange"
            :locale="{lang: dateFormats.lang}"
            :format-header="dateFormat"
            :format="dateFormat"
            @onChange="setNewDates">
            <template #activator="{ date }">
              <button
                ref="activator"
                class="form-control btn btn-white border d-flex align-items-center d-xl-block
                justify-content-between"
                type="button">
                <span class="date-picker__activator-span text-capitalize flex-grow-1">{{ date }}</span>
                <font-awesome-icon
                  icon="calendar"
                  class="ml-2" />
              </button>
            </template>
          </vue-date-picker>
        </div>
      </div>
      <div
        v-if="filters"
        class="col col-12 col-md-6 col-lg-7 col-xl-6 mt-4 mt-md-0">
        <div class="form-group mb-0 mt-0">
          <label for="">Tipo</label>
          <div class="radio-pills-group d-flex my-0">
            <div
              v-for="(filter, index) in filters"
              :key="index"
              class="radio-pill d-flex d-lg-inline-block flex-fill">
              <input
                :id="'filter' + index"
                v-model="activeFilter"
                :value="filter.value"
                type="radio"
                name="filters">
              <label
                :for="'filter' + index"
                class="d-flex flex-fill justify-content-center align-items-center">{{ filter.label }}</label>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="filters && currencyFilter"
        class="col col-12">
        <div class="form-group mb-0 mt-4">
          <label for="">Moneda</label>
          <div class="radio-pills-group d-flex my-0">
            <div
              v-for="(cfilter, index) in currencyFilter"
              :key="index"
              class="radio-pill d-flex d-lg-inline-block flex-fill">
              <input
                :id="'cfilter' + index"
                v-model="activeCurrencyFilter"
                :value="cfilter.value"
                type="radio"
                name="currencyfilters">
              <label
                :for="'cfilter' + index"
                class="d-flex flex-fill justify-content-center align-items-center">{{ cfilter.label }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseISO } from 'date-fns';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default {
  name: 'ListFilters',
  components: {
    VueDatePicker,
  },
  props: {
    filters: { type: [Array, Boolean], default: false },
    currencyFilter: { type: [Array, Boolean], default: false },
    dateFilter: { type: Boolean, default: false },
    isRange: { type: Boolean, default: false },
    view: { type: String, default: 'month' },
  },
  data() {
    return {
      localFromDate: null,
      localToDate: null,
      dateFormats: this.$t('date.format'),
    };
  },
  computed: {
    fromToDates: {
      get() {
        if (this.isRange) {
          return {
            start: this.$store.state.fromDate,
            end: this.$store.state.toDate,
          };
        }
        return this.$store.state.fromDate;
      },
      set(value) {
        if (this.isRange) {
          this.localFromDate = value.start;
          this.localToDate = value.end;
        } else {
          this.localFromDate = value;
          this.localToDate = value;
        }
      },
    },
    dateFormat() {
      switch (this.view) {
        case 'date':
          return this.dateFormats.date;
        case 'month':
        case 'quarter':
          return this.dateFormats.month;
        case 'year':
          return this.dateFormats.year;
        default:
          return this.dateFormats.date;
      }
    },
    maxToDate() {
      return this.$store.state.maxToDate;
    },
    maxFromDate() {
      return this.$store.state.maxFromDate;
    },
    activeFilter: {
      get() {
        return this.$store.state.activeFilter;
      },
      set(val) {
        this.$store.commit('SET_FILTER', val);
      },
    },
    mode() {
      return this.isRange ? 'range' : 'single';
    },
    activeCurrencyFilter: {
      get() {
        return this.$store.state.activeCurrencyFilter;
      },
      set(val) {
        this.$store.commit('SET_CURRENCY_FILTER', val);
      },
    },
  },
  methods: {
    setNewDates() {
      if (this.view === 'year') {
        this.$store.commit('SET_FROM_DATE', parseISO(this.localToDate));
        this.$store.commit('SET_TO_DATE', parseISO(this.localToDate));
      } else {
        this.$store.commit('SET_FROM_DATE', this.localFromDate);
        this.$store.commit('SET_TO_DATE', this.localToDate);
      }
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 320px) {
  .radio-pill {
    label {
      font-size: .8rem;
    }
  }

  .date-picker__activator-span {
    font-size: 14px;
  }
}
@media (max-width: 991px) {
  .documents__filters {
    width: 100%;
  }
}
</style>
