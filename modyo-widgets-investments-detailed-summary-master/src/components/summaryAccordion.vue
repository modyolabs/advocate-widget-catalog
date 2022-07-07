<template>
  <div class="summary__accordion-item card accordion border-0">
    <div
      :id="'heading-' + itemId"
      class="card-header accordion__header p-0 border-0 rounded"
      role="tab">
      <button
        :data-target="'#accordion-' + itemId"
        :aria-controls="'accordion-' + itemId"
        class="summary__accordion-button btn btn-block d-flex p-2 align-items-lg-center py-2 px-3 p-lg-3
        bg-white flex-column flex-lg-row"
        data-toggle="collapse"
        @click="openDetails">
        <h5 class="summary__product-name d-flex mb-0 text-primary">
          {{ item.name }}
        </h5>
        <div class="ml-lg-auto text-right">
          <p class="d-lg-none h6 mb-0 mt-1 font-weight-light font-weight-lg-bold text-primary">
            {{ item.amount.valueString }}
          </p>
          <p class="d-none d-lg-block h5 mb-0 text-primary">
            {{ item.amount.valueString }}
          </p>
          <small class="d-none d-lg-block text-muted">{{ $t('summary-accordion.account-legacy-lbl') }}</small>
        </div>
      </button>
    </div>

    <div
      :id="'accordion-' + itemId"
      :aria-labelledby="'heading-' + itemId"
      class="collapse p-0 rounded-bottom"
      role="tabpanel"
      data-parent="#accordion">
      <div class="card-body p-0 accordion__body p-2 p-lg-3 bg-tertiary-10">
        <div class="accordion__body-header">
          <p
            v-if="tab === 'perAccount'"
            class="mb-0 text-right">
            <a
              href="#"
              @click.prevent="">
              {{ $t('summary-accordion.details-btn') }}
              <font-awesome-icon
                icon="chevron-right"
                size="sm"
                class="ml-2" />
            </a>
          </p>
        </div>

        <div class="accordion__body-content mt-2 mt-lg-3">
          <div :id="'elements-accordion-' + itemId">
            <accordion-table-row
              v-for="element in item.elements"
              :key="element.type + '-' + itemId"
              :element="element"
              :item-id="itemId" />
          </div>
        </div>

        <div
          v-if="tab === 'perAccount'"
          class="accordion__body-footer mt-2 mt-lg-3">
          <div class="accordion-footer__actions">
            <div
              :id="'accordion-footer-'+ itemId"
              role="tablist">
              <accordion-action
                :items="lastMovements"
                :item-id="itemId"
                uid="movements"
                :title="$t('last-movements.title')" />
              <accordion-action
                :items="inTransit"
                :item-id="itemId"
                uid="operations"
                :title="$t('in-transit.title')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { uuidv4 } from '../helpers/index';

import accordionTableRow from './accordionTableRow.vue';
import accordionAction from './accordionAction.vue';

export default {

  name: 'SummaryAccordion',
  components: {
    'accordion-table-row': accordionTableRow,
    'accordion-action': accordionAction,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      itemId: uuidv4(),
      movements: [],
    };
  },
  computed: {
    lastMovements() {
      return this.movements.filter((movement) => movement.state === 'DONE');
    },
    inTransit() {
      return this.movements.filter((movement) => movement.state === 'PENDING');
    },
  },
  created() {
    if (this.tab === 'perAccount') {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      const vm = this;
      axios.get('https://api-bank.herokuapp.com/api/v1/LastMovements', {
        params: {
          id: this.item.id,
        },
      }).then((response) => {
        vm.movements = response.data.data.movements;
      }, (err) => err);
    },
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

<style lang="scss">
@media (max-width: 319.98px) {
  .summary__product-name {
    font-size: 1.2rem;
  }
}

.summary__accordion-item {
  margin-bottom: .5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .summary__accordion-button {
    position: relative;
    z-index: 100;
  }
}
</style>
