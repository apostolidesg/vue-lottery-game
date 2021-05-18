<template>
  <number-table></number-table>
</template>

<script>
import NumberTable from "@/components/NumberTable";
export default {
  components: {
    NumberTable,
  },
  created() {
    this.resetStore();
  },
  methods: {
    resetStore() {
      this.$store.dispatch("resetDraw");
    },
  },
};
</script>

<style lang="scss" scoped></style>
