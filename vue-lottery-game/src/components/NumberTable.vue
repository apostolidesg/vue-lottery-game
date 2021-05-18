<template>
  <div class="container-fluid center-position">
    <div class="row justify-content-evenly">
      <div class="col col-12 col-sm-6">
        <table-component
          :givenNumbers="givenNumbers"
          :selectedNumbers="selectedNumbers"
          @select-number="selectNumber"
          @feeling-lucky="feelingLucky"
        ></table-component>
      </div>
      <div class="col col-12 col-sm-4 selected-numbers-wrapper">
        <draw-numbers
          :selectedNumbers="selectedNumbers"
          :playerBet="playerBet"
          :winningNumbers="winningNumbers"
          @remove-selection="removeSelection"
          @clear-selections="clearSelections"
          @start-draw="startDraw"
        ></draw-numbers>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/draw/Table";
import DrawNumbers from "@/components/draw/DrawNumbers";
import data from "@/json/numbers-array.json";

export default {
  components: {
    TableComponent,
    DrawNumbers,
  },
  emits: ["show-modal"],
  data() {
    return {
      givenNumbers: data.numbers,
      selectedNumbers: [],
      winningNumbers: [],
      playerBet: 0,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  created() {
    this.clearSelections();
    if (this.currentRoute === "Draw") {
      this.fetchDrawData();
    }
  },
  methods: {
    fetchDrawData() {
      this.selectedNumbers = this.$store.getters.drawNumbers;
      this.playerBet = this.$store.getters.playerBet;
      this.drawProcess();
    },
    drawProcess() {
      setTimeout(() => {
        for (var i = 0; i < 5; ) {
          let random = Math.floor(Math.random() * this.givenNumbers.length);
          this.givenNumbers.forEach((element) => {
            if (element.value === random && !element.isGlowing) {
              element.isGlowing = `glow${i}`;
              this.winningNumbers.push(element);
              i++;
            }
          });
        }
      }, 3000);
      setTimeout(() => {
        this.$emit("show-modal");
      }, 22000);
    },
    selectNumber(number) {
      if (this.selectedNumbers.length < 5 && !number.isSelected) {
        number.isSelected = true;
        this.selectedNumbers.push(number);
      }
    },
    feelingLucky() {
      this.clearSelections();
      for (var i = 0; i < 5; ) {
        let random = Math.floor(Math.random() * this.givenNumbers.length);
        this.givenNumbers.forEach((element) => {
          if (element.value === random && !element.isSelected) {
            this.selectNumber(element);
            i++;
          }
        });
      }
    },
    removeSelection(index, number) {
      this.selectedNumbers.splice(index, 1);
      this.givenNumbers.forEach((element) => {
        if (element === number) {
          element.isSelected = false;
        }
      });
    },
    clearSelections() {
      this.selectedNumbers = [];
      this.givenNumbers.forEach((element) => {
        element.isSelected = false;
        element.isGlowing = false;
      });
    },
    startDraw(playerBet) {
      let dispatchObject = {
        isReady: true,
        drawNumbers: this.selectedNumbers,
        playerBet: playerBet,
      };
      this.$store.dispatch("startDraw", dispatchObject);
      this.$router.push("/Draw");
    },
  },
};
</script>

<style lang="scss" scoped>
.center-position {
  position: absolute;
  bottom: 50%;
  left: 0%;
  transform: translate(0px, 50%);

  .selected-numbers-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

<style lang="scss">
.glow0,
.glow1,
.glow2,
.glow3,
.glow4 {
  background-color: #fff !important;
  box-shadow: 0 0 5px 1px black;
  transition: all 0.3s ease;
}
.match0,
.match1,
.match2,
.match3,
.match4 {
  background-color: #e8910e !important;
  box-shadow: 0 0 5px 1px black;
  transition: all 0.3s ease;
}
.glow0,
.match0 {
  transition-delay: 0s;
}
.glow1,
.match1 {
  transition-delay: 4s;
}
.glow2,
.match2 {
  transition-delay: 8s;
}
.glow3,
.match3 {
  transition-delay: 12s;
}
.glow4,
.match4 {
  transition-delay: 16s;
}
@media screen and (max-width: 600px) {
  .center-position {
    bottom: 45%;
  }
  .grid-wrapper {
    .grid-container {
      span {
        font-size: 130% !important;
      }
    }
  }
}
</style>
