import axios from "axios";

export function createUser(userEmail, userPassword) {
  return axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPiXHMCgl5gnNShPV2r5i3XXqR6dCO5P4",
    {
      email: userEmail,
      password: userPassword,
      returnSecureToken: true,
    }
  );
}
