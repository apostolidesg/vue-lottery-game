<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-12 col-sm-6 col-xl-4 tab-border">
        <ul class="nav nav-tabs">
          <li class="nav-item" @click="switchAuthMode('login')">
            <span
              class="nav-link"
              :class="{ active: authMode === 'login' }"
              aria-current="page"
              >Log in</span
            >
          </li>
          <li class="nav-item" @click="switchAuthMode('signup')">
            <span
              class="nav-link"
              :class="{ active: authMode !== 'login' }"
              aria-current="page"
              >Sign in</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authMode: {
      type: String,
      required: true,
    },
  },
  methods: {
    switchAuthMode(value) {
      this.$emit("toggle-authorization", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-border {
  background-color: white;
  border: solid 1px;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 2px 2px 6px 2px #000000a3;
  border-bottom: none;
  padding: 1%;

  .nav-item {
    cursor: pointer;
  }
  .nav-tabs {
    border-bottom: none;
  }
}
</style>
