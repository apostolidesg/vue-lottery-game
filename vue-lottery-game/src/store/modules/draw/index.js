import mutations from "@/store/modules/draw/mutations.js";
import getters from "@/store/modules/draw/getters.js";
import actions from "@/store/modules/draw/actions.js";

export default {
  state() {
    return {
      isReady: false,
      drawNumbers: null,
      winningNumbers: null,
      playerBet: 0,
      totalAmountWon: 0,
    };
  },
  mutations,
  getters,
  actions,
};
