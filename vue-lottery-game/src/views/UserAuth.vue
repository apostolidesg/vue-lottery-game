<template>
  <div class="auth-wrapper w-100">
    <authentication-tabs
      :authMode="authMode"
      @toggle-authorization="switchAuthMode"
    ></authentication-tabs>
    <authentication-form
      :authMode="authMode"
      @toggle-authorization="switchAuthMode"
    ></authentication-form>
  </div>
</template>

<script>
import AuthenticationTabs from "@/components/auth/AuthTabs";
import AuthenticationForm from "@/components/auth/AuthForm";
export default {
  components: {
    AuthenticationTabs,
    AuthenticationForm,
  },
  data() {
    return {
      authMode: "login",
      isLoading: false,
      error: null,
    };
  },
  methods: {
    switchAuthMode(value) {
      this.authMode = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
