<template>
  <div class="mt-4 w-100 overflow-auto">
    <table class="table-striped-rounded table table-striped mb-0 text-secondary">
      <thead>
        <tr>
          <th
            v-for="(item,index) in headerItems"
            :key="index"
            class="text-nowrap"
            :class="[
              item && item.align ? `text-${item.align}` : null,
            ]"
            scope="col">
            {{ item ? item.name : undefined }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row,rowIndex) in bodyItems"
          :key="rowIndex">
          <td
            v-for="(cell,cellIndex) in row"
            :key="cellIndex"
            :class="[
              headerItems[cellIndex] && headerItems[cellIndex].align
                ? `text-${headerItems[cellIndex].align}`
                : null
            ]">
            <slot
              :name="`x${cellIndex}y${rowIndex}`"
              :cell-data="cell">
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TableStriped',
  props: {
    headerItems: {
      type: Array,
      required: false,
      default: () => [],
    },
    bodyItems: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.table-striped-rounded {
  border-radius: .25rem;

  th {
    background-color: #fff;
    border-top: none;

    border-bottom: 1px solid $secondary-20;

    + th {
      border-left: 1px solid $secondary-20;
    }

  }

  th:first-child {
    border-top-left-radius: .25rem;
  }

  th:last-child {
    border-top-right-radius: .25rem;
  }

  tr:nth-of-type(even) {
    td {
      background-color: #fff;
    }
  }

  tr:nth-of-type(odd) {
    td {
      background-color: $tertiary-10;
    }
  }

  tr:last-child {
    td:first-child {
      border-bottom-left-radius: .25rem;
    }

    td:last-child {
      border-bottom-right-radius: .25rem;
    }
  }

  td {
    border-top: none;

    + td {
      border-left: 1px solid $secondary-20;
    }
  }

  .table-striped-rounded--separator {
    border-top: 1px solid $secondary-20;
  }
}

.table-striped-rounded--first-column {
  display: none;
}

@media (max-width: 767.98px) {
  .table-striped-rounded {
    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
    }

    th:first-child::before,
    td:first-child::before {
      position: absolute;
      top: 0;
      left: calc(100% - 1px);

      width: 1px;
      height: 100%;

      content: "";

      box-shadow: 4px 0 12px rgba(0, 0, 0, .6);
    }
  }
}
</style>
