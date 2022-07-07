<template>
  <div class="container px-4 px-sm-3">
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
  name: 'Step1Form',
  components: {
    FormBuilder,
  },
  data() {
    return {
      formFields: [
        {
          title: '',
          fields: {
            id: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.owner.id'),
            },
            socialReason: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.owner.social-reason'),
            },
            email: {
              fieldType: 'email',
              rules: 'email|required',
              label: this.$t('quote.step1.owner.email'),
            },
          },
        },
        {
          title: this.$t('quote.step1.location-data'),
          fields: {
            country: {
              fieldType: 'select',
              rules: 'required',
              label: this.$t('quote.step1.location.country'),
              settings: {
                options: this.$t('countries'),
              },
            },
            street: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.location.street'),
            },
            city: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.location.city'),
            },
            region: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.location.region'),
            },
            zip: {
              fieldType: 'text',
              rules: 'required|numeric',
              label: this.$t('quote.step1.location.zip'),
            },
          },
        },
        {
          title: this.$t('quote.step1.building-data'),
          fields: {
            year: {
              fieldType: 'year',
              rules: 'numeric|required',
              label: this.$t('quote.step1.building.year'),
              tooltip: this.$t('quote.step1.building.year'),
              settings: {
                noHeader: true,
                minDate: new Date([
                  1900,
                  1,
                  1,
                ]),
                maxDate: new Date(),
                visibleYearsNumber: 120,
                noCalendarIcon: true,
              },
            },
            floors: {
              fieldType: 'text',
              rules: 'numeric|required',
              label: this.$t('quote.step1.building.floors'),
              tooltip: this.$t('quote.step1.building.floors'),
            },
            units: {
              fieldType: 'text',
              rules: 'numeric|required',
              label: this.$t('quote.step1.building.units'),
              tooltip: this.$t('quote.step1.building.units'),
            },
          },
        },
        {
          title: this.$t('quote.step1.administration-data'),
          fields: {
            administrationType: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.administration.document-type'),
            },
            administrationId: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.administration.id'),
            },
            administationName: {
              fieldType: 'text',
              rules: 'required',
              label: this.$t('quote.step1.administration.name'),
            },
          },
        },
      ],
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
