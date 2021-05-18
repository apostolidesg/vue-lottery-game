<template>
  <div>
    <number-table @show-modal="isShown = true"></number-table>
    <results-modal
      :isShown="isShown"
      @change-draw-status="changeDrawStatus"
    ></results-modal>
  </div>
</template>

<script>
import NumberTable from "@/components/NumberTable.vue";
import ResultsModal from "@/components/draw/ResultsModal";

export default {
  components: {
    NumberTable,
    ResultsModal,
  },
  data() {
    return {
      isShown: false,
      isDrawFinished: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDrawFinished) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    changeDrawStatus() {
      this.isDrawFinished = true;
    },
  },
};
</script>
