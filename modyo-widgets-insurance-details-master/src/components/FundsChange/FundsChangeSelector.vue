<template>
  <div class="funds-change-selector">
    <div class="funds-change__selector-container">
      <p class="text-secondary">
        {{ $t('funds.change.selector.title') }}
      </p>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group mb-0">
            <label
              for="selectedFund"
              class="funds-change__selector-label text-secondary font-weight-bold">
              {{ $t('funds.change.selector.label') }}
            </label>
            <multiselect
              id="selectedFund"
              v-model="selectedFund"
              class="multiselect--option-no-padding"
              :placeholder="$t('funds.change.selector.label')"
              :options="options"
              :show-labels="false"
              :allow-empty="false"
              :max-height="350"
              @open="drawer.selectorOpen=true"
              @close="drawer.selectorOpen=false">
              <template #option="{option}">
                <span
                  v-if="option==='CUSTOM-PORTFOLIO'"
                  class="funds-change__custom-portfolio-btn d-flex justify-content-between align-items-center
                    font-weight-bold p-3 border-0 rounded-0">
                  <span>{{ $t('funds.change.selector.create-custom') }}</span>
                  <font-awesome-icon
                    icon="plus"
                    size="lg"
                    class="mr-3" />
                </span>
                <span
                  v-else
                  class="d-block p-3">{{ $t(`funds.types.${option}`) }}</span>
              </template>
              <template #singleLabel>
                <span v-if="selectedFund==='CUSTOM-PORTFOLIO'">{{ $t('funds.change.selector.create-custom') }}</span>
                <span v-else>{{ $t(`funds.types.${selectedFund}`) }}</span>
              </template>
            </multiselect>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedFund">
      <funds-change-table :selected-fund="selectedFund" />
    </div>
    <div
      v-if="selectedFund"
      class="funds-change__notes">
      <p
        v-for="(note,index) in $t('funds.notes')"
        :key="index"
        class="text-secondary"
        :class="{'mt-4':index==0}">
        {{ note }}
      </p>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import FundsChangeTable from './FundsChangeTable.vue';

export default {
  name: 'FundsChangeSelector',
  components: {
    Multiselect,
    FundsChangeTable,
  },
  data() {
    return {
      selectedFund: null,
      options: [
        'conservative',
        'moderate',
        'balanced',
        'increase',
        'aggressive',
        'CUSTOM-PORTFOLIO',
      ],
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('SET_DRAWER', value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.funds-change__custom-portfolio-btn {
  font-size: 1rem;

  span {
    border-left: 6px solid transparent;
  }

  &:hover,
  &:focus {
    color: $primary-dark;

    background-color: $tertiary-20;
  }
}

.funds-change__selector-label {
  font-size: .875rem;
}

@media (max-width: 991.98px) {
  .funds-change__notes {
    font-size: .875rem;
  }
}
</style>
