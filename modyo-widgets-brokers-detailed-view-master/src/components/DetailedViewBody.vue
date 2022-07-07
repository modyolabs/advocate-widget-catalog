<template>
  <div id="detailed-view-body">
    <div class="container-md px-4 px-lg-3">
      <div
        v-if="title"
        class="detailed-view-body__title mb-4 d-flex d-sm-block
        justify-content-between align-items-center pb-2 pb-sm-0">
        <div class="d-block d-sm-flex mb-sm-2 justify-content-between">
          <div class="d-flex align-items-center">
            <h5 class="mb-0 font-weight-normal d-none d-sm-block">
              {{ title }}
            </h5>
            <h5 class="d-sm-none font-weight-light text-secondary mb-0">
              {{ $t('body.title-mobile') }}
            </h5>
            <font-awesome-icon
              icon="check-circle"
              class="text-success ml-3 d-none d-sm-block"
              size="2x" />
          </div>
          <a
            v-if="historicalTableData"
            href="#historical-table"
            class="d-none d-md-flex btn btn-outline-secondary justify-content-between align-items-center">
            <font-awesome-icon
              icon="angle-double-down"
              size="sm" />
            <span class="px-5">{{ $t('body.btn-go-to-historical-table') }}</span>
            <font-awesome-icon
              icon="angle-double-down"
              size="sm" />
          </a>
        </div>
        <div class="d-flex align-items-center text-success">
          <font-awesome-icon
            icon="circle"
            class="mr-2 small" />
          <small class="mb-0 font-weight-normal">
            {{ status }}
          </small>
        </div>
      </div>
      <a
        v-if="historicalTableData"
        href="#historical-table"
        class="d-flex d-md-none btn btn-outline-secondary justify-content-between align-items-center mb-4">
        <font-awesome-icon
          icon="angle-double-down"
          size="sm" />
        <span class="px-5">{{ $t('body.btn-go-to-historical-table') }}</span>
        <font-awesome-icon
          icon="angle-double-down"
          size="sm" />
      </a>
      <data-columns
        :items="dataColumnsItems"
        :cols="dataColumnsCols" />
      <div class="detailed-view-body__agreements mt-5 mb-4 my-sm-5">
        <div class="row no-gutters">
          <h5 class="detailed-view-body__agreements-title d-none d-sm-block">
            {{ $t('body.agreements-title') }}
          </h5>
          <h5 class="detailed-view-body__agreements-title col-12 pb-2 d-sm-none font-weight-light text-secondary mb-0">
            {{ $t('body.agreements-title') }}
          </h5>
        </div>
        <div class="row">
          <div
            v-for="(agreementItem,index) in agreements"
            :key="index"
            class="col-md-6 col-lg-4 mt-4">
            <iconed-details-view
              :label="agreementItem.label"
              :description="agreementItem.description"
              :fa-icon="agreementItem.icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="detailed-view-body__premium-wrapper py-5">
      <div class="container-md px-4 px-lg-3">
        <div class="row no-gutters d-flex justify-content-end">
          <div class="detailed-view-body__premium-rate-container col-sm-8 col-md-6 col-lg-4 d-flex align-items-center">
            <label
              for="premiumRate"
              class="detailed-view-body__premium-rate-label small d-block mb-0 text-sm-right pr-3">
              {{ $t('body.premium-increase') }}
            </label>
            <div class="detailed-view-body__premium-rate-input-group input-group">
              <input
                type="text"
                class="detailed-view-body__premium-rate-input form-control border-0 text-secondary text-right"
                placeholder="0.00"
                aria-label="Premium Rate"
                min="0"
                max="100"
                maxlength="3"
                aria-describedby="premiumRate-Percentage">
              <div class="input-group-prepend">
                <span
                  id="premiumRate-Percentage"
                  class="detailed-view-body__premium-rate-percentage input-group-text border-0 text-secondary">%</span>
              </div>
            </div>
          </div>
        </div>
        <table-striped
          :header-items="tableData.header"
          :body-items="tableData.body" />
      </div>
    </div>
    <div
      v-if="historicalTableData"
      class="container-md px-4 px-lg-3 pb-4 pb-md-5">
      <div class="detailed-view-body__historical-table mt-5">
        <div class="row no-gutters">
          <h5 class="detailed-view-body__historical-table-title d-none d-sm-block">
            {{ $t('body.historical-table') }}
          </h5>
          <h5
            class="detailed-view-body__historical-table-title
            col-12 pb-2 d-sm-none font-weight-light text-secondary mb-0">
            {{ $t('body.historical-table') }}
          </h5>
        </div>
        <div class="row no-gutters">
          <table-striped
            id="historical-table"
            class="border rounded-lg"
            :header-items="historicalTableData.header"
            :body-items="historicalTableData.body">
            <!-- Movements Column -->
            <template
              v-for="(row, rowIndex) in historicalTableData.body"
              #[`x0y${rowIndex}`]="{cellData}">
              <a
                :key="`x0y${rowIndex}`"
                href="#"
                class="detailed-view-body__historical-table--link d-flex align-items-center">
                <font-awesome-icon
                  icon="eye"
                  size="sm"
                  class="detailed-view-body__historical-table--eye-ic mr-2" />{{ cellData }}
              </a>
            </template>

            <!-- Status Column -->
            <template
              v-for="(row, rowIndex) in historicalTableData.body"
              #[`x1y${rowIndex}`]="{cellData}">
              <span
                v-if="cellData===1"
                :key="`x1y${rowIndex}`"
                class="d-flex align-items-center text-warning">
                <font-awesome-icon
                  icon="circle"
                  size="xs"
                  class="mr-2" />
                {{ $t('body.status.issued') }}
              </span>
              <span
                v-if="cellData===2"
                :key="`x1y${rowIndex}`"
                class="d-flex align-items-center text-primary">
                <font-awesome-icon
                  icon="circle"
                  size="xs"
                  class="mr-2" />
                {{ $t('body.status.on-revision') }}
              </span>
              <span
                v-if="cellData===3"
                :key="`x1y${rowIndex}`"
                class="d-flex align-items-center text-success">
                <font-awesome-icon
                  icon="circle"
                  size="xs"
                  class="mr-2" />
                {{ $t('body.status.confirmed') }}
              </span>
              <span
                v-if="cellData===4"
                :key="`x1y${rowIndex}`"
                class="d-flex align-items-center text-danger">
                <font-awesome-icon
                  icon="circle"
                  size="xs"
                  class="mr-2" />
                {{ $t('body.status.refused') }}
              </span>
              <span
                v-if="cellData===5"
                :key="`x1y${rowIndex}`"
                class="d-flex align-items-center text-success">
                <font-awesome-icon
                  icon="circle"
                  size="xs"
                  class="mr-2" />
                {{ $t('body.status.accepted') }}
              </span>
              <span
                v-if="cellData===6"
                :key="`x1y${rowIndex}`"
                class="d-flex align-items-center text-success">
                <font-awesome-icon
                  icon="circle"
                  size="xs"
                  class="mr-2" />
                {{ $t('body.status.sent') }}
              </span>
            </template>
          </table-striped>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconedDetailsView from './IconedDetailsView/IconedDetailsView.vue';
import DataColumns from './DataColumns/DataColumns.vue';
import TableStriped from './TableStriped/TableStriped.vue';

export default {
  name: 'DetailedViewBody',
  components: {
    IconedDetailsView,
    DataColumns,
    TableStriped,
  },
  props: {
    dataColumnsItems: {
      type: Array,
      required: true,
    },
    agreements: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Object,
      required: true,
    },
    historicalTableData: {
      type: Object,
      required: false,
      default: undefined,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    status: {
      type: String,
      required: true,
    },
    dataColumnsCols: {
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
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.detailed-view-body__title {
  border-bottom: 1px solid $primary-10;
}

.detailed-view-body__agreements-title,
.detailed-view-body__historical-table-title {
  color: $primary-80;

  border-bottom: 1px solid $primary-10;
}

.detailed-view-body__premium-wrapper {
  background-color: $primary-10;
}

.detailed-view-body__premium-rate-container {
  .detailed-view-body__premium-rate-label {
    flex: 1 1 50%;
  }

  .detailed-view-body__premium-rate-input-group {
    flex: 1 1 50%;

    overflow: hidden;

    border-radius: .25rem;
  }

  .detailed-view-body__premium-rate-percentage {
    background-color: $tertiary-10;
  }
}

.detailed-view-body__historical-table--link {
  color: $secondary;
  text-decoration: underline;

  .detailed-view-body__historical-table--eye-ic {
    color: $tertiary-100;
  }

  &:hover,
  &:focus {
    color: $primary;

    .detailed-view-body__historical-table--eye-ic {
      color: $primary;
    }
  }
}

@media (min-width: 576px) {
  .detailed-view-body__title {
    border: none;
  }

  .detailed-view-body__agreements-title,
  .detailed-view-body__historical-table-title {
    border: none;
  }
}

</style>
