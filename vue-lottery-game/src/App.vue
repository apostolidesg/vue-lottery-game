<template>
  <nav-bar v-if="$route.name != 'Authentication'"></nav-bar>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
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
.route-enter-from {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.3s ease;
}
.route-leave-to {
  opacity: 0;
}
.route-leave-active {
  transition: all 0.3s ease;
}
</style>
