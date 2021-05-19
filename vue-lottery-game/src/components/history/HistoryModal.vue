<template>
  <div v-if="isShown" class="draw-modal-overlay">
    <div class="draw-modal pt-5 pb-3">
      <div class="header mb-3 px-5 pb-4">{{ drawData.expirationDate }}</div>
      <div class="body mb-3 px-5 pb-4">
        <span class="grey">Player bet: </span>
        <div class="green">{{ drawData.playerBet }}€</div>
      </div>
      <div class="body mb-3 px-5 pb-4">
        <span class="grey">Player bet: </span>
        <div class="red">{{ drawData.totalAmountWon }}€</div>
      </div>
      <div class="body mb-3 px-5 pb-4">
        <span class="grey">Winning Draws: </span>
        <div class="numbers-container">
          <span
            v-for="draw in drawData.winningNumbers"
            :key="draw.id"
            :class="{ green: correctSelection(draw) }"
            >{{ draw }}</span
          >
        </div>
      </div>
      <div class="footer mb-3">
        <button type="button" class="btn btn-secondary" @click="closeModal()">
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
    drawData: {
      type: Object,
      required: true,
    },
  },
  emits: ["close-modal"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    correctSelection(draw) {
      let counter = 0;
      this.drawData.drawNumbers.forEach((element) => {
        if (draw === element) {
          counter++;
        }
      });
      return counter !== 0;
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

      .green {
        color: green;
      }
      .red {
        color: #dc3545;
      }
      .grey {
        color: #666;
      }
      .numbers-container {
        display: flex;
        justify-content: space-around;
        align-items: center;

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          border: solid 2px black;
          background-color: red;
          color: black;
        }
        .green {
          background-color: green;
          color: white;
        }
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
