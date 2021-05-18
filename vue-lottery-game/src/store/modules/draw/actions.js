export default {
  startDraw(context, payload) {
    context.commit("setDraw", {
      isReady: payload.isReady,
      drawNumbers: payload.drawNumbers,
      playerBet: payload.playerBet,
    });
  },
};
