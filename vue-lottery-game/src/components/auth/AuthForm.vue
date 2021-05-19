<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-12 col-sm-6 col-xl-4 p-4 form-border">
        <div v-if="!!error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <div
          v-if="authMode !== 'login' && success"
          class="alert alert-success"
          role="alert"
        >
          User created successfully! Please log in.
        </div>
        <form @submit.prevent="submitUser()">
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input
              v-model.trim="userEmail"
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
              v-model.trim="userPwd"
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
                v-if="inputType === 'password'"
                src="@/assets/login-form/eye-hide.png"
                class="w-100"
              />
              <img
                v-else
                src="@/assets/login-form/eye-show.png"
                class="w-100"
              />
            </span>
            <div
              v-if="checkPwd && authMode !== 'login'"
              class="custom-validation"
            >
              The password must have more than 6 characters.
            </div>
          </div>
          <div class="mb-3 form-check">
            <input
              v-model="isChecked"
              type="checkbox"
              class="form-check-input"
              id="consent"
              required
            />
            <label class="form-check-label" for="exampleCheck1"
              >Agree to terms and services</label
            >
          </div>
          <button
            v-if="authMode === 'login'"
            type="submit"
            class="btn btn-primary w-100"
          >
            Login
          </button>
          <button
            v-else-if="authMode === 'signup'"
            type="submit"
            class="btn btn-primary w-100"
          >
            <div v-if="isLoading">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </div>
            <div v-else>
              Sign up
            </div>
          </button>
        </form>
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
  data() {
    return {
      inputType: "password",
      userEmail: "",
      userPwd: "",
      isLoading: false,
      error: null,
      success: false,
      isChecked: false,
    };
  },
  watch: {
    authMode() {
      this.userEmail = "";
      this.userPwd = "";
      this.success = false;
      this.error = null;
      this.isChecked = false;
    },
  },
  computed: {
    checkPwd() {
      return this.userPwd.length < 6 ? true : false;
    },
  },
  methods: {
    togglePassword() {
      this.inputType = this.$refs["psdInput"].type;

      this.inputType === "password"
        ? (this.$refs["psdInput"].type = "text")
        : (this.$refs["psdInput"].type = "password");
    },
    submitUser() {
      this.isLoading = true;
      this.error = null;
      this.success = false;
      let dispatchObject = {
        isLogin: this.authMode === "login",
        email: this.userEmail,
        password: this.userPwd,
      };

      this.$store
        .dispatch("auth", dispatchObject)
        .then(() => {
          if (this.authMode === "login") {
            this.$router.push("/Home");
          } else {
            this.success = true;
          }
        })
        .catch((error) => {
          error.message === "INVALID_EMAIL"
            ? (this.error = 'Invalid username. Try adding "@" or ".com".')
            : (this.error = error.message);
        });

      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-border {
  background-color: white;
  border: solid 1px;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 2px 5px 4px 2px #000000a3;
  border-top: none;

  .nav-item {
    cursor: pointer;
  }
  #eye-addon {
    max-width: 40px;
    padding: 5px 6px;
    cursor: pointer;
  }
  .custom-validation {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
  }
}
</style>
