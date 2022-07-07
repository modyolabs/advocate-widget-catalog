<template>
  <div
    class="success-message container h-100 px-0 px-lg-5 mt-4">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-8 d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-center success-message__container rounded w-100 px-4">
          <font-awesome-icon
            icon="check-circle"
            class="text-success mt-n4"
            size="3x" />
          <div class="mx-md-5 px-md-5 py-4 text-center">
            <h5 class="mb-4">
              {{ title }}
            </h5>
            <p>
              {{ message }}
            </p>
          </div>
        </div>
        <a
          href="#"
          class="mt-lg-5 mt-4 btn btn-primary btn-block-mobile rounded px-4 py-3 py-lg-2"
          @click.prevent="$emit('close')">{{ $t('commons.back-home') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SuccessMessage',
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.success-message__container {
  background-color: rgba(83, 199, 55, .1);
}
</style>
