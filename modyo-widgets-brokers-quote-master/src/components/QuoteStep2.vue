<template>
  <div class="container px-4 px-sm-3">
    <div class="px-0 px-md-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <form-builder
        :fields="groupFields"
        @can-submit="canSubmit" />
    </div>
  </div>
</template>

<script>
import FormBuilder from './FormBuilder/FormBuilder.vue';

export default {
  name: 'Step2Form',
  components: {
    FormBuilder,
  },
  data() {
    return {
      groupFields: [{
        title: this.$t('quote.step2.insured-values.insured-values-data'),
        fields: {
          commonArea: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.common-area'),
          },
          foundation: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.foundation'),
          },
          privateArea: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.private-area'),
          },
          machinesAndEquipment: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.machines-and-equipment'),
          },
          furnitureAndFixtures: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.furniture-and-fixtures'),
          },
          moneyAndSecurities: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.money-and-securities'),
          },
          art: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.art'),
          },
          electronicEquipment: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.electronic-equipment'),
          },
          total: {
            fieldType: 'money',
            rules: 'required',
            label: this.$t('quote.step2.insured-values.values.total'),
          },
        },
      }],
    };
  },
  methods: {
    canSubmit(valid) {
      this.$store.commit('SET_STEP_VALIDATION', { stepNumber: 2, valid });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.quote-step__input-group {
  + .quote-step__input-group {
    border-top: 1px solid $primary-10;
  }
}
</style>
