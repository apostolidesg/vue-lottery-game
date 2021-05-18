import mutations from "@/store/modules/draw/mutations.js";
import getters from "@/store/modules/draw/getters.js";
import actions from "@/store/modules/draw/actions.js";

export default {
  state() {
    return {
      isReady: false,
      drawNumbers: null,
      playerBet: null,
      totalAmountWon: null,
    };
  },
  mutations,
  getters,
  actions,
};
