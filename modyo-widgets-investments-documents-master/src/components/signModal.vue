<template>
  <div
    id="sign-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalSignLabelly"
    aria-hidden="true">
    <div
      class="modal-dialog modal-xl modal-dialog-centered"
      role="document">
      <div
        v-if="item"
        class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary">
            {{ item.name }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          v-if="documents"
          class="modal-body p-0">
          <div class="row no-gutters ">
            <div class="col-lg-4 p-4">
              <ul
                class="nav nav-pills flex-column"
                role="tablist"
                aria-orientation="vertical">
                <li
                  v-for="(document, index) in documents"
                  :key="index"
                  class="nav-item"
                  @click="opened(document)">
                  <a
                    :class="document === item.details[0] ? 'active' : false"
                    :href="'#' + index"
                    :aria-selected="document === item.details[0]"
                    class="nav-link d-flex justify-content-between align-items-center mb-2 border"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="home">{{ document.name }}
                    <span
                      class="badge"
                      :class="document.read ? 'badge-info' : 'badge-warning'">
                      {{ document.read ? 'leido': 'No leido' }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="documents__modal-content col-lg-8">
              <div class="tab-content h-100">
                <div
                  v-for="(document,index) in item.details"
                  :id="index"
                  :key="index"
                  :class="{'show active': document === item.details[0]}"
                  class="tab-pane fade h-100"
                  role="tabpanel"
                  aria-labelledby="home-tab">
                  <iframe
                    :src="base_url+'original/Business_letter.pdf'"
                    width="100%"
                    class="h-100"
                    style="min-height: 400px;" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="modal-body">
          <iframe
            :src="base_url+'original/Business_letter.pdf'"
            width="100%"
            height="400px"
            style=" background-color: #404040; border: none; border-bottom: 4px solid #404040;" />
        </div>

        <div
          class="documents__modal-footer modal-footer d-flex justify-content-between px-4"
          :class="disableTerm ? 'disabled' : false">
          <label class="checkbox d-flex align-items-center">
            <input
              v-model="terms"
              :disabled="disableTerm"
              type="checkbox">
            <span class="ml-2">
              {{ $t('documents.unsigned-documents.sign-modal.terms-checkbox') }}
            </span>
          </label>
          <button
            :disabled="!terms"
            type="button"
            class="d-none d-lg-inline-block btn btn-primary px-5"
            data-dismiss="modal">
            {{ $t('documents.unsigned-documents.sign-modal.continue-btn') }}
          </button>
          <button
            :disabled="!terms"
            type="button"
            class="d-lg-none btn btn-primary btn-block px-5 mt-3"
            data-dismiss="modal">
            {{ $t('documents.unsigned-documents.sign-modal.continue-btn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {

  name: 'SignModal',

  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      terms: false,
      disableTerm: true,
      base_url: 'https://cloud.modyocdn.com/uploads/9dd6210d-1af4-4bce-a562-ad0fe38a214d/',
    };
  },
  computed: {
    documents() {
      if (this.item) {
        return this.item.group ? this.item.details : false;
      }
      return false;
    },
  },
  watch: {
    documents(docs) {
      if (docs) {
        this.$set(docs[0], 'read', true);
        const readedDocs = docs.filter((doc) => {
          if (doc.read === undefined) return false;
          return true;
        });
        if (readedDocs.length === docs.length) {
          this.disableTerm = false;
        } else {
          this.disableTerm = true;
        }
      } else {
        this.disableTerm = false;
      }
    },
  },
  mounted() {
    $(this.$el).on('hide.bs.modal', () => {
      this.terms = false;
    });
  },
  methods: {
    opened(document) {
      this.$set(document, 'read', true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.documents__modal-footer {
  &.disabled {
    color: #7777;

    background-color: #eee;
  }
}

.documents__modal-content {
  background-color: $tertiary-20;
}
</style>
