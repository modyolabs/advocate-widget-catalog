<template>
  <div class="row no-gutters">
    <div
      class="transfer__accounts col-12 col-lg-6 py-4 py-md-5"
      :class="{inactive: step.value == 2}">
      <div class="accounts__title text-center">
        <p class="text-primary h5 font-weight-bold pb-4">
          {{ $t('account.destination-account') }}
        </p>
      </div>

      <div
        v-if="toOthers"
        class="contacts__actions px-4 w-100 mb-4">
        <ul
          class="list-group list-group-horizontal text-center"
          aria-label="Contacts Options">
          <li
            class="list-group-item list-group-item-action font-weight-light px-0"
            :class="{active: !toNewContact}"
            @click.prevent="toggleNewContact(false)">
            {{ $t('actions.contacts') }}
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="ml-1 ml-xl-2" />
          </li>
          <li
            class="list-group-item list-group-item-action font-weight-light px-0"
            :class="{active: toNewContact}"
            @click.prevent="toggleNewContact(true)">
            {{ $t('actions.new-contact') }}
          </li>
        </ul>
      </div>

      <accounts-list v-if="!toOthers" />
      <contacts-list v-if="toOthers && !toNewContact" />
      <new-contact v-if="toOthers && toNewContact" />
    </div>

    <div
      class="transfer__amount col-12 col-lg-6 py-4 py-md-5"
      :class="{active: step.value == 2}">
      <div class="transfer__title text-center">
        <p class="text-primary h5 font-weight-bold pb-4">
          {{ $t('transfer.title') }}
        </p>
      </div>
      <amount-input />
    </div>
  </div>
</template>

<script>
import NewContact from './NewContact.vue';
import AccountsList from './AccountsList.vue';
import ContactsList from './ContactsList.vue';
import AmountInput from './AmountInput.vue';

export default {
  name: 'TransferSelector',
  components: {
    AccountsList,
    ContactsList,
    AmountInput,
    NewContact,
  },
  computed: {
    step() {
      return this.$store.state.step;
    },
    toOthers() {
      return this.$store.state.toOthers;
    },
    toNewContact() {
      return this.$store.state.toNewContact;
    },
  },
  methods: {
    toggleNewContact(value) {
      this.$store.commit('SET_AMOUNT', 0);
      this.$store.commit('SET_TO_ACCOUNT_ID', -1);
      this.$store.commit('SET_TO_NEW_CONTACT', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.transfer__accounts,
.transfer__amount {
  overflow: hidden;

  background-color: $tertiary-20;
}

@media (max-width: 319.98px) {
  .contacts__actions {
    .btn {
      font-size: .9rem;

      .svg-inline--fa {
        margin-left: .125rem !important; /* stylelint-disable-line declaration-no-important */
      }
    }
  }
}

@media (max-width: 991.98px) {
  .transfer__accounts.col-12 {
    position: absolute;

    display: block;

    transition: all .2s ease-in-out;
    transform: translateX(0);

    &.inactive {
      display: none;

      transform: translateX(-100%);
    }
  }

  .transfer__amount.col-12 {
    position: absolute;

    display: none;

    transition: all .2s ease-in-out;
    transform: translateX(100%);

    &.active {
      display: block;

      transform: translateX(0);
    }
  }
}
</style>
