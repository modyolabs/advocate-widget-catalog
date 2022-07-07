<template>
  <div
    id="documents-app"
    class="py-4 py-xl-5">
    <div class="documents__container container-lg p-0">
      <div class="row no-gutters">
        <div class="col-lg-3 documents__sidebar px-4 py-lg-4 py-xl-5">
          <div class="d-none d-lg-block">
            <ul class="nav nav-pills flex-column mb-lg-4 d-flex">
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'documents-unsign'}"
                  href="#"
                  class="nav-link border d-flex justify-content-between align-items-center"
                  @click.prevent="activeComponent = 'documents-unsign'">
                  {{ $t('main.unsigned-documents-lbl') }}
                  <span class="badge badge-light">{{ unsignDocuments.length }}</span>
                </a>
              </li>
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'documents-statements'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'documents-statements'">
                  {{ $t('main.document-types.consolidated-legacy-statements') }}
                </a>
              </li>
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'documents-invoices'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'documents-invoices'">
                  {{ $t('main.document-types.invoices') }}
                </a>
              </li>
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'orders-confirmation'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'orders-confirmation'">
                  {{ $t('main.document-types.orders-confirmation') }}
                </a>
              </li>
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'orders-execution'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'orders-execution'">
                  {{ $t('main.document-types.orders-execution-report') }}
                </a>
              </li>
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'risk-table'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'risk-table'">
                  {{ $t('main.document-types.risk-table-per-product') }}
                </a>
              </li>
              <li class="nav-item mb-2">
                <a
                  :class="{active: activeComponent === 'signed-documents'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'signed-documents'">
                  {{ $t('main.document-types.signed-documents') }}
                </a>
              </li>
            </ul>
          </div>
          <div class="d-none d-lg-block">
            <p class="h6 m-0 text-primary mb-3">
              {{ $t('main.certificates-lbl') }}
            </p>
            <ul class="nav nav-pills flex-column">
              <li class="nav-item">
                <a
                  :class="{active: activeComponent === 'tax-certificates'}"
                  href="#"
                  class="nav-link border"
                  @click.prevent="activeComponent = 'tax-certificates'">
                  {{ $t('main.certificate-types.tax-certificates') }}
                </a>
              </li>
            </ul>
          </div>
          <div class="select-box d-block d-lg-none">
            <h3 class="h5 text-primary mb-3">
              {{ $t('main.title') }}
            </h3>
            <multiselect
              v-model="optionSelected"
              :options="options"
              :multiple="false"
              group-values="values"
              group-label="label"
              :group-select="false"
              placeholder="Type to search"
              track-by="name"
              label="name"
              :searchable="false"
              select-label=""
              deselect-label=""
              selected-label=""
              :allow-empty="false"
              @input="onChange">
              <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
            </multiselect>
          </div>
        </div>
        <div class="col-lg-9 documents__content px-4 pt-4 py-lg-5">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import documentsUnsign from './components/documentsUnsign.vue';
import documentsStatements from './components/documentsStatements.vue';
import documentsInvoices from './components/documentsInvoices.vue';
import ordersConfirmation from './components/ordersConfirmation.vue';
import ordersExecution from './components/ordersExecution.vue';
import riskTable from './components/riskTable.vue';
import signedDocuments from './components/signedDocuments.vue';
import taxCertificates from './components/taxCertificates.vue';

export default {
  name: 'Documents',
  components: {
    'documents-unsign': documentsUnsign,
    'documents-statements': documentsStatements,
    'documents-invoices': documentsInvoices,
    'orders-confirmation': ordersConfirmation,
    'orders-execution': ordersExecution,
    'risk-table': riskTable,
    'signed-documents': signedDocuments,
    'tax-certificates': taxCertificates,
    multiselect: Multiselect,
  },
  data() {
    return {
      optionSelected: null,
      options: [{
        label: this.$t('main.documents-lbl'),
        values: [
          {
            name: this.$t('main.unsigned-documents-lbl'),
            component: 'documents-unsign',
          },
          {
            name: this.$t('main.document-types.consolidated-legacy-statements'),
            component: 'documents-statements',
          },
          {
            name: this.$t('main.document-types.invoices'),
            component: 'documents-invoices',
          },
          {
            name: this.$t('main.document-types.orders-confirmation'),
            component: 'orders-confirmation',
          },
          {
            name: this.$t('main.document-types.orders-execution-report'),
            component: 'orders-execution',
          },
          {
            name: this.$t('main.document-types.risk-table-per-product'),
            component: 'risk-table',
          },
          {
            name: this.$t('main.document-types.signed-documents'),
            component: 'signed-documents',
          },
        ],
      }, {
        label: this.$t('main.certificates-lbl'),
        values: [{
          name: this.$t('main.certificate-types.tax-certificates'),
          component: 'tax-certificates',
        }],
      }],
    };
  },
  computed: {
    unsignDocuments() {
      return this.$store.state.unsignDocuments;
    },
    activeComponent: {
      get() {
        return this.$store.state.activeComponent;
      },
      set(value) {
        this.$store.commit('SET_ACTIVE_COMPONENT', value);
      },
    },
  },
  created() {
    this.optionSelected = [this.options[0].values[0]];
  },
  methods: {
    onChange(value) {
      if (value) {
        this.activeComponent = value.component;
      }
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "./scss/variables";

#documents-app {
  min-height: 100%;

  background-color: #fff;
}
@media (min-width: 992px) {
  #documents-app {
    min-height: auto;

    background-color: transparent;
  }

  .documents__container {
    background-color: #fff;
  }

  .documents__content {
    background-color: $tertiary-20;
  }
}
</style>
