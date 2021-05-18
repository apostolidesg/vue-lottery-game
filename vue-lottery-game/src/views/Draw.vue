<template>
  <number-table></number-table>
</template>

<script>
import NumberTable from "@/components/NumberTable.vue";

export default {
  components: {
    NumberTable,
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>
