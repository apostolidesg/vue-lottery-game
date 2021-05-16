import axios from "axios";

export function createUser(userEmail, userPassword) {
  return axios.post(
    "https://vue-lottery-game-default-rtdb.europe-west1.firebasedatabase.app/users.json",
    {
      email: userEmail,
      password: userPassword,
    }
  );
}
