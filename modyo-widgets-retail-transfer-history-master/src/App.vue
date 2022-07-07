<template>
  <div
    id="transfers-history-app"
    class="transfers-history container-lg px-0 py-lg-4 py-xl-5 h-100">
    <div class="row no-gutters h-100">
      <div
        class="transfers-history__contacts col-12 col-md-6 d-flex flex-column pb-md-4 h-100"
        :class="{'active': showContactPanel}">
        <div class="transfers-history__actions px-4 px-lg-5 py-4 border-bottom d-none d-md-block">
          <div class="row my-0 my-md-2">
            <div class="col-6 pr-2">
              <a
                href=""
                class="btn btn-block btn-primary py-2 py-md-3"
                @click.prevent="">{{ $t('actions.to-third-parties') }}</a>
            </div>
            <div class="col-6 pl-2">
              <a
                href=""
                class="btn btn-block btn-primary py-2 py-md-3"
                @click.prevent="">{{ $t('actions.to-own-accounts') }}</a>
            </div>
          </div>
        </div>

        <div class="contacts__header-mobile shadow-sm d-block d-md-none px-2 py-3 bg-white mb-4">
          <h5
            v-if="editingContactMode || newContactMode"
            class="font-weight-bold text-primary text-center mb-0 position-relative">
            <button
              class="contacts__header-icon contacts__header-icon--left btn btn-link"
              @click="closeContactEditMode">
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
            </button>
            {{ editingContactMode ? $t('contacts.edit-contact') : $t('contacts.new-contact') }}
          </h5>

          <h5
            v-else
            class="font-weight-bold text-primary text-center mb-0 position-relative">
            {{ $t('contacts.recipients') }}
            <button
              class="contacts__header-icon contacts__header-icon--right btn btn-link"
              @click="closeContactPanel">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </h5>
        </div>

        <div
          v-if="!editingContactMode && !newContactMode"
          class="contacts__header-desktop py-md-4 px-4 px-lg-5 mt-4 mt-md-0 d-none d-md-flex align-items-center">
          <h5 class="mb-0 text-primary font-weight-bold">
            {{ $t('contacts.recipients') }}
          </h5>

          <button
            class="btn btn-secondary px-3 py-2 ml-auto font-weight-lighter"
            @click="createNewContact">
            {{ $t('contacts.add-contact') }}
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="ml-2" />
          </button>
        </div>

        <div
          v-if="!editingContactMode && !newContactMode"
          class="contacts d-flex flex-column overflow-hidden h-100">
          <div
            v-if="!editingContactMode && !newContactMode"
            class="contacts__actions btn-group px-4 w-100 d-block d-md-none mb-4"
            role="group"
            aria-label="Contacts Options">
            <button
              class="btn text-center px-0 px-sm-1 px-md-3 py-2 font-weight-lighter col-6"
              :class="{
                'btn-primary': !editingContactMode && !newContactMode,
                'btn-white': (editingContactMode || newContactMode)
              }">
              {{ $t('contacts.recipients') }}
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="ml-2" />
            </button>
            <button
              class="btn px-0 px-sm-1 px-md-3 py-2 font-weight-lighter col-6"
              :class="{'btn-primary': newContactMode, 'btn-white': !newContactMode}"
              @click="createNewContact">
              {{ $t('contacts.add-contact') }}
            </button>
          </div>

          <contact-list :editable="true" />
        </div>

        <div
          v-if="editingContactMode || newContactMode"
          class="pt-md-4 d-flex flex-column pb-2 h-100 overflow-auto">
          <div class="d-none d-md-flex justify-content-between align-items-center mx-4 mx-lg-5 mb-2">
            <h5 class="text-primary font-weight-bold">
              {{ editingContactMode ? $t('contacts.edit-contact') : $t('contacts.new-contact') }}
            </h5>
            <button
              class="btn btn-link text-muted"
              @click="closeContactEditMode">
              <font-awesome-icon
                class="mr-1"
                :icon="['fas', 'arrow-left']"
                size="xs" /> {{ $t('actions.back') }}
            </button>
          </div>

          <new-contact
            :contact="editingContact"
            @close="closeContactPanel" />
        </div>
      </div>

      <div class="transfers-history__transactions col-12 col-md-6 d-flex flex-column bg-tertiary-20 pb-md-4 h-100">
        <div class="transfers-history__actions px-4 px-lg-5 py-4 border-bottom d-block d-md-none">
          <div class="row my-0 my-md-2">
            <div class="col-6 pr-2">
              <a
                href=""
                class="btn btn-block btn-primary py-2 py-md-3 px-0 px-sm-2
                d-flex align-items-center justify-content-center h-100">
                {{ $t('actions.to-third-parties') }}
              </a>
            </div>
            <div class="col-6 pl-2">
              <a
                href=""
                class="btn btn-block btn-primary py-2 py-md-3 px-0 px-sm-2
                d-flex align-items-center justify-content-center h-100">
                {{ $t('actions.to-own-accounts') }}
              </a>
            </div>
          </div>
        </div>

        <div
          class="p-4 d-block d-md-none border-bottom"
          aria-label="View Contacts">
          <button
            class="btn btn-block btn-secondary py-2 font-weight-lighter"
            :class="{
              'btn-primary': !editingContactMode && !newContactMode && showContactPanel,
              'btn-white': (editingContactMode || newContactMode) && showContactPanel
            }"
            @click="openContactPanel">
            {{ $t('actions.view-contacts') }}
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="ml-4" />
          </button>
        </div>

        <transactions-list />
      </div>
    </div>
  </div>
</template>

<script>

import ContactList from './components/ContactsList.vue';
import NewContact from './components/NewContact.vue';
import TransactionsList from './components/TransactionsList.vue';

export default {
  name: 'TransfersHistoryApp',
  components: {
    ContactList,
    NewContact,
    TransactionsList,

  },
  computed: {
    modalFormTitle() {
      if (this.editingContactMode) {
        return this.$t('contacts.edit-contact');
      }
      return this.$t('contacts.new-contact');
    },
    fromDate() {
      return this.$store.state.fromDate;
    },
    toDate() {
      return this.$store.state.toDate;
    },
    editingContact: {
      get() {
        return this.$store.state.editingContact;
      },
      set(value) {
        this.$store.commit('SET_EDITING_CONTACT', value);
      },
    },
    editingContactMode() {
      return this.$store.state.editingContactMode;
    },
    newContactMode() {
      return this.$store.state.newContactMode;
    },
    showContactPanel() {
      return this.$store.state.showContactPanel;
    },
    isNewContact() {
      return this.$store.state.newContactMode || !this.$store.state.editingContactMode;
    },
  },
  created() {
    this.$store.commit('SET_SHOW_SEARCH', true);
    this.$store.commit('SET_SHOW_DATE_PICKER', false);
  },
  methods: {
    openContactPanel() {
      this.$store.commit('SET_SHOW_CONTACT_PANEL', true);
      this.$store.commit('SET_EDITING_CONTACT', {});
      this.$store.commit('SET_EDITING_CONTACT_MODE', false);
      this.$store.commit('SET_NEW_CONTACT_MODE', false);
    },
    closeContactPanel() {
      this.$store.commit('SET_SHOW_CONTACT_PANEL', false);
    },
    createNewContact() {
      this.$store.commit('SET_SHOW_CONTACT_PANEL', true);
      this.$store.commit('SET_EDITING_CONTACT', {});
      this.$store.commit('SET_EDITING_CONTACT_MODE', false);
      this.$store.commit('SET_NEW_CONTACT_MODE', true);
    },
    closeContactEditMode() {
      this.$store.commit('SET_EDITING_CONTACT', {});
      this.$store.commit('SET_EDITING_CONTACT_MODE', false);
      this.$store.commit('SET_NEW_CONTACT_MODE', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

.transfers-history__contacts {
  height: auto;

  background-color: #fff;
}

.contacts__header-icon {
  position: absolute;
  top: 50%;

  transform: translateY(-50%);

  &.contacts__header-icon--left {
    left: 0;
  }

  &.contacts__header-icon--right {
    right: 0;
  }
}

@media (max-width: 767.98px) {
  .transfers-history__contacts {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 10;

    width: 100%;

    transition: all .2s ease-in-out;
    transform: translateY(100%);

    &.active {
      transform: translateY(0);
    }
  }
}
</style>
