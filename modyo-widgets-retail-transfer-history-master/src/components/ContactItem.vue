<template>
  <div
    :class="{active:isSelected, 'bg-white': !isNew, 'bg-tertiary-20': isNew}"
    class="media p-3 border mt-2 rounded align-items-center position-relative"
    @click="selectContact">
    <span
      v-if="isNew"
      class="contact__new-badge badge badge-info position-absolute text-white font-weight-normal px-2 py-1">
      {{ $t('contact.new') }}
    </span>
    <span class="d-inline-flex justify-content-center align-items-center rounded-circle contact-img mr-3 text-white">
      {{ contact.fullname | initials }}
    </span>
    <div class="media-body">
      <div class="row">
        <div class="col-9">
          <h6 class="mb-0 text-capitalize text-primary">
            {{ contact.fullname }}
          </h6>
          <small class="text-capitalize mb-0">
            {{ contact.bank.name }}
            <span
              v-if="!compact"
              class="d-none d-sm-inline">· {{ contact.accountNumber }}</span>
          </small>
        </div>
        <div class="col-3 d-flex align-items-center justify-content-end">
          <button
            v-if="editable"
            class="p-2 btn btn-link text-tertiary"
            @click.prevent="editContact(contact)">
            <span class="sr-only">{{ $t('contacts.edit-contact') }}</span>
            <font-awesome-icon
              icon="pencil-alt"
              size="xs" />
          </button>
          <button
            class="p-2 btn btn-link text-tertiary"
            @click.prevent="removeContact(contact)">
            <span class="sr-only">{{ $t('contacts.remove-contact') }}</span>
            <font-awesome-icon
              icon="trash-alt"
              size="xs" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isToday, differenceInHours } from 'date-fns';

export default {
  name: 'ContactItem',
  filters: {
    initials(value) {
      const arr = value.split(' ');
      return arr[0][0] + arr[1][0];
    },
  },
  props: {
    contact: { type: Object, required: true },
    compact: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
  },
  data() {
    return {
      newContactHoursDifference: 2,
    };
  },
  computed: {
    isSelected() {
      return this.contact === this.selectedContact;
    },
    selectedContact() {
      return this.$store.state.selectedContact;
    },
    isNew() {
      return isToday(new Date(this.contact.created))
      && Math.abs(differenceInHours(new Date(this.contact.created), new Date())) <= this.newContactHoursDifference;
    },
  },
  methods: {
    selectContact() {
      this.$store.commit('SET_SELECTED_CONTACT', this.contact);
    },
    removeContact() {
      const r = window.confirm(this.$t('contact.delete-msg'));
      if (r === true) {
        this.$store.dispatch('REMOVE_CONTACT', this.contact);
      }
    },
    editContact() {
      this.$store.commit('SET_EDITING_CONTACT_MODE', true);
      this.$store.commit('SET_SHOW_CONTACT_PANEL', true);
      this.$store.commit('SET_EDITING_CONTACT', this.contact);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.contact-img {
  width: 50px;
  height: 50px;

  font-weight: 500;

  background-color: $tertiary-60;
}

.contact__new-badge {
  top: -6px;
  right: -6px;
}
</style>
