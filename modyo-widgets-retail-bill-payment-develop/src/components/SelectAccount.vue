<template>
  <div class="row">
    <div class="col-12 mt-4">
      <div class="text-center">
        {{ $t('bill.pay-from') }}
      </div>
      <div class="selectorAccount mt-4">
        <button
          id="btnAccount"
          class="d-flex align-items-center p-3 border-0 bill__header rounded bg-primary-10 w-100"
          type="button"
          @click="handlePaymentClick">
          <div class="circle-bill-icon me-3">
            <font-awesome-icon
              class="text-primary"
              icon="wallet"
              size="lg" />
          </div>
          <div class="text-capitalize text-start flex-grow-1">
            <div class="text-truncate fw-500 fs-6">
              {{ $t('selector.transaction-account') }}
            </div>
            <div class="text-truncate primary-60 fs-7">
              Nº 21332341
            </div>
          </div>
          <font-awesome-icon
            class="text-primary"
            icon="chevron-right"
            size="lg" />
        </button>
        <button
          id="btnAccount"
          class="d-flex align-items-center p-3 border-0 bill__header rounded bg-primary-10 w-100 mt-3"
          type="button"
          @click="handlePaymentClick">
          <div class="circle-bill-icon me-3">
            <font-awesome-icon
              class="text-primary"
              icon="credit-card"
              size="lg" />
          </div>
          <div class="text-capitalize text-start flex-grow-1">
            <div class="text-truncate fw-500 fs-6">
              {{ $t('selector.credit-card') }}
            </div>
            <div class="text-truncate primary-60 fs-7">
              Nº 2934809849
            </div>
          </div>
          <font-awesome-icon
            class="text-primary"
            icon="chevron-right"
            size="lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelectAccount',
  methods: {
    handlePaymentClick() {
      this.$store.commit('SET_STEP_ACTION', 'confirm');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.bg-primary-10 {
  background: $primary-10;
}

.primary-60 {
  color: $primary-60;
}

.fs-7 {
  font-size: 12px;
}

.fw-500 {
  font-weight: 500;
}

.circle-bill-icon {
  display: inline-block;

  width: 40px;
  height: 40px;

  line-height: 40px;
  text-align: center;

  background: #fff;
  border-radius: 50%;
}
</style>
