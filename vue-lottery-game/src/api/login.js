import axios from "axios";

export function authUser(isLogin, userEmail, userPassword) {
  if (!isLogin) {
    return axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPiXHMCgl5gnNShPV2r5i3XXqR6dCO5P4",
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }
    );
  } else {
    return axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPiXHMCgl5gnNShPV2r5i3XXqR6dCO5P4",
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }
    );
  }
}
