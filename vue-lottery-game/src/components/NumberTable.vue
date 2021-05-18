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
  data() {
    return {
      givenNumbers: data.numbers,
      selectedNumbers: [],
      secondaryArr: [],
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  created() {
    if (this.currentRoute === "Draw") {
      this.fetchDrawData();
    }
  },
  methods: {
    fetchDrawData() {
      this.selectedNumbers = this.$store.getters.drawNumbers;
      this.drawProcess();
    },
    drawProcess() {
      setTimeout(() => {
        for (var i = 0; i < 5; ) {
          let random = Math.floor(Math.random() * this.givenNumbers.length);
          this.givenNumbers.forEach((element) => {
            if (element.value === random && !element.isGlowing) {
              element.isGlowing = `glow-${i}`;
              i++;
            }
          });
        }
        console.log(this.givenNumbers);
      }, 3000);
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
      });
    },
    startDraw() {
      let dispatchObject = {
        isReady: true,
        drawNumbers: this.selectedNumbers,
        playerBet: 5,
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
@media screen and (max-width: 600px) {
  .center-position {
    bottom: 45%;
  }
  .grid-wrapper {
    .grid-container {
      span {
        font-size: 130%;
      }
    }
  }
}
</style>
