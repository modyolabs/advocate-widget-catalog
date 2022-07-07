<template>
  <div
    class="funds-change-success container h-100 px-0 px-lg-5 mt-4">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-8 d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-center funds-change-success__container rounded w-100 px-4">
          <font-awesome-icon
            icon="check-circle"
            class="text-success mt-n4"
            size="3x" />
          <div class="mx-md-5 px-md-5 py-4 text-center">
            <h5 class="mb-4">
              {{ $t('funds.change.request.title') }}
            </h5>
            <p>
              {{ $t('funds.change.request.message', {email: fundsChange.receiptEmail}) }}
            </p>
          </div>
        </div>
        <a
          href="#"
          class="mt-lg-5 mt-4 btn btn-primary btn-block-mobile rounded px-4 py-3 py-lg-2"
          @click.prevent="goHome">{{ $t('funds.change.request.back-home') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FundsChangeSuccess',
  props: {
    drawer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fundsChange() {
      return this.$store.state.fundsChange;
    },
  },
  methods: {
    goHome() {
      this.drawer.closeDrawer();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.funds-change-success__container {
  background-color: rgba(83, 199, 55, .1);
}
</style>
