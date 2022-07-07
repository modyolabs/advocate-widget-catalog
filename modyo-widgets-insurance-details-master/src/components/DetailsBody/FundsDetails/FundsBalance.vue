<template>
  <div class="funds-balance px-4 px-md-0">
    <div class="funds-balance__title d-none d-md-block">
      <span class="font-weight-bold">
        {{ $t('body.funds-details') }}
      </span>
      <span>
        <font-awesome-icon
          icon="chevron-right"
          class="text-success mx-3" />
      </span>
      <span>{{ $t('funds.available-funds') }}</span>
    </div>
    <div class="distribution-table w-100 mt-0 mt-md-4">
      <div class="overflow-auto">
        <table class="table-striped-rounded table table-striped mb-0 text-secondary">
          <thead>
            <tr>
              <th
                scope="col"
                class="distribution-table__th align-middle">
                {{ $t('funds.table.header.funds') }}
              </th>
              <th
                scope="col"
                class="distribution-table__th align-middle">
                <span class="d-block d-lg-inline-block">{{ $t('funds.table.header.fee-value') }}</span>
                <span class="d-block d-lg-inline-block ml-0 ml-md-1">{{ date }}</span>
              </th>
              <th
                scope="col"
                class="distribution-table__th align-middle">
                <span class="d-block d-lg-inline-block">{{ $t('commons.profitability') }}</span>
                <span class="d-block d-lg-inline-block ml-0 ml-md-1">{{ $t('commons.last-30-days') }}</span>
              </th>
              <th
                scope="col"
                class="distribution-table__th align-middle">
                <span class="d-block d-lg-inline-block">{{ $t('commons.profitability') }}</span>
                <span class="d-block d-lg-inline-block ml-0 ml-md-1">{{ $t('commons.last-12-months') }}</span>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row,rowIndex) in funds"
              :key="rowIndex">
              <td
                v-for="(cell,cellIndex) in row"
                :key="cellIndex">
                {{ cell }}
              </td>
              <td>
                <a
                  href="#"
                  class="d-flex align-items-center">
                  <font-awesome-icon
                    class="distribution-table__download-btn"
                    icon="file-download"
                    size="lg" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FundsBalance',
  data() {
    return {
      date: '21/05/2020',
    };
  },
  computed: {
    funds() {
      // Remove the distribution index
      return this.$store.state.fundsChange.customPortfolio.reduce(
        (a, b) => {
          a.push([
            b[0],
            b[2],
            b[3],
            b[4],
          ]); return a;
        }, [],
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.funds-balance__title {
  font-size: 1.125em;
}

</style>
