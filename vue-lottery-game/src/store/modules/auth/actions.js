import { createUser } from "@/api/login.js";

export default {
  login() {},
  signup(context, payload) {
    let userEmail = payload.email;
    let userPassword = payload.password;
    createUser(userEmail, userPassword)
      .then((repsonseData) => {
        console.log(repsonseData);
        context.commit("setUser", {
          token: repsonseData.idToken,
          userId: repsonseData.localId,
          tokenExpiration: repsonseData.expiresIn,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        const errorMessage = new Error(
          error.response.data.error.message || "Failed to authenticate."
        );
        throw errorMessage;
      });
  },
};
