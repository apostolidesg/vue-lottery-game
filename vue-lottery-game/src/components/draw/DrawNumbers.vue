<template>
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
        v-if="currentRoute === 'Home'"
        src="@/assets/images/close-icon.png"
        alt=""
        class="remove-number"
        @click="removeSelection(index, number)"
      />
    </span>
  </div>
  <div v-if="currentRoute === 'Home'" class="control-container">
    <span @click="clearSelections()">Clear All</span>
    <span
      class="btn btn-lg"
      :class="{ disabled: submitReady }"
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
  },
  emits: ["remove-selection", "clear-selections", "start-draw"],
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
      this.$emit("clear-selections");
    },
    startDraw() {
      this.$emit("start-draw");
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
</style>
