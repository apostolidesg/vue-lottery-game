<template>
  <div class="container-fluid center-position">
    <div class="row justify-content-evenly">
      <div class="col col-12 col-sm-6">
        <div class="grid-wrapper p-2">
          <div class="title my-4">Select 5 numbers</div>
          <div class="grid-container my-4">
            <span v-for="number in 30" :key="number" class="my-1">
              {{ number }}
            </span>
          </div>
          <div class="lucky my-4">
            <span class="px-3 py-1">FEELING LUCKY</span>
          </div>
        </div>
      </div>
      <div class="col col-12 col-sm-4 selected-numbers-wrapper">
        <div class="selected-numbers-container p-3 my-3">
          <span v-for="number in 5" :key="number">
            {{ number }}
          </span>
        </div>
        <div class="control-container">
          <span>Clear</span>
          <span>Submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

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
      width: 16%;
      font-size: 150%;
      text-align: center;
      border-radius: 10px;
      background: white;
      cursor: pointer;
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
