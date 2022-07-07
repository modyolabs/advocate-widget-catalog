<template>
  <validation-observer ref="observer">
    <div
      v-for="(group, index) in fields"
      :key="index"
      class="form-builder__group">
      <slot
        v-if="group.title"
        name="group-title"
        :group-title="group.title">
        <h5
          class="font-weight-normal text-secondary mb-4">
          {{ group.title }}
        </h5>
      </slot>
      <span
        v-for="[key, fieldData] in Object.entries(group.fields)"
        :key="key">
        <validation-provider
          v-if="fieldTypes.indexOf(fieldData.fieldType) > -1"
          v-slot="{errors}"
          :rules="fieldData.rules"
          :mode="fieldData.mode ? fieldData.mode : 'aggressive'">
          <div class="form-group">

            <!-- Label -->
            <slot
              v-if="fieldData.label"
              name="label"
              :field-name="key"
              :label="fieldData.label">
              <label
                class="small"
                :for="key">
                {{ fieldData.label }}
                <span v-if="fieldData.rules && fieldData.rules.split('|').indexOf('required') > -1">*</span>
              </label>
            </slot>

            <div class="row no-gutters align-items-center">
              <div :class="fieldData.tooltip ? 'col-10 col-sm-6' : 'col-12'">

                <!-- input: text, email, numbers, telephone -->
                <slot
                  v-if="['text','email'].indexOf(fieldData.fieldType)>-1"
                  name="input-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <input
                    :id="key"
                    v-model="fieldData.value"
                    :type="fieldData.fieldType"
                    :name="fieldData.label"
                    :placeholder="fieldData.placeholder"
                    :maxlength="fieldData.maxlength ? fieldData.maxlength : 50"
                    class="form-control form-control-lg"
                    @keydown="fieldData.rules.split('|').indexOf('numeric') > -1 ? isNumber($event) : null">
                </slot>

                <!-- checkbox -->
                <slot
                  v-else-if="fieldData.fieldType==='checkbox'"
                  name="checkbox-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <div
                    v-for="(option,optionIndex) in fieldData.options"
                    :key="optionIndex"
                    class="custom-control custom-checkbox">
                    <input
                      :id="`${key}-${optionIndex}`"
                      v-model="option.value"
                      type="checkbox"
                      :name="key"
                      class="custom-control-input"
                      :value="option.value">
                    <label
                      class="custom-control-label"
                      :for="`${key}-${optionIndex}`">{{ option.name }}</label>
                  </div>
                </slot>

                <!-- radio -->
                <slot
                  v-else-if="fieldData.fieldType==='radio'"
                  name="radio-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <div
                    v-for="(option,optionIndex) in fieldData.options"
                    :key="optionIndex"
                    class="custom-control custom-radio">
                    <input
                      :id="`${key}-${optionIndex}`"
                      v-model="fieldData.value"
                      type="radio"
                      :name="key"
                      class="custom-control-input"
                      :value="option">
                    <label
                      class="custom-control-label"
                      :for="`${key}-${optionIndex}`">{{ option }}</label>
                  </div>
                </slot>

                <!-- textarea -->
                <slot
                  v-else-if="fieldData.fieldType==='textarea'"
                  name="textarea-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <textarea
                    :id="key"
                    v-model="fieldData.value"
                    :name="fieldData.label"
                    :placeholder="fieldData.placeholder"
                    class="form-control form-control-lg" />
                </slot>

                <!-- money -->
                <slot
                  v-else-if="fieldData.fieldType==='money'"
                  name="money-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <money
                    :id="key"
                    v-model="fieldData.value"
                    :name="fieldData.label"
                    class="form-control form-control-lg"
                    :maxlength="fieldData.maxlength ? fieldData.maxlength : 20 " />
                </slot>

                <!-- date, month, year -->
                <slot
                  v-else-if="['date','month','year'].indexOf(fieldData.fieldType)>-1"
                  name="datepicker-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <vue-date-picker
                    v-model="fieldData.value"
                    v-bind="fieldData.settings"
                    :name="fieldData.label"
                    :type="fieldData.fieldType"
                    :fullscreen-mobile="true">
                    <template #activator="{date}">
                      <button
                        :id="key"
                        :name="fieldData.label"
                        :placeholder="fieldData.placeholder"
                        class="form-control form-control-lg d-flex justify-content-between align-items-center">
                        {{ date ? fieldData.fieldType === 'year' ? fieldData.value : date : '&zwnj;' }}
                        <font-awesome-icon
                          v-if="!fieldData.settings.noCalendarIcon"
                          icon="calendar"
                          class="text-muted"
                          size="sm" />
                      </button>
                    </template>
                  </vue-date-picker>
                </slot>

                <!-- select -->
                <slot
                  v-else-if="fieldData.fieldType==='select'"
                  name="select-field"
                  :field-data="fieldData"
                  :field-name="key">
                  <multiselect
                    :id="key"
                    v-model="fieldData.value"
                    v-bind="fieldData.settings"
                    :name="fieldData.label"
                    :placeholder="fieldData.placeholder" />
                </slot>

                <!-- errors -->
                <slot
                  v-if="errors.length>0"
                  name="error"
                  :error="errors[0]">
                  <span
                    class="text-danger small">{{ errors[0] }}</span>
                </slot>
              </div>

              <slot
                v-if="fieldData.tooltip"
                name="tooltip"
                :tooltip="fieldData.tooltip">
                <div
                  class="col d-flex justify-content-end justify-content-sm-start">
                  <button
                    v-tooltip:top="fieldData.tooltip"
                    class="btn text-muted p-0 ml-sm-4 d-flex">
                    <font-awesome-icon
                      icon="info-circle"
                      size="lg" />
                  </button>
                </div>
              </slot>
            </div>
          </div></validation-provider>

        <!-- RUT -->

        <rut
          v-else-if="fieldData.fieldType==='rut'"
          :id="key"
          :rut="fieldData" />
      </span>
    </div>
  </validation-observer>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Money } from 'v-money-no-negative';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import Multiselect from 'vue-multiselect';
import Rut from './Rut.vue';
import isNumber from '../../commons/isNumber';

export default {
  name: 'FormBuilder',
  components: {
    ValidationObserver,
    ValidationProvider,
    Money,
    VueDatePicker,
    Multiselect,
    Rut,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // Normal inputs
      fieldTypes: [
        'text',
        'email',
        'textarea',
        'money',
        'date',
        'month',
        'year',
        'select',
        'checkbox',
        'radio',
      ],
      otherFieldTypes: ['rut'],
      valid: false,
    };
  },
  watch: {
    fields: {
      deep: true,
      handler: 'isValid',
    },
  },
  methods: {
    isNumber,
    async isValid() {
      this.valid = await this.$refs.observer.validate({ silent: true });
      this.$emit('can-submit', this.valid);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@mathieustan/vue-datepicker/dist/vue-datepicker.min.css"></style>

<style lang="scss" scoped>
@import "../../scss/variables";

.form-builder__group {
  + .form-builder__group {
    padding-top: 1.5rem;
    margin-top: 1.5rem;

    border-top: 1px solid $primary-10;
  }
}
</style>
