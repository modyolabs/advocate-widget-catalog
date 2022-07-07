<template>
  <div
    id="email-sent-view"
    class="container h-100 px-5">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-lg-6 d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-center policy-sent__container rounded w-100">
          <font-awesome-icon
            icon="check-circle"
            class="text-success mt-n4"
            size="3x" />
          <div class="mx-lg-5 px-lg-5 py-4 text-center">
            <h5 class="mb-4">
              {{ $t('email-sent-view.title') }}
            </h5>
            <p>
              {{ $t('email-sent-view.message',{email}) }}
            </p>
          </div>
        </div>
        <a
          href="#"
          class="mt-5 btn btn-primary rounded px-4"
          @click.prevent="viewPolicy">{{ $t('email-sent-view.view-policy') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmailSentView',
  computed: {
    email() {
      return this.$store.state.signEmail;
    },
  },
  methods: {
    viewPolicy() {
      this.$store.commit('SET_SIGN_EMAIL_SENT', false);
      this.$store.commit('SET_SHOW_EMAIL_MODAL', false);
      this.$store.commit('SET_SIGN_EMAIL', '');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.policy-sent__container {
  background-color: rgba(83, 199, 55, .1);
}
</style>
