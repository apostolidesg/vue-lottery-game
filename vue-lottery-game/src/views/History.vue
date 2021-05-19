<template>
  <div>
    <draw-table @toggle-modal="toggleModal"></draw-table>
    <history-modal
      :isShown="isShown"
      :drawData="drawData"
      @close-modal="closeModal"
    ></history-modal>
  </div>
</template>

<script>
import DrawTable from "@/components/history/DrawTable";
import HistoryModal from "@/components/history/HistoryModal";
export default {
  components: {
    DrawTable,
    HistoryModal,
  },
  data() {
    return {
      isShown: false,
      drawData: {},
    };
  },
  methods: {
    toggleModal(data) {
      this.isShown = true;
      this.drawData = data;
    },
    closeModal() {
      this.isShown = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
