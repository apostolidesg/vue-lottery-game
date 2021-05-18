import axios from "axios";

export function addHistory(
  winningNumbers,
  drawNumbers,
  playerBet,
  totalAmountWon
) {
  const expirationDate = new Date().toLocaleString();
  return axios.post(
    "https://vue-lottery-game-default-rtdb.europe-west1.firebasedatabase.app/histories.json",
    {
      expirationDate: expirationDate,
      winningNumbers: winningNumbers,
      drawNumbers: drawNumbers,
      playerBet: playerBet,
      totalAmountWon: totalAmountWon,
    }
  );
}

export function fetchHistories() {
  return axios.get(
    "https://vue-lottery-game-default-rtdb.europe-west1.firebasedatabase.app/histories.json"
  );
}

export function deleteHistory(historyId) {
  return axios.delete(
    `https://vue-lottery-game-default-rtdb.europe-west1.firebasedatabase.app/histories/${historyId}.json`
  );
}
