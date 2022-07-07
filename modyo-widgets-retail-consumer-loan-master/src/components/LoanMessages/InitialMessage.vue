<template>
  <div
    class="bg-tertiary-20 p-5 d-none d-lg-flex align-items-center">
    <div>
      <span class="consumer-loan__initial-msg-icon"><font-awesome-icon icon="arrow-circle-left" /></span>
      <i18n
        path="main.credit-minimum-amount-insert-msg"
        tag="h3"
        class="font-weight-light h4">
        <strong class="text-primary font-weight-bold">
          {{ $t('main.credit-minimum-amount-insert-msg-strong') }}
        </strong>
      </i18n>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InitialMessage',
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

.consumer-loan__initial-msg-icon {
  position: absolute;
  top: 50%;
  left: 0;

  display: flex;

  align-items: center;

  margin-top: -24px;
  margin-left: -24px;

  font-size: 48px;
  color: $primary-100;

  background-color: #fff;
  border-radius: 50%;
}
</style>
