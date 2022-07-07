<template>
  <div
    id="schedule-transfer"
    class="mb-4 flex-grow-1">
    <div class="schedule_transfer_btn text-center mb-lg-4 px-4">
      <m-switch-button
        v-model="scheduled"
        active-color="#2e4553"
        justify-content="center">
        {{ $t('date.schedule-transfer') }}
      </m-switch-button>
    </div>
    <div
      v-if="scheduled"
      class="mx-4 mt-4">
      <multiselect
        v-model="frequency"
        class="shedule_transfer__frequency"
        :show-no-results="false"
        :show-labels="false"
        :options="frequencies"
        :searchable="false"
        :allow-empty="false"
        open-direction="top"
        :placeholder="$t('date.select-frequency')" />

      <!-- TODO: SET FREQUENCY FOR EACH FREQUENCY TYPE  -->
      <vue-date-picker
        v-if="frequency"
        v-model="dates"
        :name="frequency"
        :format="dateFormat.short"
        :min-date="minDate"
        :locale="{lang: dateFormat.lang}"
        color="#2e4553"
        fullscreen-mobile
        validate>
        <template #activator="{ date }">
          <button
            ref="activator"
            class="filters-date__btn btn border form-control rounded-sm btn-block mt-2 p-2"
            type="button">
            <font-awesome-icon
              icon="calendar"
              class="mr-2" />
            {{ date }}
          </button>
        </template>
      </vue-date-picker>
    </div>
  </div>
</template>

<script>
import { MSwitchButton } from '@modyo/financial-commons';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import Multiselect from 'vue-multiselect';

export default {
  name: 'ScheduleTransfer',
  components: {
    MSwitchButton,
    Multiselect,
    VueDatePicker,
  },
  data() {
    return {
      frequencies: [
        this.$t('date.frequency-list.one-time'),
        this.$t('date.frequency-list.weekly'),
        this.$t('date.frequency-list.twice-a-month'),
        this.$t('date.frequency-list.monthly'),
        this.$t('date.frequency-list.quarterly'),
        this.$t('date.frequency-list.twice-a-year'),
      ],
      minDate: new Date(),
      dateFormat: this.$t('date.format'),
    };
  },
  computed: {
    dates: {
      get() {
        return this.$store.state.date;
      },
      set(value) {
        this.$store.commit('SET_DATE', value);
      },
    },

    scheduled: {
      get() {
        return this.$store.state.scheduled;
      },
      set(value) {
        this.$store.commit('SET_SCHEDULED', value);
      },
    },

    frequency: {
      get() {
        return this.$store.state.frequency;
      },
      set(value) {
        this.$store.commit('SET_FREQUENCY', value);
      },
    },
  },
};
</script>

<style src="@mathieustan/vue-datepicker/dist/vue-datepicker.min.css"></style>
<style lang="css" src="vue-multiselect/dist/vue-multiselect.min.css"></style>
