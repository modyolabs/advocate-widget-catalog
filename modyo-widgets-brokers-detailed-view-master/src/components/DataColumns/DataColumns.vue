<template>
  <div class="data-columns row py-sm-4 no-gutters justify-content-center">
    <div
      v-for="colNumber in responsiveCols"
      :key="colNumber"
      class="data-columns__col px-0 px-sm-4"
      :class="[
        `col-${Math.floor(12/cols.xs)}`,
        `col-sm-${Math.floor(12/cols.sm)}`,
        `col-md-${Math.floor(12/cols.md)}`,
        `col-lg-${Math.floor(12/cols.lg)}`,
        `col-xl-${Math.floor(12/cols.xl)}`
      ]">
      <div
        v-for="itemColNumber in getColumnMaxIteration(colNumber)"
        :key="itemColNumber"
        :class="{'mb-3': itemColNumber!=getColumnMaxIteration(colNumber)}">
        <slot
          name="column-item"
          :item-data="getItem(colNumber,itemColNumber)">
          <data-column-item
            :label="getItem(colNumber,itemColNumber).label"
            :description="getItem(colNumber,itemColNumber).description" />
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import DataColumnItem from './DataColumnItem.vue';

export default {
  name: 'DataColumns',
  components: {
    DataColumnItem,
  },
  props: {
    cols: {
      type: Object,
      required: false,
      default() {
        return {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        };
      },
    },
    direction: {
      type: String,
      default: 'column',
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      responsiveCols: null,
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateResponsiveCols);
    this.calculateResponsiveCols();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateResponsiveCols);
  },
  methods: {
    /**
     * Get the column max items iteration
     * @param {Number} colNumber The column number
     * @return {Number}          The column items max iteration
     */
    getColumnMaxIteration(colNumber) {
      if (this.items.length % this.responsiveCols !== 0
      && colNumber <= this.items.length % this.responsiveCols) {
        return Math.ceil(
          this.items.length / this.responsiveCols,
        );
      }
      return Math.floor(this.items.length / this.responsiveCols);
    },

    /**
     * Get the item by column number and column item number
     * @param {Number} colNumber      The column number
     * @param {Number} itemColNumber  The item number in a column
     * @return {Number}               The column items max iteration
     */
    getItem(colNumber, itemColNumber) {
      const colIndex = colNumber - 1;
      const itemColIndex = itemColNumber - 1;
      const vm = this;

      // Items ordered by 'column'
      if (this.direction === 'column') {
        const colStartIndex = [...Array(colIndex).keys()].reduce((a, b) => a + vm.getColumnMaxIteration(b + 1), 0);
        return this.items[colStartIndex + itemColIndex];
      }
      // Items ordered by 'row'
      return this.items[colIndex + itemColIndex * this.responsiveCols];
    },

    /**
     * Calculate the quantity of columns by windows width - Columns Responsiveness
     */
    calculateResponsiveCols() {
      if (window.innerWidth >= 1200) this.responsiveCols = this.cols.xl;
      else if (window.innerWidth >= 992) this.responsiveCols = this.cols.lg;
      else if (window.innerWidth >= 768) this.responsiveCols = this.cols.md;
      else if (window.innerWidth >= 576) this.responsiveCols = this.cols.sm;
      else this.responsiveCols = this.cols.xs;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.data-columns__col {
  + .data-columns__col {
    border-left: 1px solid $primary-10;
  }

  :last-child {
    margin-bottom: 0;
  }
}

@media (min-width: 576px) {
  .data-columns {
    border: 1px solid $primary-10;
    border-radius: 1rem;
  }
}
</style>
