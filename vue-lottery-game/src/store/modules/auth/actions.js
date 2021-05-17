import { authUser } from "@/api/login.js";

export default {
  auth(context, payload) {
    let isLogin = payload.isLogin;
    let userEmail = payload.email;
    let userPassword = payload.password;
    return new Promise((resolve, reject) => {
      authUser(isLogin, userEmail, userPassword)
        .then((response) => {
          console.log(response.data);
          context.commit("setUser", {
            token: response.data.idToken,
            userId: response.data.localId,
            tokenExpiration: response.data.expiresIn,
          });
          // localStorage.setItem("user-token", response.data.idToken);
          resolve(response.data);
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
