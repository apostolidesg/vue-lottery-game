import { createStore } from "vuex";
import authModule from "@/store/modules/auth/index.js";
import numbersModule from "@/store/modules/draw/index.js";

export default createStore({
  modules: {
    auth: authModule,
    nums: numbersModule,
  },
});
