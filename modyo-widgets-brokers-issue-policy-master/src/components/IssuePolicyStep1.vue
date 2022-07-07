<template>
  <div
    id="issue-policy-step-1"
    class="container px-4 px-sm-3">
    <div class="px-0 px-md-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <form-builder
        :fields="formFields"
        @can-submit="canSubmit" />
    </div>
  </div>
</template>

<script>
import FormBuilder from './FormBuilder/FormBuilder.vue';

export default {
  name: 'IssuePolicyStep1',
  components: {
    FormBuilder,
  },
  data() {
    return {
      formFields: [{
        title: '',
        fields: {
          startDate: {
            fieldType: 'date',
            rules: 'required',
            label: this.$t('issue-policy.step1.validity.start-date'),
            settings: {
              noHeader: true,
              format: 'DD/MM/YYYY',
            },
          },
          propertyType: {
            fieldType: 'select',
            rules: 'required',
            label: this.$t('issue-policy.step1.validity.property-type'),
            placeholder: this.$t('issue-policy.step1.validity.property-type-placeholder'),
            settings: {
              options: this.$t('issue-policy.step1.validity.property-types-list'),
              showLabels: false,
            },
          },
        },
      }],
    };
  },
  methods: {
    canSubmit(valid) {
      // console.log(`can submit: ${valid}`);
      this.$store.commit('SET_STEP_VALIDATION', { stepNumber: 1, valid });
    },
  },
};
</script>
