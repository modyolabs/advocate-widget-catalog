<template>
  <div class="contacts d-flex flex-column">
    <div class="mb-4 position-relative mx-4">
      <input
        v-model="query"
        type="text"
        maxlength="30"
        class="form-control border text-tertiary"
        aria-label="contact's filter"
        :placeholder="$t('actions.search')">
      <font-awesome-icon
        icon="search"
        class="icon-centered right-3 text-tertiary" />
    </div>
    <div
      v-if="!contacts">
      <!--  TODO: ADD LOADING ICON -->
    </div>
    <m-shadow-scroll
      v-if="filteredContacts.length > 0"
      id="contactList"
      class="contacts-items"
      start-color="rgba(240,242,243,1)"
      end-color="rgba(240,242,243,0)">
      <contact-item
        v-for="(contact, index) in filteredContacts"
        :key="contact.id"
        :class="{'mt-1': index==0, 'mb-1': index==filteredContacts.length-1}"
        :contact="contact"
        :compact="compact"
        :editable="editable" />
    </m-shadow-scroll>
  </div>
</template>

<script>
import { MShadowScroll } from '@modyo/financial-commons';
import ContactItem from './ContactItem.vue';

export default {
  name: 'ContactsList',
  components: {
    ContactItem,
    MShadowScroll,
  },
  props: {
    compact: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    contacts() {
      return this.$store.state.contacts;
    },
    filteredContacts() {
      return this.$store.state.filteredContacts;
    },
    showContactPanel() {
      return this.$store.state.showContactPanel;
    },
  },
  watch: {
    query: {
      handler: 'updateFilteredContacts',
    },
  },
  created() {
    this.updateFilteredContacts();
  },
  methods: {
    isInQuery(contact) {
      return this.searchByFullName(contact);
    },
    searchByFullName(contact) {
      return contact.fullname.toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
    },
    updateFilteredContacts() {
      const vm = this;
      const filterResult = this.contacts.filter((contact) => {
        if (!vm.query.length) {
          return contact;
        }
        return vm.isInQuery(contact);
      });

      this.$store.commit('SET_FILTERED_CONTACTS', filterResult);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.contacts-items {
  height: 420px;
}

.account-button {
  height: 80px;

  color: $primary-100;

  background-color: #fff;

  p {
    color: $primary-100;
  }

  &.active {
    color: #fff;

    background-color: $primary-100;

    p {
      color: #fff;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.account__info {
  height: 80px;
}

.contact-list__items {
  height: 100%;
  overflow: auto;
}
</style>
