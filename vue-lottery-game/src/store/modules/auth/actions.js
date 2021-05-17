import { authUser } from "@/api/login.js";

let timer;

export default {
  auth(context, payload) {
    let isLogin = payload.isLogin;
    let userEmail = payload.email;
    let userPassword = payload.password;
    return new Promise((resolve, reject) => {
      authUser(isLogin, userEmail, userPassword)
        .then((response) => {
          const expiresIn = +response.expiresIn * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("userId", response.data.localId);
          localStorage.setItem("tokenExpiration", expirationDate);
          localStorage.setItem("userEmail", userEmail);

          timer = setTimeout(() => {
            context.dispatch("tryLogout");
          }, expiresIn);

          context.commit("setUser", {
            token: response.data.idToken,
            userId: response.data.localId,
            userEmail: userEmail,
          });
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
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const userEmail = localStorage.getItem("userEmail");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("tryLogout");
    }, expiresIn);

    if (token && userId && userEmail) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        userEmail: userEmail,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokerExpiration");
    localStorage.removeItem("userEmail");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
      userEmail: null,
    });
  },
  tryLogout(context) {
    context.dispatch("logout");
    context.commit("didAutoLogout");
  },
};
