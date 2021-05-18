<template>
  <div class="container table-responsive my-5">
    <table class="table table-hover text-center align-middle">
      <thead>
        <tr>
          <th scope="col">Draw Numbers</th>
          <th scope="col">Draw Status</th>
          <th scope="col">Player Bet</th>
          <th scope="col">Amount Won</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="draws">
        <tr v-for="draw in draws" :key="draw.id">
          <td>{{ draw.drawNumbers }}</td>
          <td>{{ drawStatus(draw.totalAmountWon) }}</td>
          <td>{{ draw.playerBet }} €</td>
          <td>{{ drawAmountWon(draw.totalAmountWon) }}</td>
          <td>{{ draw.expirationDate }}</td>
          <td>
            <div class="remove-history">
              <img src="@/assets/images/close-icon.png" alt="" />
            </div>
          </td>
        </tr>
      </tbody>
      <div v-else class="no-history">
        <div class="no-history-modal p-4">
          No Histories Yet...
        </div>
      </div>
    </table>
  </div>
</template>

<script>
import { fetchHistories } from "@/api/history.js";
export default {
  data() {
    return {
      draws: null,
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
    drawStatus(totalAmountWon) {
      return totalAmountWon > 0 ? "Won" : "Lost";
    },
    drawAmountWon(amount) {
      return amount > 0 ? `${amount} €` : "-";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: white;

  .remove-history {
    img {
      max-width: 20px;
      cursor: pointer;
    }
  }

  .no-history {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .no-history-modal {
      background: white;
      border-radius: 16px;
      font-size: 150%;
      font-weight: bold;
      color: #222;
      box-shadow: 1px 1px 3px 2px grey;
    }
  }
}
</style>
