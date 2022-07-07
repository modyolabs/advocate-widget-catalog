<template>
  <div
    class="d-flex flex-wrap justify-content-start justify-content-md-center align-items-center
    gap-3 categoryList mx-5 mx-md-0">
    <div
      v-for="(item, index) in newGroup"
      :key="index"
      class="d-flex flex-column align-items-center bg-white rounded px-1 py-2 category">
      <font-awesome-icon
        :icon="['far', 'circle']"
        :style="{ color: item.color}"
        class="mb-2"
        size="2x" />
      <div class="fs-8 text-dark">
        {{ item.category }}
      </div>
      <div class="fs-8 text-dark-3 fw-bold">
        {{ item.total | currency(currencyLocal) }}
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@fc-filters';

export default {
  name: 'CategoriesList',
  filters: {
    currency,
  },
  data() {
    return {
      newGroup: [],
    };
  },
  computed: {
    groupedTransactions() {
      return Object.values(this.$store.state.groupedTransactions);
    },
    currencyLocal() {
      return this.$t('currency.format');
    },
  },
  mounted() {
    this.getNewGroup();
  },
  methods: {
    getNewGroup() {
      const acumulate = {
        category: this.$t('commons.others'),
        total: 0,
        color: '',
      };
      const isMobile = window.innerWidth <= 768;
      if ((this.groupedTransactions.length >= 9 && !isMobile)
        || (this.groupedTransactions.length >= 7 && isMobile)) {
        this.groupedTransactions.forEach((item, index) => {
          if ((index >= 7 && !isMobile) || (index >= 5 && isMobile)) {
            acumulate.total += item.total;
            acumulate.color = item.color;
          } else this.newGroup.push(item);
        });
        this.newGroup.push(acumulate);
      } else {
        this.newGroup = this.groupedTransactions;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.category {
  flex: 1 0 45%;

  border: 1px solid #d2d6e5;
}

.categoryList {
  padding: 0 calc((100% - (200px * 3)) / 2);
  margin-bottom: 70px;
}

@media screen and (min-width: 768px) {
  .category {
    flex: 0 0 120px;

    width: 120px;
  }
}

</style>
