<template>
  <div class="dashboard-header border-bottom">
    <div class="container">
      <div class="row align-items-center py-3">
        <div class="dashboard-header__left col d-flex align-items-center pl-0">
          <a
            href="#"
            class="dashboard-header__back pr-2"
            aria-label="Go back">
            <font-awesome-icon
              :icon="['fas', 'chevron-left']"
              size="sm" />
          </a>
          <img
            src="https://cloud.modyocdn.com/uploads/c4700764-3f92-4e9f-840b-13684b2994a2/original/title.png"
            alt="Dynamic Insurance"
            class="dashboard-header__logo pr-2"
            height="16">
          <h1 class="h6 dashboard-header__title m-0">
            Copropiedades
          </h1>
        </div>

        <div class="dashboard-header__right col d-flex justify-content-end position-relative pr-0">
          <button
            type="button"
            class="dashboard-header__profile btn btn-sm btn-outline-light rounded-pill text-primary p-1">
            <img
              src="https://cloud.modyocdn.com/uploads/327982ee-72b6-4a46-b559-e1a141e21af6/original/executive-foto.png"
              alt="Benjamin Castex Avatar"
              class="rounded-circle mr-2"
              width="30"
              height="30">
            Benjamin Castex
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="mx-2"
              size="sm" />
          </button>

          <button
            type="button"
            class="dashboard-header__notifications btn btn-outline-light rounded-circle text-primary ml-2">
            <font-awesome-icon
              :icon="['fas', 'bell']"
              size="1x" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DashboardHeader',

};

</script>

<style lang="scss" scoped>
@import "../scss/variables";

.dashboard-header {
  .dashboard-header__back {
    color: $tertiary-100;
  }

  .dashboard-header__profile {
    svg {
      color: $primary-80;
    }
  }

  .dashboard-header__notifications {
    position: absolute;
    right: -50px;

    width: 40px;
    height: 40px;
  }
}
</style>
