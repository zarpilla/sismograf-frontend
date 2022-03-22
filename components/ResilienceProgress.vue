<template>
  <div class="chart-summary">
    <div class="d-block">
      <div class="label mr-1">{{ name }}
        <b class="ml-1" style="display: inline-block"
        >({{ toLevel(value) }})</b
      >
      </div>
      <div class="d-flex progress-bar-container">

      
      <b-progress-bar
        :value="value * 14.29 - 14.29"
        :max="100"
        show-progress
        :variant="
          value < 2.5
            ? 'danger'
            : value < 5.5
            ? 'warning'
            : 'success'
        "
      >
        <span
          ><b
            >{{ (value * 14.29 - 14.29).toFixed(0) }}%</b
          ></span
        >
      </b-progress-bar>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "ResilienceProgress",
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: null,
    },
    levels: {
      type: Object,
      default: [],
    },
  },
  methods: {    
    toLevel(value) {
      const level = this.levels[this.$i18n.locale].find(r => parseFloat(r.attributes.code) + 0.5 > value)
      return level ? level.attributes.name : ''
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
.progress-bar-container{
  background: #eee;
  border-radius: 4px;
}
</style>