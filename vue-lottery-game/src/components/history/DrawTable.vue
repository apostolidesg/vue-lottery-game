<template>
  <div class="container table-responsive my-5">
    <div v-if="isDeleted" class="alert alert-success my-2" role="alert">
      Draw record history deleted successfully!
      <button
        type="button"
        class="btn-close btn-sm"
        aria-label="Close"
        @click="isDeleted = false"
      ></button>
    </div>
    <table class="table table-hover text-center align-middle my-3">
      <thead>
        <tr>
          <th scope="col">Draw Numbers</th>
          <th scope="col">Draw Status</th>
          <th scope="col">Player Bet</th>
          <th scope="col">Amount Won</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="draws">
        <tr v-for="(draw, index) in draws" :key="draw.id">
          <td @click.self="toggleModal(draw)">{{ draw.drawNumbers }}</td>
          <td @click.self="toggleModal(draw)">
            {{ drawStatus(draw.totalAmountWon) }}
          </td>
          <td @click.self="toggleModal(draw)">{{ draw.playerBet }} €</td>
          <td @click.self="toggleModal(draw)">
            {{ drawAmountWon(draw.totalAmountWon) }}
          </td>
          <td @click.self="toggleModal(draw)">
            <img
              src="@/assets/images/close-icon.png"
              alt=""
              @click="deleteHistory(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="!draws" class="container no-history">
    <div class="no-history-modal w-75 w-sm-50 p-4">
      No Histories Yet...
    </div>
  </div>
</template>

<script>
import { fetchHistories, deleteHistory } from "@/api/history.js";
export default {
  emits: ["toggle-modal"],
  data() {
    return {
      draws: true,
      isDeleted: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetchHistories().then((response) => {
        this.draws = response.data;
      });
    },
    deleteHistory(index) {
      deleteHistory(index).then(() => {
        this.fetchData();
      });
      this.isDeleted = true;
    },
    drawStatus(totalAmountWon) {
      return totalAmountWon > 0 ? "Won" : "Lost";
    },
    drawAmountWon(amount) {
      return amount > 0 ? `${amount} €` : "-";
    },
    toggleModal(historyData) {
      console.log(historyData);
      this.$emit("toggle-modal", historyData);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: white;

  img {
    max-width: 20px;
    cursor: pointer;
  }
  .alert {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: auto;
    text-align: center;
  }
}
.no-history {
  background-color: #9acd3200;
  .no-history-modal {
    margin: auto;
    text-align: center;
    background: white;
    border-radius: 16px;
    font-size: 150%;
    font-weight: bold;
    color: #222;
    box-shadow: 1px 1px 3px 2px grey;
  }
}
</style>
