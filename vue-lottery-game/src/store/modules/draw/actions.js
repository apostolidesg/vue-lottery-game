export default {
  startDraw(context, payload) {
    context.commit("setDraw", {
      isReady: payload.isReady,
      drawNumbers: payload.drawNumbers,
      playerBet: payload.playerBet,
    });
  },
  resetDraw(context) {
    context.commit("resetDraw");
  },
  setAmount(context, payload) {
    context.commit("setAmountWon", {
      totalAmountWon: payload.amountWon,
    });
  },
};
