export default {
  setDraw(state, payload) {
    state.isReady = payload.isReady;
    state.drawNumbers = payload.drawNumbers;
    state.winningNumbers = payload.winningNumbers;
    state.playerBet = payload.playerBet;
  },
  setAmountWon(state, payload) {
    state.totalAmountWon = payload.totalAmountWon;
  },
  resetDraw(state) {
    state.isReady = false;
    state.drawNumbers = null;
    state.winningNumbers = null;
    state.playerBet = 0;
    state.totalAmountWon = 0;
  },
};
