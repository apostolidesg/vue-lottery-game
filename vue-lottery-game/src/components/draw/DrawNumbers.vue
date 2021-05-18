<template>
  <div
    v-if="selectedNumbers.length === 0"
    class="selected-numbers-container p-3 my-3"
  >
    <span v-for="number in 5" :key="number">?</span>
  </div>
  <div v-else class="selected-numbers-container p-3 my-3">
    <span
      v-for="(number, index) in selectedNumbers"
      :key="number"
      :class="{
        match0: number.isGlowing === 'glow0' && currentRoute === 'Draw',
        match1: number.isGlowing === 'glow1' && currentRoute === 'Draw',
        match2: number.isGlowing === 'glow2' && currentRoute === 'Draw',
        match3: number.isGlowing === 'glow3' && currentRoute === 'Draw',
        match4: number.isGlowing === 'glow4' && currentRoute === 'Draw',
      }"
    >
      {{ number.value }}
      <img
        v-if="currentRoute === 'Home'"
        src="@/assets/images/close-icon.png"
        alt=""
        class="remove-number"
        @click="removeSelection(index, number)"
      />
    </span>
  </div>
  <div v-if="currentRoute === 'Home'" class="bet-input mb-3">
    <div class="bet-label">
      Please place your bet
    </div>
    <div class="input-group">
      <input v-model="bet" type="number" class="form-control" required />
      <span class="input-group-text">€</span>
    </div>
  </div>
  <div v-if="currentRoute === 'Draw'" class="bet-container">
    <div class="bet">Bet:</div>
    <div class="value">{{ playerBet }}€</div>
  </div>
  <div v-if="currentRoute === 'Draw'" class="win-container">
    <div class="win">Win:</div>
    <div class="value">{{ playerWin() }}€</div>
  </div>
  <div v-if="currentRoute === 'Home'" class="control-container">
    <span @click="clearSelections()">Clear All</span>
    <span
      class="btn btn-lg"
      :class="{ disabled: submitReady || bet <= 0 }"
      role="button"
      @click="startDraw()"
      >Submit</span
    >
  </div>
</template>

<script>
export default {
  props: {
    selectedNumbers: {
      type: Array,
      required: true,
    },
    winningNumbers: {
      type: Array,
      required: true,
    },
    playerBet: {
      type: Number,
      required: true,
    },
  },
  emits: ["remove-selection", "clear-selections", "start-draw"],
  data() {
    return {
      bet: 0,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    submitReady() {
      return this.selectedNumbers.length < 5;
    },
  },
  methods: {
    removeSelection(index, number) {
      this.$emit("remove-selection", index, number);
    },
    clearSelections() {
      this.bet = 0;
      this.$emit("clear-selections");
    },
    startDraw() {
      this.$emit("start-draw", parseInt(this.bet));
    },
    playerWin() {
      let counter = 0;
      this.selectedNumbers.forEach((winningElement) => {
        this.winningNumbers.forEach((selectedElement) => {
          if (selectedElement.value === winningElement.value) {
            counter++;
          }
        });
      });
      if (counter < 3) {
        return 0;
      } else {
        let dispatchObject = {
          amountWon: this.playerBet * counter,
        };
        this.$store.dispatch("setAmount", dispatchObject);
        return this.playerBet * counter;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-numbers-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: grey;
  border: 2px solid #ebeceb;
  border-radius: 25px;
  box-shadow: 2px 4px 3px 0px black;

  span {
    position: relative;
    width: 16%;
    font-size: 150%;
    text-align: center;
    border-radius: 10px;
    background: white;
    cursor: pointer;

    .remove-number {
      max-width: 15px;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}
.bet-input {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .input-group {
    width: 20%;
  }
  .bet-label {
    width: 40%;
  }
  .bet-label {
    font-size: 110%;
    font-weight: bold;
    color: white;
  }
}
.bet-container,
.win-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 110%;
  font-weight: bold;
  color: white;

  .bet,
  .win,
  .value {
    width: 20%;
  }
  .value {
    text-align: center;
  }
}
.control-container {
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    padding: 1% 7%;
    border: 2px black solid;
    border-radius: 25px;
    font-size: 100%;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
    box-shadow: 1px 2px 5px 0px black;
  }
}
@media screen and (max-width: 600px) {
  .bet-input {
    .input-group {
      width: 20%;
    }
    .bet-label {
      width: 40%;
    }
  }
}
</style>
