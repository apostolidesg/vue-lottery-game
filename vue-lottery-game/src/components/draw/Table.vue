<template>
  <div class="grid-wrapper p-2">
    <div v-if="currentRoute === 'Home'" class="title my-4">
      Select {{ 5 - selectedNumbers.length }} numbers
    </div>
    <div class="grid-container my-4">
      <span
        v-for="number in givenNumbers"
        :key="number.id"
        @click="selectNumber(number)"
        class="my-1"
        :class="{
          selected: number.isSelected && currentRoute === 'Home',
          glow0: number.isGlowing === 'glow-0' && currentRoute === 'Draw',
          glow1: number.isGlowing === 'glow-1' && currentRoute === 'Draw',
          glow2: number.isGlowing === 'glow-2' && currentRoute === 'Draw',
          glow3: number.isGlowing === 'glow-3' && currentRoute === 'Draw',
          glow4: number.isGlowing === 'glow-4' && currentRoute === 'Draw',
        }"
      >
        {{ number.value }}
      </span>
    </div>
    <div class="lucky my-4">
      <span
        v-if="currentRoute === 'Home'"
        class="px-3 py-1"
        @click="feelingLucky()"
        >FEELING LUCKY</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    givenNumbers: {
      type: Array,
      required: true,
    },
    selectedNumbers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    selectNumber(number) {
      this.$emit("select-number", number);
    },
    feelingLucky() {
      this.$emit("feeling-lucky");
    },
  },
};
</script>

<style lang="scss" scoped>
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
  .glow0,
  .glow1,
  .glow2,
  .glow3,
  .glow4 {
    background-color: #fff !important;
    box-shadow: 0 0 5px 1px black;
  }
  .glow0 {
    transition: all 0.3s ease;
    transition-delay: 0s;
  }
  .glow1 {
    transition-delay: 4s;
  }
  .glow2 {
    transition-delay: 8s;
  }
  .glow3 {
    transition-delay: 12s;
  }
  .glow4 {
    transition-delay: 16s;
  }
}
</style>
