<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">Navbar</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <router-link to="/Home" class="nav-link active" aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item mx-3">
            <router-link to="/Home" class="nav-link">Link</router-link>
          </li>
          <li class="nav-item dropdown">
            <span
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="@/assets/images/avatar.jpg" alt="" class="avatar" />
              <span class="mx-2">{{ $store.getters.userEmail }}</span>
            </span>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <span @click="logout()" class="dropdown-item">
                  Log out
                  <img
                    src="@/assets/images/logout-icon.png"
                    alt=""
                    class="logout-icon"
                  />
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/authentication");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-collapse {
  justify-content: flex-end;

  .nav-item {
    display: flex;
    align-items: center;
  }
  .dropdown-toggle {
    display: flex;
    align-items: center;
  }
  .avatar {
    max-width: 35px;
    max-height: 35px;
  }
  .logout-icon {
    max-width: 25px;
    max-height: 20px;
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
  }
}
</style>
