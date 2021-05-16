<template>
  <div class="login-wrapper w-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col col-12 col-sm-6 col-xl-4 tab-border">
          <ul class="nav nav-tabs">
            <li class="nav-item" @click="toggleForm(true)">
              <span
                class="nav-link"
                :class="{ active: isLogin }"
                aria-current="page"
                >Log in</span
              >
            </li>
            <li class="nav-item" @click="toggleForm(false)">
              <span
                class="nav-link"
                :class="{ active: !isLogin }"
                aria-current="page"
                >Sign in</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col col-12 col-sm-6 col-xl-4 p-4 form-border">
          <form @submit.prevent>
            <div class="mb-3">
              <label for="emailInput" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <label for="psdInput" class="form-label">Password</label>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                id="psdInput"
                aria-describedby="eye-addon"
                ref="psdInput"
                required
              />
              <span
                class="input-group-text"
                id="eye-addon"
                @click="togglePassword()"
              >
                <img
                  v-if="imgType === 'password'"
                  src="@/assets/login-form/eye-hide.png"
                  class="w-100"
                />
                <img
                  v-else
                  src="@/assets/login-form/eye-show.png"
                  class="w-100"
                />
              </span>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="consent"
                required
              />
              <label class="form-check-label" for="exampleCheck1"
                >Agree to terms and services</label
              >
            </div>
            <button v-if="isLogin" type="submit" class="btn btn-primary w-100">
              Login
            </button>
            <button v-else type="submit" class="btn btn-primary w-100">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      imgType: "password",
    };
  },
  methods: {
    toggleForm(value) {
      this.isLogin = value;
    },
    togglePassword() {
      this.imgType = this.$refs["psdInput"].type;

      this.imgType === "password"
        ? (this.$refs["psdInput"].type = "text")
        : (this.$refs["psdInput"].type = "password");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  .tab-border,
  .form-border {
    background-color: white;
    border: solid 1px;

    .nav-item {
      cursor: pointer;
    }
  }
  .tab-border {
    border-radius: 5px 5px 0px 0px;
    box-shadow: 2px 2px 6px 2px #000000a3;
    border-bottom: none;
    padding: 1%;
  }
  .form-border {
    border-radius: 0px 0px 5px 5px;
    box-shadow: 2px 5px 4px 2px #000000a3;
    border-top: none;
  }
  .nav-tabs {
    border-bottom: none;
  }
  #eye-addon {
    max-width: 40px;
    padding: 5px 6px;
    cursor: pointer;
  }
}
</style>
