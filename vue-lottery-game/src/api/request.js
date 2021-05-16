import axios from "axios";

const service = axios.create({
  baseURL:
    "https://vue-lottery-game-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default service;
