import { createUser } from "@/api/login.js";

export default {
  login() {},
  signup(context, payload) {
    let userEmail = payload.email;
    let userPassword = payload.password;
    return new Promise((resolve, reject) => {
      createUser(userEmail, userPassword)
        .then((repsonseData) => {
          context.commit("setUser", {
            token: repsonseData.idToken,
            userId: repsonseData.localId,
            tokenExpiration: repsonseData.expiresIn,
          });
          resolve(repsonseData);
        })
        .catch((error) => {
          const errorMessage = new Error(
            error.response.data.error.message || "Failed to authenticate."
          );
          reject(errorMessage);
        });
    });
  },
};
