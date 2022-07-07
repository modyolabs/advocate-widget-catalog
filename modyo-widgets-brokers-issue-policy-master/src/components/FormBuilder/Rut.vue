<template>
  <validation-observer
    ref="observer"
    v-slot="{errors}">
    <div class="form-group">
      <label
        class="small"
        :for="id">
        {{ rut.label }}
        <span v-if="rut.rules.split('|').indexOf('required') > -1">*</span>
      </label>
      <div class="row no-gutters mb-1">
        <div class="col-9 col-sm-10">
          <validation-provider
            :rules="rut.rules"
            :mode="rut.mode ? rut.mode : 'aggressive'">
            <input
              :id="id"
              v-model.number="localRut"
              :name="rut.label"
              type="text"
              maxlength="8"
              class="form-control form-control-lg"
              @keydown="isNumber($event)">
          </validation-provider>
        </div>
        <div class="col pl-3">
          <validation-provider
            :rules="rut.rules"
            :mode="rut.mode ? rut.mode : 'aggressive'">
            <input
              :id="`${id}-checkDigit`"
              v-model="localRut"
              :name="$t('form-builder.rutCheckDigit')"
              type="text"
              maxlength="1"
              class="form-control form-control-lg text-center text-uppercase px-0">
          </validation-provider>
        </div>
      </div>
      <span
        v-for="(error, index) in errors"
        :key="index"
        class="text-danger small d-block">
        {{ error[0] }}
      </span>
    </div>
  </validation-observer>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import isNumber from '../../commons/isNumber';

export default {
  name: 'RUT',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    rut: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localRut: '',
    };
  },
  watch: {
    rut: {
      deep: true,
      handler() {
        this.localRut = this.rut.numbers + this.rut.checkDigit;
      },
    },
  },
  methods: {
    isNumber,
  },
};
</script>
