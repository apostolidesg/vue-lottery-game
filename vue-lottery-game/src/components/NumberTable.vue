<template>
  <div class="container-fluid center-position">
    <div class="row justify-content-evenly">
      <div class="col col-12 col-sm-6">
        <div class="grid-wrapper p-2">
          <div class="title my-4">
            Select {{ 5 - selectedNumbers.length }} numbers
          </div>
          <div class="grid-container my-4">
            <span
              v-for="number in givenNumbers"
              :key="number.id"
              @click="selectNumber(number)"
              class="my-1"
              :class="{ selected: number.isSelected }"
            >
              {{ number.value }}
            </span>
          </div>
          <div class="lucky my-4">
            <span class="px-3 py-1" @click="feelingLucky()">FEELING LUCKY</span>
          </div>
        </div>
      </div>
      <div class="col col-12 col-sm-4 selected-numbers-wrapper">
        <div
          v-if="selectedNumbers.length === 0"
          class="selected-numbers-container p-3 my-3"
        >
          <span v-for="number in 5" :key="number">?</span>
        </div>
        <div v-else class="selected-numbers-container p-3 my-3">
          <span v-for="(number, index) in selectedNumbers" :key="number">
            {{ number.value }}
            <img
              src="@/assets/images/close-icon.png"
              alt=""
              class="remove-number"
              @click="removeSelection(index, number)"
            />
          </span>
        </div>
        <div class="control-container">
          <span @click="clearSelections()">Clear All</span>
          <span>Submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/json/numbers-array.json";
export default {
  data() {
    return {
      givenNumbers: data.numbers,
      selectedNumbers: [],
    };
  },
  methods: {
    selectNumber(number) {
      if (this.selectedNumbers.length < 5 && !number.isSelected) {
        number.isSelected = true;
        this.selectedNumbers.push(number);
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
  },
};
</script>

<style lang="scss" scoped>
.center-position {
  position: absolute;
  bottom: 50%;
  left: 0%;
  transform: translate(0px, 50%);
}
.grid-wrapper {
  background-color: white;
  box-shadow: 2px 4px 3px 0px black;

  .grid-container {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(5, 20%);
    justify-items: center;
    align-items: center;

    span {
      width: 80%;
      font-size: 200%;
      font-weight: bold;
      text-align: center;
      background-color: #ebeceb;
      border-radius: 10px;
      cursor: pointer;
    }

    .selected {
      border: solid 3px red;
      opacity: 50%;
      cursor: not-allowed;
    }
  }
  .title {
    text-align: center;
    font-size: 150%;
    font-weight: bold;
    color: #dcb666;
  }
  .lucky {
    text-align: center;
    font-size: 150%;
    font-weight: bold;
    color: white;

    span {
      background-color: #dcb666;
      border: 2px solid #ebeceb;
      border-radius: 50px;
      cursor: pointer;
    }
  }
}
.selected-numbers-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

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
}
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
