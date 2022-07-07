<template>
  <div class="transfer__contact-item mx-4">
    <button
      :class="isSelected ? 'bg-primary active' : 'bg-white'"
      class="transfer__contact-item-btn media align-items-center btn btn-block text-left px-3 py-2"
      @click="handleClick">
      <span class="d-inline-flex justify-content-center align-items-center rounded-circle contact-img mr-3">
        {{ contact.fullname | initials }}
      </span>
      <div class="media-body">
        <div class="row no-gutters align-items-center">
          <div class="col-10 pr-0">
            <h6 class="mb-0 text-capitalize">
              {{ contact.fullname }}
            </h6>
            <small class="text-capitalize mb-0">
              {{ contact.bank.name }}
              <span
                v-if="!compact"
                class="d-none d-sm-inline">· {{ contact.accountNumber }}</span>
            </small>
          </div>
          <div class="col-2 d-flex justify-content-end">
            <font-awesome-icon
              icon="chevron-right" />
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script>

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
  computed: {
    toAccount() {
      return this.$store.getters.toAccount;
    },
    isSelected() {
      return this.contact === this.toAccount;
    },
    stepper() {
      return this.$store.state.stepper;
    },
  },
  methods: {

    handleClick() {
      this.selectContact();
      this.stepper.next();
    },
    selectContact() {
      this.$store.commit('SET_TO_ACCOUNT_ID', this.contact.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.transfer__contact-item {
  &:not(:first-child) {
    margin-top: .5rem;
  }

  .transfer__contact-item-btn {
    color: $primary;

    border: 1px solid $primary-10;
    border-radius: 10px;

    &.active {
      color: $secondary-20;

      .contact-img {
        color: $primary-80;

        background-color: $primary-20;
      }
    }

    .contact-img {
      width: 50px;
      height: 50px;

      font-weight: 500;
      color: #fff;

      background-color: $primary-80;
    }
  }
}
</style>
