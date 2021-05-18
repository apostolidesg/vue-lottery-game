<template>
  <div v-if="isShown" class="draw-modal-overlay">
    <div class="draw-modal pt-5 pb-3">
      <div v-if="playerWon" class="header mb-3 px-5 pb-4">Congratulations!</div>
      <div v-else class="header mb-3 px-5 pb-4">The draw has ended.</div>
      <div class="body mb-3 px-5 pb-4">
        <div v-if="playerWon">
          The draw is over and you won <br />
          <span>5$</span>.<br />
        </div>
        You can save this draw to your history <br />
        and play again.
      </div>
      <div class="footer mb-3">
        <button @click="saveDraw()" type="button" class="btn btn-secondary">
          Save Draw
        </button>
        <button @click="playAgain()" type="button" class="btn btn-primary">
          Play again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { addHistory } from "@/api/history.js";

export default {
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["change-draw-status"],
  data() {
    return {
      drawNumbersArr: [],
      winningNumbersArr: [],
    };
  },
  computed: {
    playerWon() {
      return this.$store.getters.totalAmountWon > 0;
    },
  },
  methods: {
    saveDraw() {
      this.$store.getters.drawNumbers.forEach((element) => {
        this.drawNumbersArr.push(element.value);
      });
      this.$store.getters.winningNumbers.forEach((element) => {
        this.winningNumbersArr.push(element.value);
      });
      console.log(this.winningNumbersArr);
      addHistory(
        this.drawNumbersArr,
        this.winningNumbersArr,
        this.$store.getters.playerBet,
        this.$store.getters.totalAmountWon
      ).then(() => {
        // this.playAgain();
      });
    },
    playAgain() {
      this.$emit("change-draw-status");
      this.$router.push("/Home");
    },
  },
};
</script>

<style lang="scss" scoped>
.draw-modal-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation-name: opacity;
  animation-duration: 0.5s;

  .draw-modal {
    background-color: white;
    border-radius: 16px;

    .header {
      font-size: 150%;
      font-weight: bold;
      color: #222;
      border-bottom: solid 1px lightgrey;
    }
    .body {
      font-size: 100%;
      font-weight: bold;
      color: #666;
      border-bottom: solid 1px lightgrey;

      span {
        color: green;
      }
    }
    .footer {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
