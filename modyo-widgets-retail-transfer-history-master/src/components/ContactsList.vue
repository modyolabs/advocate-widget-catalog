<template>
  <div class="contact-list d-flex flex-column h-100 overflow-hidden pb-4 pb-md-0">
    <div class="position-relative mb-3 mt-0 mx-4 mx-lg-5 pt-1">
      <div class="input-group">
        <input
          v-model="query"
          type="text"
          class="form-control border py-4 text-tertiary"
          aria-label="contact's filter"
          :placeholder="$t('actions.search')">
        <div class="input-group-append">
          <span
            id="basic-addon2"
            class="input-group-text">
            <font-awesome-icon
              icon="search"
              class="text-tertiary" />
          </span>
        </div>
      </div>
    </div>
    <m-response-control
      v-if="apiStatus"
      class="text-center py-5"
      :status="apiStatus">
      <template #loading>
        <div
          class="loading spinner-border"
          role="status">
          <span class="sr-only">{{ $t('commons.loading') }}</span>
        </div>
      </template>
      <template #error>
        <div class="d-flex flex-column justify-content-center p-4 h-100">
          <h5 class="text-center">
            {{ $t('commons.try-again') }}
          </h5>
        </div>
      </template>
      <template #empty>
        <div class="d-flex flex-column justify-content-center p-4 h-100">
          <h5 class="text-center">
            {{ $t('commons.empty') }}
          </h5>
        </div>
      </template>
    </m-response-control>
    <m-shadow-scroll
      v-if="filteredContacts.length > 0"
      id="contactList"
      class="contact-list__items"
      start-color="rgba(255,255,255,1)"
      end-color="rgba(255,255,255,0)">
      <div class="px-4 px-lg-5">
        <contact-item
          v-for="contact in filteredContacts"
          :key="contact.id"
          :contact="contact"
          :compact="compact"
          :editable="editable" />
      </div>
    </m-shadow-scroll>
  </div>
</template>

<script>
import { MShadowScroll, MResponseControl } from '@modyo/financial-commons';
import ContactItem from './ContactItem.vue';

export default {
  name: 'ContactsList',
  components: {
    ContactItem,
    MShadowScroll,
    MResponseControl,
  },
  props: {
    compact: { type: Boolean, default: false },
    selected: { type: Object, default: () => {} },
    editable: { type: Boolean, default: false },
  },
  data() {
    return {
      query: '',
      apiStatus: false,
    };
  },
  computed: {
    contacts() {
      return this.$store.state.contacts;
    },
    filteredContacts() {
      const vm = this;
      return this.contacts.filter((contact) => {
        if (!vm.query.length) {
          return contact;
        }
        return vm.isInQuery(contact);
      });
    },
    showContactPanel() {
      return this.$store.state.showContactPanel;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.dispatch('GET_CONTACTS')
      .then(() => {
        this.apiStatus = false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },
  methods: {
    isInQuery(contact) {
      return this.searchByFullName(contact);
    },
    searchByFullName(contact) {
      return contact.fullname.toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-list__items {
  height: 100%;
  overflow: auto;
}
</style>
