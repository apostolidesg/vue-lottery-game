export default {
  setDraw(state, payload) {
    state.isReady = payload.isReady;
    state.drawNumbers = payload.drawNumbers;
    state.playerBet = payload.playerBet;
  },
  setAmountWon(state, payload) {
    state.totalAmountWon = payload.totalAmountWon;
  },
};