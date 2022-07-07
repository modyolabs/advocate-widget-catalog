<template>
  <div
    :class="{ 'length-active': isLargeName }"
    class="border-0 mb-2">
    <a
      :href="`#infoTable-${elementId}`"
      :aria-controls="'#infoTable-' + elementId"
      class="summary__accordion-table-row-title collapsed d-flex justify-content-between p-3 bg-white rounded"
      data-toggle="collapse"
      aria-expanded="true"
      @click="openDetails">
      <div>{{ element.name }}</div>
      <div>
        <strong class="blue">{{ element.amount.valueString }}</strong>
        <font-awesome-icon
          icon="chevron-down"
          class="ml-2"
          size="xs" />
      </div>
    </a>

    <div
      :id="`infoTable-${elementId}`"
      :data-parent="`#elements-accordion-${itemId}`"
      class="collapse bg-tertiary-20 p-3 rounded-bottom"
      role="tabpanel">
      <div
        v-for="detail in element.details"
        :key="detail.id"
        class="summary__accordion-table-row row no-gutters d-flex justify-content-between">
        <div class="col-lg-4">
          <span class="text-primary d-lg-none"><strong>{{ detail.name }}</strong></span>
          <span class="d-lg-block d-none">{{ detail.name }}</span>
        </div>
        <div
          v-if="detail.type == 'stock'"
          class="col-lg-4 text-lg-right">
          {{ detail.quantity }} {{ $t('accordion-table.stock') }}
        </div>
        <div
          v-else-if="detail.type == 'mutualFund'"
          class="col-lg-4 text-lg-right">
          {{ detail.quantity }} {{ $t('accordion-table.fees') }}
        </div>
        <div class="col-lg-4 text-lg-right">
          <p class="mb-0">
            {{ detail.amount.valueString }}
          </p>
          <p
            v-if="detail.amount.currency !== 'clp'"
            class="text-muted mb-0">
            {{ detail.amount.originValueString }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uuidv4 } from '../helpers/index';

export default {

  name: 'AccordionTableRow',

  props: {
    element: {
      type: Object,
      required: true,
    },
    itemId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      elementId: uuidv4(),
    };
  },
  computed: {
    isLargeName() {
      return this.element.name.length > 25;
    },
  },
  methods: {
    openDetails() {
      if (this.$el.classList.contains('active-panel')) {
        this.$el.classList.remove('active-panel');
      } else if (this.$el.parentNode.querySelector('.active-panel')) {
        this.$el.parentNode.querySelector('.active-panel').classList.remove('active-panel');
        this.$el.classList.add('active-panel');
      } else {
        this.$el.classList.add('active-panel');
      }
    },
  },
};
</script>

<style lang="css" scoped>
@media (max-width: 319.98px) {
  .summary__accordion-table-row-title {
    font-size: .8rem;
  }
}
@media (max-width: 991.98px) {
  .summary__accordion-table-row:not(:first-child) {
    margin-top: 1rem;
  }
}
</style>
