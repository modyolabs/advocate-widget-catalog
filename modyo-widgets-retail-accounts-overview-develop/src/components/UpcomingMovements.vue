<template>
  <div>
    <div class="d-block d-md-none">
      <div
        id="upcomingPayments"
        class="accordion accordion-flush">
        <div class="accordion-item">
          <div
            id="upcomingOne"
            class="accordion-header">
            <button
              class="accordion-button collapsed fw-bold fs-7 bg-white text-dark-3 px-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUpcoming"
              aria-expanded="false"
              aria-controls="collapseUpcoming">
              {{ $t('movements.upcoming') }}
            </button>
          </div>
          <div
            id="collapseUpcoming"
            class="accordion-collapse collapse bg-white"
            aria-labelledby="upcomingOne"
            data-bs-parent="#upcomingPayments">
            <div class="accordion-body px-0">
              <div
                v-for="({date, amount, name, amountType}, index) in upcomingOverall"
                :key="index"
                class="d-flex fs-8 upcoming gap-2 pb-1">
                <div
                  class="upcoming__amount fw-bold"
                  :class="[amountType === 'in' ? 'postive' : 'text-dark']">
                  {{ amountType === 'in' ? '+' : '-' }}{{ amount | currency }}
                </div>
                <div class="upcoming__date fw-bold">
                  {{ date | date }} :
                </div>
                <div class="upcoming__name text-dark-3">
                  {{ name | split }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div
      v-if="upcomingOverall.length"
      class="d-none d-md-block pe-0 pe-md-5 ">
      <div class="fw-bold fs-8 text-start text-dark-3 pb-4">
        {{ $t('commons.upcoming') }}
        <font-awesome-icon
          icon="chevron-right" />
      </div>
      <div
        v-for="({amount, name, amountType}, index) in upcomingOverall"
        :key="index"
        class="d-flex fs-8 upcoming gap-2 pb-1">
        <div
          class="upcoming__amount fw-bold"
          :class="[amountType === 'in' ? 'postive' : 'text-dark']">
          {{ amountType === 'in' ? '+' : '-' }}{{ amount | currency }}
        </div>
        <div class="text-truncate text-dark-3">
          {{ name | split }}
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
import { date } from '@fc-filters';

export default {
  name: 'UpcomingMovements',
  filters: {
    date,
    split: (value) => value.split(' ', 2).join(' '),
  },
  computed: {
    selectedAccount() {
      return this.$store.state.selectedAccount;
    },
    upcomingSelected() {
      return this.selectedAccount.upcomingMovements;
    },
    upcomingGeneralAccount() {
      return this.$store.state.totalBudget.upcomingMovements;
    },
    upcomingOverall() {
      if (!Object.keys(this.selectedAccount).length) {
        return this.upcomingGeneralAccount;
      } return this.upcomingSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-header .accordion-button {
  &:focus {
    box-shadow: none;
  }
}
.upcoming {
  &__date {
    color: #d2d6e5;
  }
}

.postive {
  color: #5cb24f;
}
</style>
