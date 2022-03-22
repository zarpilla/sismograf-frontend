<template>
  <span class="resilience-level">
    {{ levels }}-{{value}}
    
  </span>
</template>

<script>
export default {
  name: "ResilienceText",
  data() {
    return {};
  },
  props: {
    levels: {
      type: Array,
      default: [],
    },
    value: {
      type: Number,
      default: null,
    },
  },
};
</script>
<style scoped>
.progress-bar {
  border-radius: 4px;
  color: #222;
  font-size: 14px;
}
.clickable {
  cursor: pointer;
}
.label {
  font-weight: bold;
  min-width: 200px;
}

</style>