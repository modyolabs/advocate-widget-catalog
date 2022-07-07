<template>
  <div id="documents__unsigned">
    <h3 class="h5 mb-4 text-primary d-none d-lg-block">
      <strong>{{ $t('documents.unsigned-documents.title') }}</strong>
    </h3>

    <m-response-control
      v-if="apiStatus"
      class="text-center"
      :status="apiStatus">
      <template #loading>
        <div class="loading-icon d-flex justify-content-center align-content-center mt-5">
          <div
            class="spinner-border text-primary"
            role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </template>
      <template #error>
        <div class="mt-4 mt-lg-0">
          <p
            class="h5 font-weight-light bg-white rounded p-5 no-documents-alert text-center">
            {{ $t('commons.try-again') }}
          </p>
        </div>
      </template>
      <template #empty>
        <div class="mt-4 mt-lg-0">
          <p
            class="h5 font-weight-light bg-white rounded p-5 no-documents-alert text-center">
            {{ $t('commons.no-documents-on-period') }}
          </p>
        </div>
      </template>
    </m-response-control>

    <div v-else>
      <div
        v-for="(item,index) in unsignDocuments"
        :key="item.id"
        class="documents__unsigned-item d-flex align-items-center py-2 px-3 bg-white rounded"
        :class="index!=unsignDocuments.length-1 ? 'mb-2' : false">
        <p class="mb-0">
          {{ item.name }}<small class="d-block light">{{ item.issued | date }}</small>
        </p>
        <button
          data-toggle="modal"
          data-target="#sign-modal"
          class="btn btn-primary font-weight-light ml-auto"
          @click="selectedDocument = item">
          <font-awesome-icon
            icon="file-pdf"
            class="mr-lg-2" />
          <span class="d-none d-lg-inline">{{ $t('documents.unsigned-documents.sign-btn') }}</span>
        </button>
      </div>
    </div>

    <sign-modal :item="selectedDocument" />
  </div>
</template>

<script>
import { date, MResponseControl } from '@modyo/financial-commons';
import signModal from './signModal.vue';

export default {
  name: 'DocumentsUnsign',
  filters: {
    date,
  },
  components: {
    signModal,
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
      selectedDocument: null,
    };
  },
  computed: {
    unsignDocuments() {
      return this.$store.state.unsignDocuments;
    },
  },
  created() {
    this.fetchUnsignDocuments();
  },
  methods: {
    fetchUnsignDocuments() {
      this.apiStatus = 'isLoading';
      this.$store.dispatch('GET_UNSIGN_DOCUMENTS')
        .then(() => {
          this.apiStatus = false;
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

@media (max-width: 991.98px) {
  .documents__unsigned-item {
    border: 1px solid $primary-10;
  }
}
</style>
