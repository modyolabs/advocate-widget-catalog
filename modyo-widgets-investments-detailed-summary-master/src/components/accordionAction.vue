<template>
  <div class="action">
    <div
      :id="'heading' + uid + itemId"
      class="p-3 mt-2 bg-tertiary rounded"
      role="tab">
      <a
        :href="'#'+ uid + itemId"
        :aria-controls="'#' + uid + itemId"
        :data-parent="'#accordion-footer-'+ itemId"
        class="collapsed text-white d-flex justify-content-between"
        data-toggle="collapse"
        aria-expanded="false">
        <strong>{{ title }}</strong>
        <span class="expand-icon">
          <font-awesome-icon
            icon="chevron-down"
            size="xs" />
        </span>
      </a>
    </div>

    <div
      :id="uid + itemId"
      :aria-labelledby="'heading' + uid + itemId"
      class="collapse p-3 bg-tertiary-20 rounded-bottom"
      role="tabpanel">
      <div class="row no-gutters mb-3 d-none d-lg-flex">
        <div class="col-lg-2">
          <strong>{{ $t('accordion-table.date') }}</strong>
        </div>
        <div class="col-lg-4">
          <strong>{{ $t('accordion-table.description') }}</strong>
        </div>
        <div class="col-lg-3">
          <strong>{{ $t('accordion-table.product-name') }}</strong>
        </div>
        <div class="col-lg-3 text-right">
          <strong>{{ $t('accordion-table.amount') }}</strong>
        </div>
      </div>
      <div
        v-for="item in items"
        :key="item.id"
        class="summary__accordion-action-row row no-gutters">
        <div class="col-lg-2">
          {{ item.date | formatDate }}
        </div>
        <div class="col-lg-4">
          {{ item.description }}
        </div>
        <div class="col-lg-3">
          {{ item.productName }}
        </div>
        <div class="col-lg-3 text-lg-right">
          {{ item.amount.valueString }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parse } from 'date-fns';

export default {
  name: 'AccordionAction',
  filters: {
    formatDate(date) {
      return format(parse(date, 'yy-MM-dd', new Date()), 'dd/MM/yyyy');
    },
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
    itemId: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 991.98px) {
  .summary__accordion-action-row {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
