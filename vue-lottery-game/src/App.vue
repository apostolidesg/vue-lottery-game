<template>
  <nav-bar v-if="$store.getters.isAuthenticated"></nav-bar>
  <router-view />
</template>

<script>
import NavBar from "@/components/nav/NavBar";
export default {
  components: {
    NavBar,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.push("/authentication");
      }
    },
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #529fff;
}
</style>
