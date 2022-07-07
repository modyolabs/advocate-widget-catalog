export default {
  SET_STEP_VALIDATION(state, data) {
    state[`step${data.stepNumber}`].valid = data.valid;
  },
};
