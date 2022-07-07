<template>
  <div
    id="statements"
    class="statements position-relative"
    :class="[drawerStore.selectorOpen ? 'selector-opened' : false]">
    <header
      class="statements__header sticky-top bg-white py-3 py-md-4 px-4 px-md-5
      border-bottom d-flex justify-content-between align-items-center">
      <drawer-title
        :title="{icon: 'chart-line', name: $t('statements.title') }"
        :details="[
          {name: $t('commons.contractor'), bold: contractor.name},
          {name: $t('policy.policy-number',{number:''}), bold: policy.number }
        ]"
        :full-mobile="false"
        @close="drawer.closeDrawer" />
    </header>
    <main class="p-4 p-md-5">
      <p class="text-secondary">
        {{ $t('statements.subtitle') }}:
      </p>
      <div class="row">
        <div class="col-12">
          <div class="custom-control custom-radio custom-control-inline">
            <input
              id="statementByMonths"
              v-model="periodType"
              type="radio"
              name="statementByMonths"
              value="months"
              class="custom-control-input">
            <label
              class="custom-control-label text-secondary"
              for="statementByMonths">{{ $t('statements.monthly') }}</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              id="statementByYear"
              v-model="periodType"
              type="radio"
              name="statementByYear"
              value="years"
              class="custom-control-input">
            <label
              class="custom-control-label text-secondary"
              for="statementByYear">{{ $t('statements.yearly') }}</label>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-4">
          <div class="form-group mb-0">
            <label
              for="period"
              class="small text-secondary">
              <strong>
                {{ periodType==='months' ? $t('forms.month.label') : $t('forms.year.label') }}
              </strong>
            </label>
            <multiselect
              id="period"
              v-model="period"
              :placeholder="$t('statements.period.placeholder')"
              :options="statementOptions"
              :show-labels="false"
              :allow-empty="false"
              :max-height="350"
              @open="drawerStore.selectorOpen=true"
              @close="drawerStore.selectorOpen=false">
              <template #option="{option}">
                <span class="text-capitalize">{{ option }}</span>
              </template>
              <template #singleLabel>
                <span class="text-capitalize">{{ period }}</span>
              </template>
            </multiselect>
          </div>
        </div>
      </div>

      <button
        :disabled="!period"
        class="statements__download-btn btn btn-block-mobile
        mt-4 px-4 py-3 rounded-lg font-weight-light d-flex justify-content-between align-items-center"
        href=""
        @click="()=>{}">
        {{ $t('statements.download-btn') }}
        <font-awesome-icon
          icon="download"
          class="ml-3" />
      </button>
    </main>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { date as DateFormat } from '@modyo/financial-commons';
import DrawerTitle from '../DrawerTitle.vue';

export default {
  name: 'Statements',
  components: {
    DrawerTitle,
    Multiselect,
  },
  props: {
    drawer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      periodType: 'months',
      period: null,
    };
  },
  computed: {
    drawerStore: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        return this.$store.commit('SET_DRAWER', value);
      },
    },
    statements() {
      return this.$store.state.statements;
    },
    statementOptions() { // TODO: Fix this shit
      if (this.periodType === 'years') return this.statements.options.years;
      const lang = window.liquid ? window.liquid.lang : 'es-CL';
      return this.statements.options.months.map(
        (date) => DateFormat(new Date(date), 'MMMM yyyy', lang.split('-')[0]),
      );
    },
    contractor() {
      return this.$store.state.contractor;
    },
    policy() {
      return this.$store.state.policy;
    },
  },
  watch: {
    periodType() {
      if (this.period) [this.period] = this.statementOptions;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

.statements {
  min-height: 100%;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 45;

    display: block;

    height: 100%;

    pointer-events: none;

    content: "";

    opacity: 0;

    transition: opacity .33s ease-in-out;
  }

  &.selector-opened {
    &::before {
      pointer-events: all;

      background-color: rgb(0, 0, 0);
      opacity: .35;
    }
  }
}

.statements__header {
  z-index: 25;
}

.statements__download-btn {
  font-size: 1rem;
  color: #fff;

  background-color: $primary;

  &:disabled {
    pointer-events: none;

    background-color: $secondary-20;
    opacity: 1;
  }

  &:hover,
  &:focus {
    color: #fff;

    background-color: $primary-dark;

  }
}
</style>
