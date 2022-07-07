<template>
  <div
    class="bg-tertiary-20 p-4 p-sm-5 d-none d-lg-flex flex-column
    justify-content-center align-items-center">
    <h3 class="text-center">
      <font-awesome-icon
        icon="ban"
        class="consumer-loan__max-amount-exceeded-icon d-block mx-auto mb-4" />
      <i18n
        path="main.credit-amount-exceeds-msg"
        tag="span">
        <br>
        <strong class="text-primary">{{ currency(available, $t('currency.format')) }}</strong>
      </i18n>
    </h3>
    <i18n
      path="main.credit-quote-increase-request"
      tag="p"
      class="mt-5">
      <a href="#">{{ $t('main.credit-quote-increase-request-link') }}
        <strong class="consumer-loan__request-quota-increase-link-strong">
          {{ $t('main.credit-quote-increase-request-link-strong') }}
        </strong>
      </a>
    </i18n>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { currency } from '@modyo/financial-commons';

export default {
  name: 'MaxQuotaMessage',
  computed: mapGetters(['available']),
  methods: { currency },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

.consumer-loan__request-quota-increase-link-strong {
  color: $primary;
  text-decoration: underline;
}

.consumer-loan__max-amount-exceeded-icon {
  font-size: 5rem;
}
</style>
