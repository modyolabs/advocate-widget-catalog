export default {
  SET_STEP_VALIDATION(state, data) {
    state[`step${data.stepNumber}`].valid = data.valid;
  },
  SET_CONFIRMATION(state, data) {
    state.confirmed = data;
  },
};
